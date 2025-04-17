"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import ParticleBackground from "@/components/particle-background"
import QuizGenerator from "@/components/quiz-generator"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()
  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate exam generation
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative overflow-hidden font-sans">
      {/* Position the ParticleBackground component */}
      <ParticleBackground
        className="absolute inset-0 -z-10 lg:clip-path-left-centered"
        particleProps={{
          offsetX: -0.3,
          offsetY: 0.2,
          color: "#4a9eff",
          opacity: 0.8,
        }}
      />

      <div className="z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Main content */}
        <div className="text-center lg:text-left relative">
          {/* Add a subtle glow effect behind the heading */}
          <div className="absolute -inset-4 bg-blue-500/10 blur-xl rounded-full hidden lg:block"></div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight relative">
            AI Exam <span className="text-blue-400">Generator</span>
          </h1>
          <p className="text-xl mb-8 text-gray-300 font-light">
            Harness the power of AI to create personalized, challenging exams in seconds. Revolutionize your assessment
            process with cutting-edge technology.
          </p>
          <Button
            onClick={
              () => {
                // handleGenerate()
                router.push("/register")
              } /* Redirect to the generate page */
            }
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-200 ease-in-out transform hover:scale-105"
          >
            Get Started
          </Button>
        </div>

        {/* Right side - Quiz generation animation */}
        <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-xl">
          <QuizGenerator />
        </div>
      </div>
    </main>
  )
}
