function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data berhasil diambil");
        });
    });
}

console.log("Ambil data...");
getData()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Error: ", error);
    });