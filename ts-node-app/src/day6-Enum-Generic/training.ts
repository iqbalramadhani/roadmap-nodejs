// 1. Enum untuk role
enum Role {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest"
}

// 2. Generic interface
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// 3. Contoh implementasi
const userResponse: ApiResponse<{ id: number; name: string; role: Role }> = {
  status: 200,
  message: "Success get user data",
  data: {
    id: 1,
    name: "Iqbal",
    role: Role.ADMIN
  }
};

console.log(userResponse);
