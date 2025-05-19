interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    status: "ACTIVE" | "INACTIVE";
    roleId: string;
}
export default User;
