const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose')
const router = require('./src/router/route')
const cors=require('cors')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://ShivaniAdimulam:6YVITVtB4JZQZ2Qb@cluster0.vhsq6.mongodb.net/usermanagement?authSource=admin&replicaSet=atlas-y52ak9-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true',{useNewUrlParser:true})
.then( () =>console.log("mongodb is contected..."))
.catch( err => console.log(err))

app.use('/', router)


app.listen(process.env.PORT || 4000, function() {
    console.log(" Express App Running on port " +  (process.env.PORT || 4000));
})