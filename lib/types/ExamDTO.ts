export interface ExamDTO {
    exam_id: string;
    exam_guid: string;
    client_id: string;
    exam: string;
    options: string[];
    answer: string;
    result?: string;
    html_id: string;
    attempt: boolean;
    user_id: number;
    created_at: Date;
    updated_at: Date;

}

export interface createExamDTO {
    exam: string;
    exam_guid: string;
    client_id: string;
    options: string[];
    answer: string;
    html_id: string;
    attempt: boolean;
    user_id: number;
    result?: string;

}