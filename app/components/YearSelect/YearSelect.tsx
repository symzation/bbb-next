import { styles } from "@/utils/constants"
import { cn } from "@/lib/utils"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

type YearSelectProps = {
  startYear: number
  endYear?: number
  descending?: boolean
  selectClassName?: string
  selectLabel?: string
  selectLabelClassName?: string
  selectName?: string
  selectPlaceholder?: string
  selectWrapperClassName?: string
  selectedValue: string
  setSelectedValue: (value: string) => void
}

export default function YearSelect({
  startYear,
  endYear = new Date().getFullYear(),
  descending = true,
  selectedValue,
  setSelectedValue,
  selectClassName = "",
  selectLabel = "Year",
  selectLabelClassName,
  selectName = "limitedYear",
  selectPlaceholder = "Select a year",
  selectWrapperClassName = "",
}: YearSelectProps) {
  const years = Array.from(
    { length: endYear - startYear + 1 }, (_, index) =>
    descending ? endYear - index : startYear + index
  )

  return (
    <div className={cn("flex flex-col w-full", selectWrapperClassName)}>
      <label className={cn(styles.formLabel, "text-sm font-bold tracking-wide", selectLabelClassName)}>
        <span className="text-error">*</span> {selectLabel} 
      </label>
      <Select 
        name={selectName} 
        value={selectedValue} 
        onValueChange={(value) => setSelectedValue(value)}
      >
        <SelectTrigger className={cn(styles.selectTriggerClass, selectClassName)}>
          <SelectValue placeholder={selectPlaceholder} />
        </SelectTrigger>
        <SelectContent className={styles.selectContentClass}>
          <SelectItem value="">{selectPlaceholder}</SelectItem>
          {years.map((year) => (
            <SelectItem 
              key={year} 
              value={year.toString()} 
              className={styles.selectItemClass}
            >
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}