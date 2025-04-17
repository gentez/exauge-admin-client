import { Metadata } from "next"
import "styles/tailwind.css"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: "Exauge | AI Generated Exams",
  twitter: {
    card: "summary_large_image",
  }
 
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <SessionProvider>
        <body>{children}</body>
      </SessionProvider>
    </html>
  )
}
