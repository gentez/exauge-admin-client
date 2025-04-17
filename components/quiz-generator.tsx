"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

const sampleArticle = `
Climate change is the long-term alteration of temperature and typical weather patterns in a place. 
Climate change could refer to a particular location or the planet as a whole. 
Climate change may cause weather patterns to be less predictable. 
These unexpected weather patterns can make it difficult to maintain and grow crops in regions that rely on farming. 
Climate change has also been connected with other damaging weather events such as more frequent and more intense hurricanes, floods, downpours, and winter storms.
`

const quizSteps = [
  { type: "processing", text: "Analyzing article content..." },
  { type: "processing", text: "Identifying key concepts..." },
  { type: "processing", text: "Generating quiz questions..." },
  {
    type: "question",
    text: "What is climate change?",
    options: [
      "A. Short-term weather fluctuations",
      "B. Long-term alteration of temperature and weather patterns",
      "C. Changes in ocean currents only",
      "D. Seasonal variations in rainfall",
    ],
    answer: "B",
  },
  {
    type: "question",
    text: "According to the article, what can climate change make more difficult?",
    options: [
      "A. Building houses",
      "B. Traveling between countries",
      "C. Maintaining and growing crops",
      "D. Studying weather patterns",
    ],
    answer: "C",
  },
  {
    type: "question",
    text: "Which of the following weather events has been connected with climate change?",
    options: [
      "A. More frequent earthquakes",
      "B. Increased volcanic activity",
      "C. More intense hurricanes",
      "D. More predictable weather patterns",
    ],
    answer: "C",
  },
]

export default function QuizGenerator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [displayedOptions, setDisplayedOptions] = useState<string[]>([])

  useEffect(() => {
    if (currentStep >= quizSteps.length) return

    const step = quizSteps[currentStep]
    if (!step) return

    // Reset states for new step
    setDisplayedText("")
    setDisplayedOptions([])
    setIsTyping(true)

    // Type out the text
    let i = -1
    const textInterval = setInterval(() => {
      if (step && i < step.text.length) {
        setDisplayedText((prev) => prev + step.text.charAt(i))
        i++
      } else {
        clearInterval(textInterval)

        // If it's a question, start showing options
        if (step.type === "question") {
          let optionIndex = 0 // Start from 0 instead of -1
          const optionsInterval = setInterval(() => {
            if (optionIndex < (step.options ?? []).length) {
              const option = (step.options ?? [])[optionIndex]
              if (option !== undefined) {
                setDisplayedOptions((prev) => [...prev, option])
              }
              optionIndex++ // Increment after processing the current option
            } else {
              clearInterval(optionsInterval)
              setIsTyping(false)

              // Move to next step after a delay
              setTimeout(() => {
                setCurrentStep((prev) => prev + 1)
              }, 2000)
            }
          }, 300)
        } else {
          // For processing steps, move to next step after a delay
          setIsTyping(false)
          setTimeout(() => {
            setCurrentStep((prev) => prev + 1)
          }, 1000)
        }
      }
    }, 30)

    return () => {
      clearInterval(textInterval)
    }
  }, [currentStep])

  // Restart the animation when it completes
  useEffect(() => {
    if (currentStep >= quizSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(0)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [currentStep])

  return (
    <div className="text-left">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">AI Quiz Generator</h3>
        <Badge variant="outline" className="border-blue-700 bg-blue-900/50 text-blue-300">
          {isTyping ? "Processing..." : "Ready"}
        </Badge>
      </div>

      <div className="mb-6 h-32 overflow-y-auto rounded border border-gray-700 bg-gray-800/50 p-4">
        <h4 className="mb-2 text-sm font-medium text-gray-400">Sample Article:</h4>
        <p className="text-sm text-gray-300">{sampleArticle}</p>
      </div>

      <div className="space-y-4">
        <div className="min-h-[200px]">
          {currentStep < quizSteps.length && (
            <>
              <div className="mb-2 text-sm text-green-400">
                {quizSteps[currentStep]?.type === "processing" ? "AI System:" : "Generated Question:"}
              </div>

              <div className="mb-4 text-white">
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </div>

              {quizSteps[currentStep]?.type === "question" && (
                <div className="mt-4 space-y-2">
                  {displayedOptions.map((option, index) => {
                    // Safely check if this is a correct answer
                    const isCorrectAnswer =
                      option &&
                      quizSteps[currentStep] &&
                      quizSteps[currentStep].type === "question" &&
                      quizSteps[currentStep].answer &&
                      option.indexOf(quizSteps[currentStep].answer + ".") === 0

                    return (
                      <div
                        key={index}
                        className={`rounded p-2 text-white ${
                          isCorrectAnswer
                            ? "border border-green-700 bg-green-800/30"
                            : "border border-gray-700 bg-gray-800/30"
                        }`}
                      >
                        {option}
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}

          {currentStep >= quizSteps.length && (
            <div className="py-8 text-center">
              <p className="mb-2 text-blue-400">Quiz Generation Complete</p>
              <p className="text-sm text-gray-400">Restarting demonstration...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
