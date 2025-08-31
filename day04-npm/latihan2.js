const _ = require("lodash");

// Data dummy 20 user
const users = [
  { id: 1, name: "Ali", role: "admin", age: 30 },
  { id: 2, name: "Budi", role: "user", age: 22 },
  { id: 3, name: "Citra", role: "user", age: 25 },
  { id: 4, name: "Dewi", role: "moderator", age: 28 },
  { id: 5, name: "Eka", role: "admin", age: 35 },
  { id: 6, name: "Fajar", role: "user", age: 20 },
  { id: 7, name: "Gina", role: "user", age: 24 },
  { id: 8, name: "Hadi", role: "moderator", age: 32 },
  { id: 9, name: "Indra", role: "admin", age: 40 },
  { id: 10, name: "Joko", role: "user", age: 27 },
  { id: 11, name: "Kiki", role: "moderator", age: 29 },
  { id: 12, name: "Lina", role: "user", age: 23 },
  { id: 13, name: "Maya", role: "admin", age: 33 },
  { id: 14, name: "Nina", role: "user", age: 21 },
  { id: 15, name: "Oscar", role: "user", age: 26 },
  { id: 16, name: "Putri", role: "moderator", age: 34 },
  { id: 17, name: "Qori", role: "admin", age: 31 },
  { id: 18, name: "Rudi", role: "user", age: 19 },
  { id: 19, name: "Sinta", role: "moderator", age: 27 },
  { id: 20, name: "Tono", role: "user", age: 22 },
];

// 1. Grouping berdasarkan role
const grouped = _.groupBy(users, "role");
console.log("Grouped by Role:", grouped);

// 2. Ambil hanya nama semua admin
const adminNames = _.map(grouped.admin, "name");
console.log("Admin Names:", adminNames);

// 3. Cari 5 user termuda
const youngest = _.take(_.sortBy(users, "age"), 5);
console.log("5 Youngest Users:", youngest);

// 4. Cari rata-rata umur tiap role
const avgByRole = _.mapValues(grouped, (group) => _.meanBy(group, "age"));
console.log("Average Age per Role:", avgByRole);

// 5. Ambil 3 user random
const randomUsers = _.sampleSize(users, 3);
console.log("Random Users:", randomUsers);

// 6. Buat paginasi (page 2, size 5)
const page = 2;
const size = 5;
const paginated = _.chunk(users, size)[page - 1];
console.log("Page 2 (size 5):", paginated);
