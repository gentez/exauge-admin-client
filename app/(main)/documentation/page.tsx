import type { Metadata } from "next"
import { Usage } from "@/components/usage"

import { Props } from "@/components/props"
import { Examples } from "@/components/examples"
import { Hero } from "@/components/hero"
import { Installation } from "@/components/installation"

export const metadata: Metadata = {
  title: "Exauge Widget Documentation",
  description: "Documentation for the Exauge Widget - an AI-powered quiz generator for your content-based website",
}

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Hero />
      <div className="space-y-12">
        <Installation />
        <Usage />
        <Props />
        <Examples />
      </div>
    </div>
  )
}
