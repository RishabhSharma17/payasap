const express = require("express");
const cors = require("cors");
const mainRouter = require('./Routes/index');
const port = 3000;
const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/v1',mainRouter);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});