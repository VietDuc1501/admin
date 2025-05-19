import Category from '../types/Category';

const categoriesCourse = async (): Promise<Category[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`); // Đổi endpoint nếu cần
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data as Category[];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export default categoriesCourse;