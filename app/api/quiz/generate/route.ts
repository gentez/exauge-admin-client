import { authenticateClient } from "@/lib/modules/auth"
import { createExam } from "@/lib/modules/quiz"
import { NextResponse, NextRequest } from "next/server"
import OpenAI from "openai"
import { v4 } from "uuid"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { html_id: string; content: string; user_id: string }
    const { html_id, content, user_id } = body

    if (!html_id || !content || !user_id) {
      return NextResponse.json({ success: false, message: "No HTML content provided" }, { status: 400 })
    }
    
    const auth = await authenticateClient()
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status })
    }
    const prompt = `
You are an educational assistant. Analyze the following article content and create a multiple-choice question.

Question should have:
- a clear question
- 4 unique options
- 1 correct option

You must return a JSON object with the following structure:
{
  "question": "Question text",
  "options": [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  "answer": "Correct option"
}

Article Content:
${content}
    `.trim()

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    })
    if (!completion || !completion.choices || completion.choices.length === 0) {
      return NextResponse.json({ success: false, message: "Failed to generate quiz" }, { status: 500 })
    }
    const rawText = completion.choices[0]?.message?.content || ""
    // @ts-ignore
    const { question, options, answer } = JSON.parse(rawText)
    if (!question || !options || !answer) {
      return NextResponse.json({ success: false, message: "Failed to generate quiz" }, { status: 500 })
    }
    const exam = {
      html_id: html_id,
      exam: question,
      exam_guid: v4(),
      options: options,
      answer: answer,
      user_id: Number(user_id),
      // @ts-ignore
      client_id: Number(auth?.data?.user_id),
      attempt: false,
      result: "",
    }
    // @ts-ignore
    const createdExam = await createExam(exam)
    if (!createdExam) {
      return NextResponse.json({ success: false, message: "Failed to create exam" }, { status: 500 })
    }
    // Save the exam to the database
    return NextResponse.json({ success: true, data: createdExam }, { status: 200 })
  } catch (err) {
    console.error("Error generating quiz:", err)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
