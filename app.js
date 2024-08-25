const express = require('express');
const multer = require('multer');
const path = require('path');
const fs=require('fs');
const app = express();
const port = 3002;
const uploadDir='upload/';
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,uploadDir);
    },
    filename: (req, file, cb) => {  
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage });


app.get('/', (req, res) => {
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="file"/><br>
            <button type="submit">Upload</button>
        </form>
    `);
});


app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running successfully at http://localhost:${port}`);
});
