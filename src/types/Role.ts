interface Role {
  id: string;             // Luôn nên có vì UUID dùng cho API mapping
  roleName: string;       // Tên định danh trong hệ thống (ví dụ: ADMIN, USER)
  name?: string;          // Nếu API trả thêm name dùng để hiển thị
}

export default Role;
