import { styles } from "@/constants/constants"
import { cn } from "@/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as schema from '@/lib/db/schema'
import { formatCamelCaseString } from "@/utils/helpers"
import ProductTypesDashboard from "@/components/Dashboard/ProductTypes/Dashboard"

export default async function Dashboard() {
  const ComponentMap: { [key: string]: React.ComponentType<any> } = {
    productTypes: ProductTypesDashboard,
  }

  const keysToOmit = [
    'accounts', 'authenticators', 'shopsToAddresses','sessions', 'subTierEnum', 'userRolesEnum', 'usersToAwards', 'verificationTokens'
  ]

  const dbTableNames = 
    Object.keys(schema).filter((tableNames) => !keysToOmit.includes(tableNames))

  const tabsClass = "w-full mt-10 flex flex-col md:flex-row justify-start align-items-center divide-x-0 md:divide-x-1 divide-x-secondary divide-y-1 md:divide-y-0 divide-y-secondary rounded-none"

  const tabsListClass = "flex flex-row md:flex-col justify-start items-center space-y-1 w-full md:w-1/5 h-full rounded-none"

  const tabsTriggerClass = "justify-start w-full h-12 p-4 text-base font-medium capitalize hover:bg-gray-100 rounded-none rounded-l-lg border-1 border-white hover:border-1 hover:border-r-0 hover:border-gray-100 cursor-pointer transition-all duration-150 ease-in-out data-[state=active]:bg-fifth data-[state=active]:text-white data-[state=active]:border-1 data-[state=active]:border-r-0 data-[state=active]:border-primary focus-visible:outline-0 data-[state=active]:shadow-lg" 

  const tabsContentWrapperClass = "w-full md:w-4/5 p-0 md:pl-6"
  const tabsContentClass = "w-full"

  return (
    <div className={cn(styles.pageClass, "px-4 md:px-10")}>
      <h1 className={cn(styles.headingTitle)}>Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage the application.</p>
      <Tabs defaultValue={dbTableNames[0]} className={tabsClass}>
        <TabsList className={tabsListClass}>
          {dbTableNames.map(tableName => {
            return (
              <TabsTrigger key={tableName} value={tableName} className={tabsTriggerClass}>
                {formatCamelCaseString(tableName)}
              </TabsTrigger>
            )
          })}
        </TabsList>
        <div className={tabsContentWrapperClass}>
          {dbTableNames.map(tableName => {
            const TabComponent = ComponentMap[tableName]

            return (
              <TabsContent key={tableName} value={tableName} className={tabsContentClass}>
                {TabComponent ? 
                  <TabComponent /> : 
                  `Change your ${formatCamelCaseString(tableName)} here.`
                }
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
    </div>
  )
}
