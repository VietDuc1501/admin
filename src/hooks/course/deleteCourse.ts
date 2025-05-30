const deleteCourseById = async (id: string): Promise<Response> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}`, {
            method: 'DELETE',
        });
        return response;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
};

export default deleteCourseById;