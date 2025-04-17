import { createExamDTO } from "@/lib/types/ExamDTO";
import { prisma } from "lib/clients/prisma"

export async function getExams(id:number): Promise<Array<any>> {
  try {
    const exams = await prisma.exam.findMany({
        where: {
            user_id: id,
        },
        });
    return exams ? [exams] : [];
  } catch (error) {
    console.error("Failed to get exams from database")
    throw error
  }
}

export async function getExam(id:number): Promise<Array<any>> {
    try {
       const exam = await prisma.exam.findUnique({
        where: {
            exam_id: id,
        },
       })
         return exam ? [exam] : [];
    } catch (error) {
      console.error("Failed to get exam from database")
      throw error
    }
  }

export async function createExam (exam: createExamDTO): Promise<any> {

    try {
        const newExam = await prisma.exam.create({
            data: {
                ...exam,
                result: exam.result || "", // Ensure 'result' is included, defaulting to an empty string if not provided
            },
        })
        return newExam
    } catch (error) {
        console.error("Failed to create exam in database")
        throw error
    }
}
export async function updateExam (exam: any): Promise<any> {

    try {
        const updatedExam = await prisma.exam.update({
            where: {
                exam_id: exam.exam_id,
            },
            data: exam,
        })
        return updatedExam
    } catch (error) {
        console.error("Failed to update exam in database")
        throw error
    }
}
