const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose')
const router = require('./src/router/route')
const cors=require('cors')

app.use(cors());

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
.then( () =>console.log("mongodb is contected..."))
.catch( err => console.log(err))

app.use('/', router)


app.listen(process.env.PORT || 4000, function() {
    console.log(" Express App Running on port " +  (process.env.PORT || 4000));
})