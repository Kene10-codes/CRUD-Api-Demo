const express = require('express'); // imported express
const customer = require('./mycustomer'); // imported customr DB
const ourRouterUrl = require('./api/ourApi'); // imported our router 
const bodyParser = require('body-parser'); //imported body parser
const app = express(); //initialised app 

app.use('/api/mycustomer', ourRouterUrl) 

app.use(express.json()) //initalised express to JSON
app.use(express.urlencoded({extended:false}))//body parser initaliser

app.listen(3100, ()=> { //set a port for output of the api request and a callback function
    console.log('server is running'); //output of a callback function
})

