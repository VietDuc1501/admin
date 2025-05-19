import Role from '../../types/Role';

const getAllRoles = async (): Promise<Role[]> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/roles`);
        if (!response.ok) throw new Error('Failed to fetch roles');
        return await response.json();
    } catch (error) {
        console.error('Error fetching roles:', error);
        return [];
    }
};

export default getAllRoles;