import { useEffect, useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { observeWindowScroll } from "@/utils/helpers"

type SettingsItemsListProps = {
  scrollToElement: (settingName: string) => void
  activeSection: string
  itemsList: ItemType[]
}

type ItemType = {
  name: string
  description: string
}

export function SettingsItemsList({ 
  activeSection,
  itemsList,
  scrollToElement,
}: SettingsItemsListProps) {
  const itemClass = "group flex flex-nowrap flex-row justify-start items-center focus-visible:ring-0 border-none my-1 py-2.5 px-1 cursor-pointer gap-2 hover:bg-gray-100 transition-all duration-150 ease-in-out"
  const itemHeader = "basis-0 items-center justify-start gap-2 w-0 h-full"
  const itemActiveHeaderClass = "group-basis-0 group-w-4 group-bg-blue-500"
  const itemDescriptionClass = "text-sm text-gray-500"

  return (
    <div className="flex flex-col w-full">
      {itemsList.map((item: ItemType) => (
        <Item 
          key={item.name}
          variant="default" 
          size="default" 
          data-itemname={item.name} 
          className={cn(itemClass, activeSection === item.name ? "border-primary" : "border-transparent")} 
          onClick={() => scrollToElement(item.name)}
        >
          <ItemHeader 
            className={cn(itemHeader, activeSection === item.name ? itemActiveHeaderClass : "")} 
          />
          <ItemContent>
            <ItemTitle>{item.name}</ItemTitle>
            <ItemDescription className={itemDescriptionClass}>
              {item.description}
            </ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  )
}