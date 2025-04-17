import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="py-10 mb-10 text-center space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Exauge Widget</h1>
      <p className="text-xl text-gray-500 max-w-2xl mx-auto">
        An AI-powered quiz generator that helps your users test their knowledge on your content
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button asChild>
          <a
            href="https://www.npmjs.com/package/exauge-widget"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <span>View on npm</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}
