export interface Submission {
  id: string;
  title: string;
  content: string;
  courseId: string;
  studentId: string;
  // Thêm các trường khác nếu cần, ví dụ:
  // createdAt?: string;
  // updatedAt?: string;
}

export default Submission;