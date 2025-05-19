import NewCourse from '../../types/NewCourse';
const createCourseApi = async (course: NewCourse): Promise<Response> => {
    try {
        const response = await fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        });
        return response;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
};

export default createCourseApi;