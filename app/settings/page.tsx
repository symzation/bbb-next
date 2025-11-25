"use client"

import { useState } from "react"
import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { SettingsItemsList } from "@/components/Settings/SettingsItemsList"
//import { observeWindowScroll } from "@/utils/helpers"
import { useAuthContext } from "@/providers/AuthProvider"
import AppConnects from "@/components/Settings/AppConnects"
import CloseSessions from "@/components/Settings/CloseSessions"
import DeactivateAccount from "@/components/Settings/DeactivateAccount"
import DeleteAccount from "@/components/Settings/DeleteAccount"
import Profile from "@/components/Settings/Profile"

const itemsList = [
  { name: "Account", description: "Manage your account settings." },
  { name: "Publishing", description: "Manage your publishing settings." },
  { name: "Notifications", description: "Manage your notification settings." },
  { name: "Connected Account", description: "Manage your linked accounts." },
  { name: "Danger Zone", description: "Danger zone actions and settings." },
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState<string>("Account")

  const settingSectionClass = "mb-6"

  const scrollToElement = (settingName: string) => {
    const targetElement = document.querySelector(`#${settingName}`)
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth", // Optional: for smooth scrolling animation
        block: "start"      // Optional: align the top of the element with the top of the viewport
      })
    }

    setActiveSection(settingName)
  }

  return (
    <div className={cn(styles.pageClass, "px-5")}>
      <h1 className="text-3xl font-bold w-full mb-5">Settings</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/6 h-fit md:h-screen mb-10 md:mb-0 border-none md:border-r-1 md:border-gray-300 relative">
          <SettingsItemsList 
            activeSection={activeSection}
            itemsList={itemsList}
            scrollToElement={scrollToElement}
          />
        </div>
        <div className="w-full md:w-4/6 h-fit md:h-screen">
          <div id="Account" className={settingSectionClass}>
            <h3 className="text-xl font-bold tracking-wide my-2 mt-0">Account</h3>
            <Profile />
          </div>
          
          <div id="Publishing" className={settingSectionClass}>
            <h3 className="text-xl font-bold tracking-wide my-2">Publishing</h3>
          </div>

          <div id="Notifications" className={settingSectionClass}>
            <h3 className="text-xl font-bold tracking-wide my-2">Notifications</h3>
          </div>

          <div id="ConnectedAccount" className={settingSectionClass}>
            <h3 className="text-xl font-bold tracking-wide my-2">
              Connected Account
            </h3>
            <AppConnects />
          </div>

          <div id="DangerZone" className={cn(settingSectionClass, "p-2 pt-0 border border-warning")}>
            <h3 className="text-warning text-xl font-bold tracking-wide my-2">
              Danger Zone
            </h3>
            <CloseSessions />
            <DeactivateAccount />
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  )
}