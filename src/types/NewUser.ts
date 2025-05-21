interface NewUser {
  name: string;
  email: string;
  password: string;
  status: "ACTIVE" | "INACTIVE";
  roleId: string;
}

export default NewUser;
