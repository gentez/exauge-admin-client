import Header from "@/components/header/header"
import { Metadata } from "next"
import "styles/tailwind.css"

export const metadata: Metadata = {
  title: "Exauge Header",
  description: "Header Layout For Main",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}

    </>
  )
}
