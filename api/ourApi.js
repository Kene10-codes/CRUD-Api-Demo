const express = require('express'); //imported express (core module)
const router = express.Router(); //imported the router method
const customer = require('../mycustomer'); //imported my DB file from thru myserver.js file
const { request } = require('http');
const { response, Router } = require('express');
const bodyParser = require('body-parser'); //imported body parser
const uuid = require('uuid'); //import uuid, this helps to generate auto id's



//will read all the content of the DB
router.get('/', (request, response) =>{ //use to read the conent of our DB
    response.json(customer); // converted the content of our DB to JSON
})

//read a specific item
router.get('/:id', (request, response) =>{ //use to read the ID item and set a callback function
    response.json(customer.filter(particularCustomer =>  //conerts DB into Json and filer. Also save filter in a variable particularCustomer
        particularCustomer.id === parseInt(request.params.id) //grab the id and store in the variable and then check to make syre its same with the DB, ParseInt is used to conver to numbers
    ));
})

//post data into the DB 
router.post('/', (request, response)=>{
    const newClient = { //created an object that stores data
       id: uuid.v4, // automatic id method
       name: request.body.name, 
       country: request.body.country
    }
    //call back function if user inputs a different value not specified above
    if(!newClient.name || !newClient.country) {  //if not the object specified do below
        return response.status(400).json(); //responds with a status 400
    }

    customer.push(newClient); //push the newClient to the database or array of objects
    response.json(customer) //conver the the database to JSON
})

//update database using PUT
router.put('/:id', (request, response) =>{
    const searchCustomer = customer.some(singleCustomer => //search for a single and break the search
        singleCustomer.id === parseInt(request.params.id)
    )

        if(searchCustomer) {
            const detailUpdated = request.body
            customer.forEach(singleCustomer => {
                if(singleCustomer.id === parseInt(request.params.id)) {
                    singleCustomer.name = detailUpdated.name ? detailUpdated.name : singleCustomer.name;
                    singleCustomer.country = detailUpdated.country ? detailUpdated.country : singleCustomer.country;

                    response.json({alert : 'Update done successfully', singleCustomer: singleCustomer});

                }
            })
        } return response.status(400).json({alert: 'not successful'}); //return if request was not succcessful
    })

module.exports = router; //export router in order to be accessed by any file. eg.server.js

