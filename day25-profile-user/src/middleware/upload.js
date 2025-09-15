const multer = require('multer');
const path = require('path');
const fs = require('fs');

// cek folder
const uploadDir = "uploads";
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// tentukan folder tujuan & nama file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});


// hanya izinkan gambar
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if(!allowedTypes.includes(file.mimetype)) {
        cb(new Error('Only image file is allowed!'), false);
    }else{
        cb(null, true);
    }
}

const upload = multer({ storage });

module.exports = upload;
