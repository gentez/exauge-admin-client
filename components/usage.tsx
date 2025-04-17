import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Usage() {
  return (
    <section id="usage">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Usage</CardTitle>
          <CardDescription>How to use the Exauge Widget in your Next.js application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>After installation, you can import and use the QuizWidget component in your Next.js application:</p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code>{`import { QuizWidget } from 'exauge-widget'

export default function Page() {
  return (
    <div>
      <div id="content-for-quiz">
        {/* Your content here that will be used to generate quiz questions */}
        <h1>Understanding Climate Change</h1>
        <p>Climate change refers to long-term shifts in temperatures and weather patterns...</p>
        {/* More content... */}
      </div>

      <QuizWidget 
        position="bottom-right"
        userId={3}
        htmlId="content-for-quiz"
      />
    </div>
  )
}`}</code>
          </pre>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
            <h4 className="font-medium text-amber-800">Important</h4>
            <p className="text-amber-700">
              Make sure to wrap your content in an HTML element with the ID that matches the <code>htmlId</code> prop
              you pass to the QuizWidget.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
