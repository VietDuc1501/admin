import { useEffect, useState } from "react";
import Course from "../../types/Course";

const useCourse = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("/api/courses"); // Đổi endpoint nếu cần
                if (!response.ok) {
                    throw new Error("Failed to fetch courses");
                }
                const data = await response.json();
                setCourses(data as Course[]);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            }
        };
        fetchCourses();
    }, []);

    return { courses, error };
};

export default useCourse;