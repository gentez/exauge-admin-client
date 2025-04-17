import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Props() {
  return (
    <section id="props">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Props</CardTitle>
          <CardDescription>Configuration options for the QuizWidget component</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left font-medium">Prop</th>
                  <th className="py-2 px-4 text-left font-medium">Type</th>
                  <th className="py-2 px-4 text-left font-medium">Required</th>
                  <th className="py-2 px-4 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">
                    <code>position</code>
                  </td>
                  <td className="py-2 px-4">
                    <code>string</code>
                  </td>
                  <td className="py-2 px-4">Yes</td>
                  <td className="py-2 px-4">
                    Position of the widget on the page. Options: <code>"bottom-right"</code>, <code>"bottom-left"</code>
                    , <code>"top-right"</code>, <code>"top-left"</code>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">
                    <code>userId</code>
                  </td>
                  <td className="py-2 px-4">
                    <code>number</code>
                  </td>
                  <td className="py-2 px-4">Yes</td>
                  <td className="py-2 px-4">Your client user ID provided by Exauge</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">
                    <code>htmlId</code>
                  </td>
                  <td className="py-2 px-4">
                    <code>string</code>
                  </td>
                  <td className="py-2 px-4">Yes</td>
                  <td className="py-2 px-4">ID of the HTML element containing the content to generate quizzes from</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
