const express = require('express');
const mongoose = require('mongoose')
const app = express();
const contactRoutes = require('./routes/contact.route.js');
const errorHandler = require('./middleware/errorHandler.js');
const userRouter = require('./routes/userRoutes.js');


app.use(express.json());
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRouter);
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/test')
    .then(()=>{
        console.log("database is connected")
    app.listen(3004, () => {
        console.log("server is running on 3004")
    })})
    .catch(()=> {
        console.log("database not connected")
    });
