const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// endpoint GET
app.get('/',(req,ress) => {
    ress.send('Hello, Express API')
})

// endpoint GET /users
app.get('/users',(req,res) => {
    const users = [
        {id:1, name:'Alice'},
        {id:2, name:'Bob'},
        {id:3, name:'Charlie'}
    ];
    res.json(users);
})

// endpoint POST /users
app.post('/users',(req,res) => {
    const newUser = req.body;
    res.json({message: 'User created', user: newUser});
})

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})