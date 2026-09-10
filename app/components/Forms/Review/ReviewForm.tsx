"use client"

import { ChangeEvent, FocusEvent, useActionState, useEffect, useRef, useState } from "react"
import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/useDebounce"
import Editor from "@/components/Editor/Editor"
import { ReviewFormAction } from "@/components/Forms/Review/ReviewFormAction"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { CategoryDataProps, CategoryTypeDataProps, ReviewDataProps } from "@/types/types"
import { useCategoryStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"
import { ENUM_CHECK_STATE } from "@/types/enums"
import { validateSlug, validateFloatingNumber } from "@/utils/helpers"
import SearchInputState from "@/components/Search/SearchInputState"
import { FaLongArrowAltDown, FaLongArrowAltRight } from "react-icons/fa"
import WhiskeyStatsFormElements from "@/components/Forms/Review/WhiskeyStatsFormElements"

/** TODOS
 * - Complete image upload functionality for the Editor component
 * - Handle error messaging for invalid input validation for numeric fields
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

export default function ReviewForm({
  reviewData = undefined,
  reviewType,
  slug = "", 
}: { reviewData?: ReviewDataProps | undefined, reviewType: string, slug?: string }
) {
  const [formState, formAction, isPending] = useActionState(ReviewFormAction, undefined)
  const [reviewCategorySelected, setReviewCategorySelected] = useState<string>("")
  const [reviewCategoryTypeSelected, setReviewCategoryTypeSelected] = useState<string>("")
  const [reviewTitle, setReviewTitle] = useState<string>("")
  const [reviewSlug, setReviewSlug] = useState<string>(slug)
  const [reviewSlugState, setReviewSlugState] =
    useState<ENUM_CHECK_STATE>(ENUM_CHECK_STATE.IDLE)
  const [reviewAbv, setReviewAbv] = useState<number | null>(null)
  const [reviewIbu, setReviewIbu] = useState<number | null>(null)
  
  const [reviewDistillery, setReviewDistillery] = useState<string>("")
  const [reviewDistilleryLocation, setReviewDistilleryLocation] = useState<string>("")
  const [reviewBatch, setReviewBatch] = useState<string>("")
  const [reviewAge, setReviewAge] = useState<string>("")
  const [reviewProof, setReviewProof] = useState<string>("")
  const [reviewMashBill, setReviewMashBill] = useState<string>("")
  const [reviewBlend, setReviewBlend] = useState<string>("")
  const [reviewFinish, setReviewFinish] = useState<string>("")
  const [reviewIsLimitedRelease, setReviewIsLimitedRelease] = useState<boolean>(false)
  const [reviewReleaseYear, setReviewReleaseYear] = useState<string>("")
  const [reviewPrice, setReviewPrice] = useState<number | null>(null)
  const [rating, setRating] = useState<number | null>(null)
  
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
  
  const abvMin = Number(process.env.NEXT_PUBLIC_ABV_MIN ?? 0)
  const abvMax = Number(process.env.NEXT_PUBLIC_ABV_MAX ?? 100)
  const ibuMin = Number(process.env.NEXT_PUBLIC_IBU_MIN ?? 0)
  const ibuMax = Number(process.env.NEXT_PUBLIC_IBU_MAX ?? 120)
  const proofMin = Number(process.env.NEXT_PUBLIC_PROOF_MIN ?? 80)
  const proofMax = Number(process.env.NEXT_PUBLIC_PROOF_MAX ?? 200)
  const ratingMin = Number(process.env.NEXT_PUBLIC_RATING_MIN ?? 0)
  const ratingMax = Number(process.env.NEXT_PUBLIC_RATING_MAX ?? 10)
  
  useEffect(() => {
    if (formState && formState?.success) {
      console.log("Form submission successful:", formState)
    }
  }, [formState])

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

  const handleIntegerInput = (
    e: FocusEvent<HTMLInputElement>,
    setFunction: (value: number | null) => void,
    returnFloat: boolean = false,
    decimalPlaces: number = 1,
    min?: number,
    max?: number,
  ) => {
    const num = parseFloat(String(e.target.value))

    if (isNaN(num)) {
      console.warn(`Invalid number: ${num}`)
      //e.target.classList.add("inputError")
      setFunction(null)
      return
    }

    if (min !== undefined && max !== undefined) {
      if (num < min || num > max) {
        console.warn(`Number ${num} is out of the allowable range for this input`)
        /* formState?.success = false
        formState?.errors[inputName] = "Number is out of the allowable range for this input" */
        //e.target.classList.add("inputError")
        return
      }
    }

    const normalizedValue = returnFloat ? 
      Number.parseFloat(num.toFixed(decimalPlaces)) : Math.trunc(num)
    setFunction(normalizedValue)
  }

  return (
    <form action={formAction} className="flex flex-col space-y-4 w-full mx-auto my-4">
      <div className="flex flex-col justify-start items-start md:items-center md:flex-row">
        {/* Review Categories Select */}
        <div className="flex flex-col mb-4">
          <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span> Category 
          </label>
          <Select 
            name="reviewCategory" 
            value={reviewCategorySelected}
            onValueChange={(value) => handleCategorySelected(value)}
          >
            <SelectTrigger className={styles.selectTriggerClass}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className={styles.selectContentClass}>
                <SelectItem value="">Category</SelectItem>
                {categories.map((category: CategoryDataProps) => (
                  <SelectItem 
                    key={category.name} 
                    value={`${category.id}`} 
                    className={styles.selectItemClass}
                  >
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
        <div className={cn("mx-4", reviewCategorySelected !== "" ? undefined : "hidden")}>
          <FaLongArrowAltDown className="text-xl block md:hidden" />
          <FaLongArrowAltRight className="text-xl hidden md:block" />
        </div>
        {/* Review Category Types Select */}
        <div 
          className={cn(
            "flex flex-col mb-4 min-w-[200px]", 
            reviewCategorySelected ? undefined : "hidden"
          )}
        >
          <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span> Category Types 
          </label>
          <Select 
            name="reviewCategoryType" 
            value={reviewCategoryTypeSelected} 
            onValueChange={(value) => setReviewCategoryTypeSelected(value)}
          >
            <SelectTrigger className={styles.selectTriggerClass}>
              <SelectValue placeholder={`${categoryName} Types`} />
            </SelectTrigger>
            <SelectContent className={styles.selectContentClass}>
                <SelectItem value="">{`${categoryName} Types`}</SelectItem>
                {getCategoryTypesForSelected().map((categoryType: CategoryTypeDataProps) => (
                  <SelectItem 
                    key={categoryType.name} 
                    value={`${categoryType.id}`} 
                    className={styles.selectItemClass}
                  >
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
      </div>
      <div
        className={
          reviewCategorySelected !== "" && reviewCategoryTypeSelected !== "" ? "" : "hidden"
        }
      >
        {/* Review Title */}
        <div className="flex flex-col mb-4">
          <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
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
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> ABV (Alcohol by Volume)
            </label>
            <div className="flex items-center">
              <input type="text" name="reviewAbv" defaultValue={reviewAbv ?? ""}
                className={cn(styles.formInput, "w-full md:w-32")}
                onBlur={(e) => handleIntegerInput(e, setReviewAbv, true, abvMin, abvMax)}
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
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> IBU (International Bitterness Units)
            </label>
            <input type="text" name="reviewIbu" defaultValue={reviewIbu ?? ""}
              className={cn(styles.formInput, "w-full md:w-32")}
              onBlur={(e) => handleIntegerInput(e, setReviewIbu, true, ibuMin, ibuMax)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewIbu" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewIbu?: string }).reviewIbu}</div>)}
          </div>
        </div>
        
        {/* Whiskey Details Section */}
        <WhiskeyStatsFormElements
          reviewCategorySelected={reviewCategorySelected}
          reviewDistillery={reviewDistillery}
          setReviewDistillery={setReviewDistillery}
          reviewDistilleryLocation={reviewDistilleryLocation}
          setReviewDistilleryLocation={setReviewDistilleryLocation}
          reviewBatch={reviewBatch}
          setReviewBatch={setReviewBatch}
          reviewAge={reviewAge}
          setReviewAge={setReviewAge}
          reviewProof={reviewProof}
          setReviewProof={setReviewProof}
          reviewMashBill={reviewMashBill}
          setReviewMashBill={setReviewMashBill}
          reviewBlend={reviewBlend}
          setReviewBlend={setReviewBlend}
          reviewFinish={reviewFinish}
          setReviewFinish={setReviewFinish}
          reviewIsLimitedRelease={reviewIsLimitedRelease}
          setReviewIsLimitedRelease={setReviewIsLimitedRelease}
          reviewReleaseYear={reviewReleaseYear}
          setReviewReleaseYear={setReviewReleaseYear}
          reviewPrice={reviewPrice}
          setReviewPrice={setReviewPrice}
          handleIntegerInput={handleIntegerInput}
          formState={formState}
        />

        {/* Rating */}
        <div className="flex flex-col items-start mb-4">
          <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span> Rating
          </label>
          <div className="flex items-center">
            <input type="text" name="rating" defaultValue={rating ?? ""}
              className={cn(styles.formInput, "w-full md:w-32")}
              onBlur={(e) => handleIntegerInput(e, setRating, true, ratingMin, ratingMax)}
            />
            <span className="ml-2">/ 10</span>
          </div>
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "rating" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { rating?: string }).rating}</div>)}
        </div>

        {/* Review Content */}
        <div className="flex flex-col mb-4">
          <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span>Review 
          </label>
          <Editor value={reviewData?.content || ""} />
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