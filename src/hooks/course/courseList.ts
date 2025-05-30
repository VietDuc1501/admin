const getAllCourses = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses`);
        if (!response.ok) throw new Error('Failed to fetch courses');
        return await response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

export default getAllCourses;