import Role from "../../types/Role";

const getAllRoles = async (): Promise<Role[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/roles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = `Failed to fetch roles: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    const data: Role[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

export default getAllRoles;
