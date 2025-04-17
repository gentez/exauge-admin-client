"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import data from "./data.json"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Page() {
  const [data, setData] = useState(null)
  const [usageData, setUsageData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // call the api/analytics
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("/api/analytics")
        if (response?.data?.success) {
          console.log("response", response?.data?.data)
          setData(response?.data?.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    const fetchUsageData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("/api/usage")
        if (response?.data?.success) {
          console.log("response", response?.data?.data)
          setUsageData(response?.data?.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    fetchUsageData()
  }, [])
  // if loading true and data is null then show loading
  if (isLoading || !data) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    )
  }
  // if loading false and data is null then show error
  // if (!isLoading && !data) {
  //   return (
  //     <div className="flex flex-1 items-center justify-center">
  //       <div className="text-red-500">Error fetching data</div>
  //     </div>
  //   )
  // }
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader name="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards
                // @ts-ignore
                data={data?.cards}
              />
              {
                usageData && usageData.length > 0 ? (<div className="px-4 lg:px-6">
                <ChartAreaInteractive chartData={usageData || []} />
              </div>):(

<div className="flex flex-1 items-center justify-center">
<div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
</div>
              )
              }
              
              {/* <DataTable data={data?.table} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
