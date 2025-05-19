interface Lesson {
    id: string;
    courseId: string;
    name: string;
    description: string;
    referenceLink?: string;
    lessonDate?: string;
}

export default Lesson;