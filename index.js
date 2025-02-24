//Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');
const userRoute = require('./Routes/userRoute');

//Creating a Server
const app = express();

//Creating a port
const PORT = process.env.PORT || 5000

//Creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Ensure the database connection is established
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sync the database models
sequelize.sync()
    .then(() => {
        console.log('Database synchronized...');
    })
    .catch(err => {
        console.error('Error synchronizing the database:', err);
    });

app.get('/login',(req, res)=>{
    res.send("Welcome to the web page")
})

app.use('/user',userRoute); 

//Running on PORT
app.listen(PORT, ()=>{
    console.log(`Server Running on........................ PORT ${PORT}`)
})