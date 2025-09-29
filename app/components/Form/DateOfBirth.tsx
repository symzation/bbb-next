import { useState, ChangeEvent } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"

type DateOfBirthProps = {
  dobValue?: string | undefined
}

export default function DateOfBirth({
  dobValue
}: DateOfBirthProps) {
  const date = dobValue ? new Date(dobValue).getTime() : Date.now()
  const todayMonth = new Date(date).getMonth() // 0-11
  const todayDay = new Date(date).getDate()
  const todayYear = new Date(date).getFullYear() // 4-digit year

  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(todayMonth)
  const [selectedDay, setSelectedDay] = useState<number>(todayDay)
  const [selectedYear, setSelectedYear] = useState<number>(todayYear)
  const [validAge, setValidAge] = useState<boolean>(true)

  const getMonths = (
    format: "long" | "short" = "long",
    locales?: string | string[]
  ): string[] => {
    const year = selectedYear // 2020
    const monthList = [...Array(12).keys()] // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const formatter = new Intl.DateTimeFormat(locales, { month: format })
    const getMonthName = (monthIndex: number) => formatter.format(new Date(year, monthIndex))
    return monthList.map(getMonthName)
  }

  const getMonthDays = (month: number): number[] => {
    const daysInMonth = new Date(selectedYear, month + 1, 0).getDate() // month is 0-indexed
    return Array.from({ length: daysInMonth }, (_, i) => i + 1)
  }

  const getYears = (startYear: number = todayYear - 120, endYear: number = todayYear): number[] => {
    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).reverse()
  }

  const handleMonthSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonthIdx(parseInt(e.target.value))
  }

  const handleDaySelection = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedDay(parseInt(e.target.value))
  }

  const handleYearSelection = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedYear(parseInt(e.target.value))
  }

  const ageCheck = () => {
    const selectedDate = new Date(`${selectedYear}-${selectedMonthIdx + 1}-${selectedDay}`) // Your selected date
    const currentDate = new Date()
    let age = currentDate.getFullYear() - selectedDate.getFullYear()
    const monthDifference = currentDate.getMonth() - selectedDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < selectedDate.getDate())) {
      age--;
    }

    setValidAge(age >= 21 ? true : false)
  }

  return (
    <>
      <span className={cn(styles.formLabel, 'mt-1 -mb-0.5 pl-1')}>
        Date of Birth (must be 21+ to register)
      </span>
      <div className="flex space-x-2" onBlur={ageCheck}>
        <select
          name="dobMonth"
          className={cn(styles.formInput)}
          value={selectedMonthIdx}
          onChange={handleMonthSelection}
        >
          {getMonths().map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        <select name="dobDay" className={cn(styles.formInput)} value={selectedDay} onChange={handleDaySelection}>
          {getMonthDays(selectedMonthIdx).map((days, index) => (
            <option key={index} value={days}>{days}</option>
          ))}
        </select>
        <select name="dobYear" className={cn(styles.formInput)} value={selectedYear} onChange={handleYearSelection}>
          {getYears().map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
        <input type="hidden" name="dateOfBirth" value={`${selectedYear}-${(selectedMonthIdx + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`} />
      </div>
      {!validAge && (
        <span className="text-error text-sm italic">You must be 21 and older to register.</span>
      )}
    </>
  )
}