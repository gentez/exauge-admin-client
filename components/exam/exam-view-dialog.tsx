"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  format,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";
import { CheckCircle2, XCircle } from "lucide-react"
import { ReactNode } from "react";

interface Exam {
  exam_id: string;
  created_at: string;
  exam: string;
  options: string[];
  answer: string;
  result: "correct" | "incorrect";
  user_id: string;
}

interface ExamViewDialogProps {
  exam: Exam;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExamViewDialog({ exam, open, onOpenChange }: ExamViewDialogProps) {
  if (!exam) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Exam Details</DialogTitle>
          <DialogDescription>
            Exam ID: {exam.exam_id} • 
            {isToday(new Date(exam.created_at))
              ? "Today"
              : isTomorrow(new Date(exam.created_at))
              ? "Tomorrow"
              : isYesterday(new Date(exam.created_at))
              ? "Yesterday"
              : format(new Date(exam.created_at), "MMM dd, yyyy")
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h3 className="font-medium text-gray-500 mb-1">Question</h3>
            <p className="text-lg">{exam.exam}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-500 mb-1">Options</h3>
            <ul className="space-y-2">
              
              {exam.options.map((option, index) => (
                <li
                  key={index}
                  className={`p-2 rounded-md border ${
                    option === exam.answer
                      ? exam.result === "correct"
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{index + 1}.</span>
                    <span>{option}</span>
                    {option === exam.answer && (
                      <span className="ml-auto">
                        {exam.result === "correct" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Result</h3>
              <Badge
                variant={exam.result === "correct" ? "default" : "destructive"}
                className={exam.result === "correct" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
              >
                {exam.result === "correct" ? "Correct" : "Incorrect"}
              </Badge>
            </div>
            <div>
              <h3 className="font-medium text-gray-500 mb-1">User ID</h3>
              <span>{exam.user_id}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
