"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react"
import { LoginAction } from "@/app/(auth)/action"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}


    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      const response = await LoginAction(formData.email, formData.password)

      if (response.success) {
        setSuccess(true)

        // Redirect to home page after successful signup
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setErrors({ form: "Failed to login to account. Please try again." })
      }
    } catch (error) {
      console.error("Login failed:", error)
      setErrors({ form: "Failed to login to account. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative overflow-hidden font-sans">

    <div className="z-10 w-full max-w-md">
      <Link href="/" className="mb-6 flex items-center text-gray-300 transition-colors hover:text-white">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="border-gray-800 bg-gray-900/80 text-white shadow-xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription className="text-gray-400">
            Join AI Exam Generator to start creating personalized exams
          </CardDescription>
        </CardHeader>

        <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="flex items-start rounded border border-red-800 bg-red-900/30 px-4 py-3 text-red-300">
                  <AlertCircle className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}


              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-800/50 text-white"
                  placeholder="john.doe@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-gray-700 bg-gray-800/50 text-white"
                />
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>

              

              <Button
                type="submit"
                className="mt-6 w-full transform rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
    // </main>
  )
}
