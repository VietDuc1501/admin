interface Course {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    courseStatus: "ACTIVE" | "INACTIVE";
    imageUrl?: string | null;
}

export default Course;