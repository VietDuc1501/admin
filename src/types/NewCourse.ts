interface NewCourse {
    name: string;
    description: string;
    categoryId: string;
    courseStatus: string;
    imageUrl?: string | null;
}

export default NewCourse;