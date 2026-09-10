import { styles } from "@/utils/constants"
import { cn } from "@/utils"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import YearSelect from "@/components/YearSelect/YearSelect"

type WhiskeyStatsFormElementsProps = {
  reviewCategorySelected: string,
  reviewDistillery: string,
  setReviewDistillery: (value: string) => void,
  reviewDistilleryLocation: string,
  setReviewDistilleryLocation: (value: string) => void,
  reviewBatch: string,
  setReviewBatch: (value: string) => void,
  reviewAge: string,
  setReviewAge: (value: string) => void,
  reviewProof: string,
  setReviewProof: (value: string) => void,
  reviewMashBill: string,
  setReviewMashBill: (value: string) => void,
  reviewBlend: string,
  setReviewBlend: (value: string) => void,
  reviewFinish: string,
  setReviewFinish: (value: string) => void,
  reviewIsLimitedRelease: boolean,
  setReviewIsLimitedRelease: (value: boolean) => void,
  reviewReleaseYear: string,
  setReviewReleaseYear: (value: string) => void,
  reviewPrice: number | null,
  setReviewPrice: (value: number | null) => void,
  handleIntegerInput: (
    e: React.FocusEvent<HTMLInputElement>, 
    setFunction: (value: number | null) => void, 
    returnFloat: boolean,
    decimalPlaces: number,
  ) => void,
  formState: any,
}

