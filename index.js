const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();
const port = 4000

const app = express()
app.use(cors())
app.use(bodyParser.json())




var MongoClient = require('mongodb').MongoClient;

var uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.lx93d.mongodb.net:27017,cluster0-shard-00-01.lx93d.mongodb.net:27017,cluster0-shard-00-02.lx93d.mongodb.net:27017/${process.env.DB_DATABASE}?ssl=true&replicaSet=atlas-8la97k-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, client) {
  const ServiceCollection = client.db(process.env.DB_DATABASE).collection("products")
  const eventsCollection = client.db(process.env.DB_DATABASE).collection("events");
  console.log('ServiceCollection successfully');
  // perform actions on the collection object
    app.post('/addProducts',(req, res) => {
        const products = req.body;
        ServiceCollection.insertMany(products)
        .then(result => {
            res.send(result.insertedCount)
        })
    })


    app.get('/products',(req, res) => {
        ServiceCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/products/:id', (req, res) => {
      organizationsCollection.find({id: req.params.id})
      .toArray((err, documents) => {
          res.send(documents[0]);
      })
    })

    app.post("/addEvents", (req, res) => {
        const events = req.body;
        eventsCollection.insertOne(events)
        .then(result => {
            res.status(200).send(result)
        })
    })

    app.get('/events', (req, res) => {
        const queryEmail = req.query.email;
        eventsCollection.find({email: queryEmail})
            .toArray((err, documents) => {
                res.send(documents);
        })
    })

    app.delete('/eventDelete/:id', (req, res) => {
        eventsCollection.deleteOne({id: req.params.id})
            .then(result => {
                res.send(result.deletedCount > 0);
        })
    })

    app.get('/allEvents', (req, res) => {
        eventsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
        })
    })

    app.post("/createEvents", (req, res) => {
        const events = req.body;
        organizationsCollection.insertOne(events)
            .then(result => {
                res.send(result.insertedCount)
            })
    })

    app.delete('/deleteUserEvent/:id', (req, res) => {
        eventsCollection.deleteOne({id: req.params.id})
            .then(result => {
                res.send(result.deletedCount > 0);
            })
    })

    
  });



  app.get('/', (req, res) => {
    res.send("Welcome! to our Volunteer Network Service Server")
  })



app.listen(process.env.PORT || port)