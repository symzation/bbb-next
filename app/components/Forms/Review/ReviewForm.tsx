"use client"

import { ChangeEvent, FocusEvent, useActionState, useEffect, useRef, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/useDebounce"
import Editor from "@/components/Editor/Editor"
import { ReviewFormAction } from "@/components/Forms/Review/ReviewFormAction"
import {
  Select, SelectContent, SelectItem, SelectLabel,SelectTrigger, SelectValue
} from "@/components/ui/select"
import { CategoryDataProps, CategoryTypeDataProps, ReviewDataProps } from "@/types/types"
import { useCategoryStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { ENUM_CHECK_STATE } from "@/types/enums"
import { validateSlug, validateFloatingNumber } from "@/utils/helpers"
import SearchInputState from "@/components/Search/SearchInputState"

/** TODOS
 * - Handle error messaging for invalid input validation for numeric fields
 * - Implement fetch logic for review content data
 * - Handle onSubmit validation with zod in form action
 */

export function validateSlugValue(value: string) {
  if (value.length === 0) {
    return { ok: false, state: ENUM_CHECK_STATE.IDLE as const }
  }

  if (!validateSlug(value)) {
    return { ok: false, state: ENUM_CHECK_STATE.INVALID as const }
  }

  return { ok: true, state: ENUM_CHECK_STATE.CHECKING as const }
}

export default function ReviewForm({ slug }: { slug?: string }) {
  const [formState, formAction, isPending] = useActionState(ReviewFormAction, undefined)
  const [reviewCategorySelected, setReviewCategorySelected] = useState<string>("")
  const [reviewCategoryTypeSelected, setReviewCategoryTypeSelected] = useState<string>("")
  const [reviewTitle, setReviewTitle] = useState<string>("")
  const [reviewSlug, setReviewSlug] = useState<string>("")
  const [reviewSlugState, setReviewSlugState] = useState<ENUM_CHECK_STATE>(ENUM_CHECK_STATE.IDLE)
  const [reviewContentData, setReviewContentData] = useState<ReviewDataProps | undefined>(undefined)
  const [reviewAbv, setReviewAbv] = useState<number | null>(null)
  const [reviewIbu, setReviewIbu] = useState<number | null>(null)
  const [reviewBatch, setReviewBatch] = useState<number | null>(null)
  const [reviewProof, setReviewProof] = useState<number | null>(null)
  const [rating, setRating] = useState<number | null>(null)

  const abvInputRef = useRef<HTMLInputElement>(null)
  /* const ibuInputRef = useRef<HTMLInputElement>(null)
  const batchInputRef = useRef<HTMLInputElement>(null)
  const proofInputRef = useRef<HTMLInputElement>(null) */
  const abortRef = useRef<AbortController>(null) 

  const debouncedReviewSlug = useDebounce(reviewSlug, 600)
  
  const { categories, categoryTypes } = useCategoryStore(
    useShallow(state => ({
      categories: state.categories,
      categoryTypes: state.categoryTypes,
    }))
  )

  const categoryName = categories.find(
    (category: CategoryDataProps) => category.id === Number(reviewCategorySelected)
  )?.name
  
  const categoryTypeName = categoryTypes.find(
    (categoryType: CategoryTypeDataProps) => categoryType.id === Number(reviewCategoryTypeSelected)
  )?.name

  const reviewPublisheStatus = slug ? "Published" : "Draft"
  const reviewStatusClass = formState?.success ? "text-success" : "text-warning"
  const categorySelectsClass = "placeholder:text-muted-foreground h-10 min-w-[240px] rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm focus-visible:ring-[0px]"

  /* useEffect(() => {
    // Retrieve the review content data based on the slug
    const fetchReviewContentData = async () => {
      try {
        const result = await getReviewBySlug(slug)
        const data: ReviewDataProps | null = Array.isArray(result) ? (result[0] as ReviewDataProps) : result

        if (!data) {
          throw new Error("Failed to fetch review content data")
        }
        setReviewContentData(data)
        setReviewType(data.reviewType)
        setReviewTitle(data.reviewTitle)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviewContentData()
  }, [slug]) */

  useEffect(() => {
    if (formState && formState?.success) {
    }
  }, [formState])

  const getCategoryTypesForSelected = () => {
    return categoryTypes.filter((type: CategoryTypeDataProps) => type.categoryId === Number(reviewCategorySelected))
  }

  const handleCategorySelected = (value: string) => {
    setReviewCategorySelected(value)
    setReviewCategoryTypeSelected("")
  }

  const generateReviewSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-")         // Spaces → hyphens
      .replace(/-+/g, "-")          // Multiple hyphens → one
      .replace(/^-|-$/g, "")        // remove duplicate hyphens
  }

  const sanitizedReviewTitle = (title: string) => {
    return title
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, " ")
  }

  const handleReviewTitleInput = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>
  ) => {
    const target = e.target
    const sanitizedValue = sanitizedReviewTitle(target.value)
    const reviewSlugGenerated = generateReviewSlug(sanitizedValue)
    const slugValidationState = validateSlugValue(reviewSlugGenerated)

    target.value = sanitizedValue
    setReviewTitle(sanitizedValue)
    setReviewSlug(reviewSlugGenerated)

    if (!slugValidationState.ok) {
      setReviewSlugState(slugValidationState.state)
      return
    }

    setReviewSlugState(ENUM_CHECK_STATE.CHECKING)
  }

  useEffect(() => {
    if (!debouncedReviewSlug) return

    const validatedSlug = validateSlugValue(debouncedReviewSlug)
    if (!validatedSlug.ok) return

    let isActive = true
    const controller = new AbortController()
    abortRef.current = controller

    const runSlugCheck = async () => {
      setReviewSlugState(ENUM_CHECK_STATE.CHECKING)

      try {
        const slugCheckRes = await fetch(
          `/api/check/review-slug?slug=${encodeURIComponent(debouncedReviewSlug)}`,
          { signal: controller.signal, cache: "no-store" }
        )

        const slugCheckData: { available: boolean; reason?: string } = await slugCheckRes.json()

        if (!isActive) return

        if (!slugCheckRes.ok || !slugCheckData) {
          setReviewSlugState(ENUM_CHECK_STATE.ERROR)
          return
        }

        if (!slugCheckData.available) {
          setReviewSlugState(
            slugCheckData.reason === "invalid" 
            ? ENUM_CHECK_STATE.INVALID : ENUM_CHECK_STATE.TAKEN
          )
          return
        }

        setReviewSlugState(ENUM_CHECK_STATE.AVAILABLE)
      } catch (err: any) {
        if (!isActive) return
        if (err?.name !== "AbortError") {
          setReviewSlugState(ENUM_CHECK_STATE.ERROR)
        }
      }
    }

    void runSlugCheck()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [debouncedReviewSlug])

  const handleIntegerInput = (
    e: FocusEvent<HTMLInputElement>,
    setFunction: (value: number | null) => void,
    returnFloat: boolean = false,
    min?: number,
    max?: number,
  ) => {
    const num = parseFloat(String(e.target.value))
    e.target.classList.remove("inputError")

    if (isNaN(num)) {
      console.warn(`Invalid number: ${num}`)
      e.target.classList.add("inputError")
      setFunction(null)
      return
    }

    if (min !== undefined && max !== undefined) {
      if (num < min || num > max) {
        console.warn(`Number ${num} is out of the allowable range for this input`)
        e.target.classList.add("inputError")
      }
    }

    const normalizedValue = returnFloat ? Number.parseFloat(num.toFixed(1)) : Math.trunc(num)
    setFunction(normalizedValue)
  }

  return (
    <form action={formAction} className="flex flex-col space-y-4 w-full mx-auto mt-0 mb-2">
      <div className="mb-4">
        <span className="mr-2">Publish Status:</span> 
        <span className={cn("font-bold", reviewStatusClass)}>{reviewPublisheStatus}</span>
      </div>
      <div className="mb-2">Select the type of review you want to compose</div>
      {/* Review Categories Select */}
      <div className="flex flex-col mb-4">
        <label 
          htmlFor="reviewCategory" 
          className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
        >
          <span className="text-error">*</span> Category 
        </label>
        <Select 
          name="reviewCategory" 
          value={reviewCategorySelected}
          onValueChange={(value) => handleCategorySelected(value)}
        >
          <SelectTrigger className={cn(categorySelectsClass)}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
              <SelectItem value="">Category</SelectItem>
              {categories.map((category: CategoryDataProps) => (
                <SelectItem key={category.name} value={`${category.id}`}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewCategory" in formState.errors && (
          <span className="text-error text-sm italic mt-1">
            {Array.isArray((formState.errors as any).reviewCategory)
              ? (formState.errors as any).reviewCategory.join(", ")
              : String((formState.errors as any).reviewCategory)
            }
          </span>
        )}
      </div>
      {/* Review Category Types Select */}
      <div 
        className={cn(
          "flex flex-col mb-4 min-w-[200px]", 
          reviewCategorySelected ? undefined : "hidden"
        )}
      >
        <label 
          htmlFor="reviewCategoryType" 
          className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
        >
          <span className="text-error">*</span> Category Types 
        </label>
        <Select 
          name="reviewCategoryType" 
          value={reviewCategoryTypeSelected} 
          onValueChange={(value) => setReviewCategoryTypeSelected(value)}
        >
          <SelectTrigger className={cn(categorySelectsClass)}>
            <SelectValue placeholder={`${categoryName} Types`} />
          </SelectTrigger>
          <SelectContent className="bg-white">
              <SelectItem value="">{`${categoryName} Types`}</SelectItem>
              {getCategoryTypesForSelected().map((categoryType: CategoryTypeDataProps) => (
                <SelectItem key={categoryType.name} value={`${categoryType.id}`}>
                  {categoryType.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewCategoryType" in formState.errors && (
          <span className="text-error text-sm italic mt-1">
            {Array.isArray((formState.errors as any).reviewCategoryType)
              ? (formState.errors as any).reviewCategoryType.join(", ")
              : String((formState.errors as any).reviewCategoryType)
            }
          </span>
        )}
      </div>

      <div
        className={
          reviewCategorySelected !== "" && reviewCategoryTypeSelected !== "" ? "" : "hidden"
        }
      >
        {/* Review Title */}
        <div className="flex flex-col mb-4">
          <label 
            htmlFor="reviewTitle" 
            className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
          >
            <span className="text-error">*</span> Title 
          </label>
          <input type="text" name="reviewTitle" defaultValue={reviewTitle} 
            placeholder="Review Title" className={cn(styles.formInput)}
            onChange={(e) => handleReviewTitleInput(e)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewTitle" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).reviewTitle)
                ? (formState.errors as any).reviewTitle.join(", ")
                : String((formState.errors as any).reviewTitle)
              }
            </span>
          )}
          <div className="text-sm text-muted-foreground mt-1 ml-1">
            <span className="font-bold mr-2">Slug:</span>
            <span className="font-bold mr-2">{reviewSlug}</span>
            {
              reviewSlugState !== "" && 
              <SearchInputState state={reviewSlugState as ENUM_CHECK_STATE} />
            }
          </div>
        </div>

        {/* Beer Details Section */}
        <div 
          className={cn(
            "flex flex-col items-start", 
            reviewCategorySelected !== "3" && "hidden"
          )}
        >
          {/* Product ABV */}
          <div className={"flex flex-col items-start mb-4"}>
            <label 
              htmlFor="reviewAbv" 
              className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
            >
              <span className="text-error">*</span> ABV (Alcohol by Volume)
            </label>
            <div className="flex items-center">
              <input type="text" name="reviewAbv" ref={abvInputRef} defaultValue={reviewAbv ?? ""}
                className={cn(styles.formInput, "w-full md:w-32")}
                onBlur={(e) => handleIntegerInput(e, setReviewAbv, true, 0, 100)}
              />
              <span className="ml-2">%</span>
            </div>
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewAbv" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewAbv?: string }).reviewAbv}</div>)}
          </div>
          {/* Product IBU */}
          <div 
            className={cn(
              "flex flex-col items-start mb-4", 
              reviewCategorySelected !== "3" && "hidden"
            )}
          >
            <label 
              htmlFor="reviewIbu" 
              className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
            >
              <span className="text-error">*</span> IBU (International Bitterness Units)
            </label>
            <input type="text" name="reviewIbu" defaultValue={reviewIbu ?? ""}
              className={cn(styles.formInput, "w-full md:w-32")}
              onBlur={(e) => handleIntegerInput(e, setReviewIbu, false, 0, 120)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewIbu" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewIbu?: string }).reviewIbu}</div>)}
          </div>
        </div>
        
        {/* Whiskey Details Section */}
        <div 
          className={cn(
            "flex flex-col items-start", 
            reviewCategorySelected !== "1" && "hidden"
          )}
        >
          {/* Product Batch Number */}
          <div className="flex flex-col items-start mb-4">
            <label 
              htmlFor="reviewBatchNumber" 
              className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
            >
              <span className="text-error">*</span> Batch Number
            </label>
            <input type="text" name="reviewBatch" defaultValue={reviewBatch ?? ""}
              className={cn(styles.formInput)}
              onBlur={(e) => handleIntegerInput(e, setReviewBatch)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewBatchNumber" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewBatchNumber?: string }).reviewBatchNumber}</div>)}
          </div>
          {/* Product Proof*/}
          <div className="flex flex-col items-start mb-4">
            <label 
              htmlFor="reviewProof" 
              className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
            >
              <span className="text-error">*</span> Proof
            </label>
            <input type="text" name="reviewProof" inputMode="decimal" defaultValue={reviewProof ?? ""}
              className={cn(styles.formInput)}
              onBlur={(e) => handleIntegerInput(e, setReviewProof, true, 80, 200)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewProof" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewProof?: string }).reviewProof}</div>)}
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-start mb-4">
          <label 
            htmlFor="rating" 
            className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
          >
            <span className="text-error">*</span> Rating
          </label>
          <div className="flex items-center">
            <input type="text" name="rating" defaultValue={rating ?? ""}
              className={cn(styles.formInput, "w-full md:w-32")}
              onBlur={(e) => handleIntegerInput(e, setRating, true, 0, 10)}
            />
            <span className="ml-2">/ 10</span>
          </div>
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "rating" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { rating?: string }).rating}</div>)}
        </div>

        {/* Review Content */}
        <div className="flex flex-col mb-4">
          <label 
            htmlFor="reviewContent" 
            className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}
          >
            <span className="text-error">*</span>Review 
          </label>
          <Editor value={reviewContentData?.content || ""} />
          {/* {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "content" in formState.errors && (
            <span className="text-error text-sm italic mt-1">
              {Array.isArray((formState.errors as any).content)
                ? (formState.errors as any).content.join(", ")
                : String((formState.errors as any).content)
              }
            </span>
          )} */}
        </div>

        <div className="flex flex-col sm:justify-center items-end mt-5">
          <Button 
            type="submit" 
            disabled={isPending}
            className={cn("text-white tracking-wider py-5 px-12 ring-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 focus-visible:ring-0 outline-none cursor-pointer data-[state=open]:bg-transparent", isPending && "opacity-70 cursor-not-allowed")}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  )
}