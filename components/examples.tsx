import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Examples() {
  return (
    <section id="examples">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Examples</CardTitle>
          <CardDescription>Example implementations of the Exauge Widget</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Usage</TabsTrigger>
              <TabsTrigger value="custom-theme">Custom Theme</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`import { QuizWidget } from 'exauge-widget'

export default function BlogPost() {
  return (
    <article>
      <div id="blog-content">
        <h1>Introduction to JavaScript</h1>
        <p>JavaScript is a programming language that enables interactive web pages...</p>
        <h2>Variables in JavaScript</h2>
        <p>Variables are containers for storing data values...</p>
        {/* More content... */}
      </div>

      <QuizWidget 
        position="bottom-right"
        userId={3}
        htmlId="blog-content"
      />
    </article>
  )
}`}</code>
              </pre>
            </TabsContent>
            <TabsContent value="custom-theme">
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{`import { QuizWidget } from 'exauge-widget'

export default function TutorialPage() {
  return (
    <div>
      <div id="tutorial-content">
        <h1>React Hooks Tutorial</h1>
        <p>React Hooks are functions that let you use state and other React features without writing a class...</p>
        {/* More content... */}
      </div>

      <QuizWidget 
        position="bottom-left"
        userId={3}
        htmlId="tutorial-content"
        questionCount={3}
        theme={{
          primaryColor: '#4f46e5',
          backgroundColor: '#f9fafb',
          textColor: '#1f2937',
          borderRadius: '0.5rem',
          fontFamily: 'Inter, sans-serif'
        }}
      />
    </div>
  )
}`}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
