const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const taskRouter = require('./routes/taskRouter');
require('dotenv').config();


const PORT = process.env.PORT || 9090
const DB_URL = process.env.DB_URL

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("This is a home page!");
})

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(PORT, async () =>{
    try{
        await connectDB(DB_URL);
        console.log("Database connected successfully!");
        console.log(`Server is running at port no. ${PORT}`);
    }catch(err){
        console.log(err);
    }
})