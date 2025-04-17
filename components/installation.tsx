import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Installation() {
  return (
    <section id="installation">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Installation</CardTitle>
          <CardDescription>How to install the Exauge Widget in your Next.js project</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="npm">
            <TabsList className="mb-4">
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>npm install exauge-widget</code>
              </pre>
            </TabsContent>
            <TabsContent value="yarn">
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>yarn add exauge-widget</code>
              </pre>
            </TabsContent>
            <TabsContent value="pnpm">
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>pnpm add exauge-widget</code>
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
