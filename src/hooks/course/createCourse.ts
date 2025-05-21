import NewCourse from '../../types/NewCourse';

const createCourseApi = async (course: NewCourse): Promise<any> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create course');
        }
        return data;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};

export default createCourseApi;