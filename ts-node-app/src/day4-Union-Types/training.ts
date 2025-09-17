// 1. Literal type
type Role = "admin" | "user" | "guest";

// 2. Interface dengan union, nullable, optional
interface Account {
  id: number | string;   // union
  username: string;
  role: Role;            // literal
  email?: string;        // optional
  bio: string | null;    // nullable
}

// 3. Contoh object

const adminAccount: Account = {
  id: 1,
  username: "superadmin",
  role: "admin",
  email: "admin@example.com",
  bio: "The main administrator"
};

const guestAccount: Account = {
  id: "G-123",
  username: "visitor",
  role: "guest",
  // email optional → bisa dikosongkan
  bio: null
};

console.log(adminAccount);
console.log(guestAccount);
