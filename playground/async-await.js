function fethData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data berhasil diambil");
        }, 2000);
    });
}

async function main() {
    try {
        console.log("Ambil data...");
        const data = await fethData();
        console.log("Hasil : ",data);
    } catch (error) {
        console.error("Error: ", error);
    }
}

main();