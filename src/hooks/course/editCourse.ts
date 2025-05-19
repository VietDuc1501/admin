import Course from '../../types/Course';
import Category from '../../types/Category';

// Fetch course by id
export const fetchCourseById = async (id: string): Promise<Course | null> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}`);
        if (!response.ok) throw new Error('Failed to fetch course');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Fetch all categories
export const fetchAllCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Update course by id
export const updateCourseById = async (id: string, updatedCourse: Partial<Course>): Promise<Response> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCourse),
        });
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};