export default function WhiskeyStatsFormElements({ 
  reviewCategorySelected, 
  reviewDistillery, 
  setReviewDistillery, 
  reviewDistilleryLocation, 
  setReviewDistilleryLocation, 
  reviewBatch, 
  setReviewBatch, 
  reviewAge, 
  setReviewAge, 
  reviewMashBill,
  setReviewMashBill,
  reviewBlend,
  setReviewBlend,
  reviewFinish,
  setReviewFinish,
  reviewIsLimitedRelease,
  setReviewIsLimitedRelease,
  reviewReleaseYear,
  setReviewReleaseYear,
  reviewPrice,
  setReviewPrice,
  handleIntegerInput,
  formState, 
}: WhiskeyStatsFormElementsProps) {
  return (
    <>
      {/* 
      Type: Blend of Straight Bourbon and Rye Whiskeys Finished in Single Malt Scotch Whisky Barrels
      Batch: 2026-02 “Milkshake Batch”
      Age: Blend of 10, 11, and 12-year-old whiskeys
      Proof: 104 (52% ALC/VOL)
      Mash Bill(s): 75/21/0/4, 0/95/0/5, 75/13/0/12
      Blend: 49% Indiana 11-Year Bourbon, 30% Indiana 10-Year Rye, 21% Kentucky 12-Year Bourbon

      Finish: 32 months in Single Malt Scotch whisky barrels
      Releasee: Limited 2026
      Price: $140 */}
      <div className={cn("flex flex-col items-start w-full", reviewCategorySelected !== "1" && "hidden")}>
        <div 
          className="flex flex-col md:flex-row justify-start md:justify-between items-start space-x-0 md:space-x-8 space-y-4 md:space-y-0 w-full mb-4"
        >
          {/* Distillery */}
          <div className="flex flex-col items-start w-full">
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> Distillery
            </label>
            <input type="text" name="reviewDistillery" defaultValue={reviewDistillery ?? ""}
              className={styles.formInput}
              onBlur={(e) => setReviewDistillery(e.currentTarget.value)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewDistillery" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewDistillery?: string }).reviewDistillery}</div>)}
          </div>
          {/* Distillery Location */}
          <div className="flex flex-col items-start w-full">
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> Distillery Location
            </label>
            <input type="text" name="reviewDistilleryLocation" defaultValue={reviewDistilleryLocation ?? ""}
              className={styles.formInput}
              onBlur={(e) => setReviewDistilleryLocation(e.currentTarget.value)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewDistilleryLocation" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewDistilleryLocation?: string }).reviewDistilleryLocation}</div>)}
          </div>
        </div>
        <div 
          className="flex flex-col justify-start md:justify-between items-start md:flex-row space-x-0 md:space-x-8 space-y-4 md:space-y-0 w-full mb-4"
        >  
          {/* Batch */}
          <div className="flex flex-col items-start w-full">
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> Batch
            </label>
            <input type="text" name="reviewBatch" defaultValue={reviewBatch ?? ""}
              className={styles.formInput}
              onBlur={(e) => setReviewBatch(e.currentTarget.value)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewBatch" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewBatch?: string }).reviewBatch}</div>)}
          </div>
          {/* Age */}
          <div className="flex flex-col items-start w-full">
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> Age
            </label>
            <input type="text" name="reviewAge" defaultValue={reviewAge ?? ""}
              className={styles.formInput}
              onBlur={(e) => setReviewAge(e.target.value)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewAge" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewAge?: string }).reviewAge}</div>)}
          </div>
        </div>
        <div 
          className="flex flex-col justify-start md:justify-between items-start md:flex-row space-x-0 md:space-x-8 space-y-4 md:space-y-0 w-full mb-4"
        >  
          {/* Mash Bill */}
          <div className="flex flex-col items-start w-full">
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> Mash Bill
            </label>
            <input type="text" name="reviewMashBill" defaultValue={reviewMashBill ?? ""}
              className={styles.formInput}
              onBlur={(e) => setReviewMashBill(e.currentTarget.value)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewMashBill" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewMashBill?: string }).reviewMashBill}</div>)}
          </div>
          {/* Blend */}
          <div className="flex flex-col items-start w-full">
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> Blend
            </label>
            <input type="text" name="reviewBlend" defaultValue={reviewBlend ?? ""}
              className={styles.formInput}
              onBlur={(e) => setReviewBlend(e.target.value)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewBlend" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewBlend?: string }).reviewBlend}</div>)}
          </div>
        </div>
        <div 
          className="flex flex-col md:flex-row justify-start md:justify-between items-start space-x-0 md:space-x-8 space-y-4 md:space-y-0 w-full mb-4"
        >  
          {/* Finish */}
          <div className="flex flex-col items-start w-full">
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> Finish
            </label>
            <input type="text" name="reviewFinish" defaultValue={reviewFinish ?? ""}
              className={styles.formInput}
              onBlur={(e) => setReviewFinish(e.currentTarget.value)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewFinish" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewFinish?: string }).reviewFinish}</div>)}
          </div>
          {/* Blend */}
          <div className="flex flex-col items-start w-full">
            <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
              <span className="text-error">*</span> Blend
            </label>
            <input type="text" name="reviewBlend" defaultValue={reviewBlend ?? ""}
              className={styles.formInput}
              onBlur={(e) => setReviewBlend(e.target.value)}
            />
            {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewBlend" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewBlend?: string }).reviewBlend}</div>)}
          </div>
        </div>

        <div 
          className="flex flex-col md:flex-row justify-start md:justify-between items-start space-x-0 md:space-x-8 space-y-4 md:space-y-0 w-full mb-1"
        >  
            {/* Limited Release */}
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center justify-self-stretch">
                {/* <Switch
                  id="LimitedRelease"
                  className="border border-black data-[state=checked]:bg-black data-[state=unchecked]:bg-white data-[state=checked]:[&_[data-slot=switch-thumb]]:bg-white data-[state=unchecked]:[&_[data-slot=switch-thumb]]:bg-black"
                  defaultChecked={reviewIsLimitedRelease}
                  onCheckedChange={setReviewIsLimitedRelease}
                /> */}
                <Checkbox 
                  id="LimitedRelease" 
                  name="LimitedRelease" 
                  className="text-white font-bold size-5 border-black"
                  checked={reviewIsLimitedRelease} 
                  onCheckedChange={setReviewIsLimitedRelease} 
                />
                <label
                  htmlFor="LimitedRelease"
                  className={cn(styles.formLabel, "text-sm font-bold tracking-wide ml-2")}
                >
                  Limited Release
                </label>
              </div>
              {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewIsLimitedRelease" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewIsLimitedRelease?: string }).reviewIsLimitedRelease}</div>)}
            </div>
            {/* Release Year */}
            <div 
              className={cn(
                "flex flex-col items-start w-full",
                reviewIsLimitedRelease ? "visible" : "invisible"
              )}
            >
              <YearSelect
                startYear={1960}
                endYear={new Date().getFullYear()}
                selectClassName="w-auto mb-2"
                selectLabel="Release Year"
                selectName="reviewReleaseYear"
                selectPlaceholder="Select a year"
                selectedValue={reviewReleaseYear}
                setSelectedValue={setReviewReleaseYear}
              />
              {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewReleaseYear" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewReleaseYear?: string }).reviewReleaseYear}</div>)}
            </div>
          </div>
          
          <div 
            className="flex flex-col md:flex-row justify-start md:justify-between items-start space-x-0 md:space-x-8 space-y-4 md:space-y-0 w-full mb-1"
          >  
            <div className="flex flex-col items-start mb-4 w-full">
              <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
                <span className="text-error">*</span> Price
              </label>
              <input type="text" name="reviewPrice" 
                defaultValue={reviewPrice ?? ""}
                className={styles.formInput}
                onBlur={(e) => handleIntegerInput(
                  e, (value) => {
                    e.target.value = Number(value).toFixed(0);
                    setReviewPrice(Number(value)); 
                  }, false, 0
                )}
              />
              {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewPrice" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewPrice?: string }).reviewPrice}</div>)}
            </div>
            <div className="flex flex-col items-start mb-4 w-full"></div>
          </div>







        {/* Proof*/}
        {/* <div className="flex flex-col items-start mb-4">
          <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide")}>
            <span className="text-error">*</span> Proof
          </label>
          <input type="text" name="reviewProof" inputMode="decimal" defaultValue={reviewProof ?? ""}
            className={styles.formInput}
            onBlur={(e) => setReviewProof(e.target.value)}
          />
          {formState?.errors && typeof formState.errors === "object" && !Array.isArray(formState.errors) && "reviewProof" in formState.errors && (<div className="text-error text-sm italic mt-1">{(formState.errors as { reviewProof?: string }).reviewProof}</div>)}
        </div> */}
      </div>
    </>
  )
}