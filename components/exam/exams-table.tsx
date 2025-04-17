"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ExamViewDialog } from "./exam-view-dialog"
import {
  format,

  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";

// Sample data - in a real app, this would come from an API


export function ExamsTable({
  examsData
}: {
  examsData: {
    exam_id: string
    created_at: string
    exam: string
    options: string[]
    answer: string
    result: "correct" | "incorrect"
    user_id: string
  }[]
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [resultFilter, setResultFilter] = useState("all")
  const [selectedExam, setSelectedExam] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter exams based on search query and result filter
  const filteredExams = examsData.filter((exam) => {
    const matchesSearch = exam.exam.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesResult = resultFilter === "all" || exam.result === resultFilter
    return matchesSearch && matchesResult
  })

  const handleViewExam = (exam:any) => {
    setSelectedExam(exam)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search exams..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={resultFilter} onValueChange={setResultFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by result" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Results</SelectItem>
            <SelectItem value="correct">Correct</SelectItem>
            <SelectItem value="incorrect">Incorrect</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead className="max-w-[400px]">Exam Question</TableHead>
              <TableHead>Result</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <TableRow key={exam.exam_id}>
                  <TableCell className="font-medium">{exam.exam_id}</TableCell>
                  <TableCell className="max-w-[400px] truncate">{exam.exam}</TableCell>
                  <TableCell>
                    <Badge
                      variant={exam.result === "correct" ? "default" : "destructive"}
                      className={exam.result === "correct" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {exam.result === "correct" ? "Correct" : "Incorrect"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{
                    isToday(new Date(exam.created_at))
                      ? "Today"
                      : isTomorrow(new Date(exam.created_at))
                      ? "Tomorrow"
                      : isYesterday(new Date(exam.created_at))
                      ? "Yesterday"
                      : format(new Date(exam.created_at), "MMM dd, yyyy")
                    }</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewExam(exam)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View exam</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No exams found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedExam && <ExamViewDialog exam={selectedExam} open={isDialogOpen} onOpenChange={setIsDialogOpen} />}
    </div>
  )
}
