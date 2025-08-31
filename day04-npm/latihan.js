const _ = require('lodash');

// Data user
const users = [
  { id: 1, name: "Ali", role: "admin", age: 30 },
  { id: 2, name: "Budi", role: "user", age: 22 },
  { id: 3, name: "Citra", role: "user", age: 25 },
  { id: 4, name: "Dewi", role: "moderator", age: 28 },
  { id: 5, name: "Eka", role: "admin", age: 35 },
];

// ambil semua nama dari data user
const names = _.map(users, 'name');
console.log("All Names:", names);

// group user berdasarkan role
const groupedByRole = _.groupBy(users, 'role');
console.log("Grouped by Role:", groupedByRole);

// cari user dengan umur di atas 25
const above25 = _.filter(users, user => user.age > 25);
console.log("Users above 25:", above25);

// urutkan user berdasarkan umur
const sortedByAge = _.sortBy(users, 'age');
console.log("Sorted by Age:", sortedByAge);

// cari user pertama dengan role 'admin'
const firtAdmin = _.find(users,{role:'admin'});
console.log("First Admin:", firtAdmin);

// hitung rata-rata umur user
const avgAge = _.meanBy(users,'age');
console.log("Average Age:", avgAge);

// cek apakah semua user berumur di atas 20
const allAbove20 = _.every(users, user => user.age > 20);
console.log("All users above 20:", allAbove20);

// ambil semua user yang berumur di atas 20
const olderThan20 = _.filter(users, (u) => u.age > 25);
console.log("All users older than 20:", olderThan20);

// cek apakah ada user dengan nama 'Citra'
const hasCitra = _.some(users, { name: 'Citra' });
console.log("Has Citra:", hasCitra);
