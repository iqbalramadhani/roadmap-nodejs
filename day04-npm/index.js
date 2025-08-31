
const _ = require('lodash');

// contoh menghilangkan duplikat array
const numbers = [1,2,3,4,5,5,6,7,8,9,9,10];

const unique = _.uniq(numbers);

console.log("Original:",numbers);
console.log("Unique:",unique);

// contoh lain
const data = [
    {name: "Iqbal", age: 20},
    {name: "Budi", age: 25},
    {name: "Siti", age: 22},
    {name: "Ani", age: 30},
];

const groupByAge = _.groupBy(data, 'age');

console.log(groupByAge);

// contoh lain
const template = "Hallo, nama saya {{name}}. Saya berumur {{age}} tahun.";

const result = _.template(template)({name: "Iqbal", age: 20});

console.log(result);

// contoh lain
const arr = [1,2,3,4,5,6,7,8,9,10];
const chunked = _.chunk(arr, 3);
console.log(chunked);

// contoh lain
const random = _.random(1, 100);
console.log("Random:", random);

// contoh lain
const isEqual = _.isEqual({name: "Iqbal"}, {name: "Iqbal"});
console.log("Is Equal:", isEqual);

console.log("Capitalize:", _.capitalize("hello world"));

// masih banyak lagi fungsi dari lodash, silahkan cek dokumentasi resminya di https://lodash.com/docs/
