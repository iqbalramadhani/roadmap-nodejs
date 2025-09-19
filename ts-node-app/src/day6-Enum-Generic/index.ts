enum Role {
    GUEST,
    ADMIN,
    USER,
}

const userRole: Role = Role.ADMIN;
console.log(userRole);
console.log(Role[2]);


// string ENUM
enum Status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    BANNED = "banned"
}

const accountStatus: Status = Status.ACTIVE;
console.log(accountStatus);

// Generic Function -> Fungsi yang bisa digunakan untuk semua enum
function identity<T>(value: T): T {
    return value;
}

console.log(identity<string>("Iqbal"));
console.log(identity<number>(123));

// Generic Array -> Array yang bisa digunakan untuk semua enum
function wrapInArray<T>(value: T): T[] {
    return [value];
}

console.log(wrapInArray("Node JS"));
console.log(wrapInArray(99));

// Generic Interface -> Interface yang bisa digunakan untuk semua enum
interface ApiResponse<T> {
    status: number;
    data: T;
}

const userResponse: ApiResponse<{ id: number, name: string }> = {
    status: 200,
    data: { id: 1, name: "Iqbal" }
}

console.log(userResponse);




