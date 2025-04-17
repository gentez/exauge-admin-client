import { authenticateClient } from "@/lib/modules/auth"
import { getExam, updateExam } from "@/lib/modules/quiz"
import { NextResponse, NextRequest } from "next/server"
import OpenAI from "openai"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { exam_id: number; result: string; user_id: number }
    const { exam_id, result, user_id } = body
    if (!exam_id || !result || !user_id) {
      return NextResponse.json({ success: false, message: "Required fields are missing" }, { status: 400 })
    }
    const auth = await authenticateClient()
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: auth.status })
    }
    // find the exam by id
    const exam = await getExam(exam_id)
    if (!exam || exam.length === 0) {
      return NextResponse.json({ success: false, message: "Exam not found" }, { status: 404 })
    }
    //update the exam with the result
    const updatedExam = await updateExam({
      exam_id: exam_id,
      result: result,
      client_id: String(auth.data?.user_id),
      user_id: Number(user_id),
    })
    if (!updatedExam) {
      return NextResponse.json({ success: false, message: "Failed to update exam" }, { status: 500 })
    }
    return NextResponse.json({ success: true, message: "Exam updated successfully" }, { status: 200 })
  } catch (err) {
    console.error("Error generating quiz:", err)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
