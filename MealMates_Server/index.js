const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()


//Middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h0dp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // const database = client.db("MealMatesDB");
    // const menu = database.collection("menu");
    
    const menuCollection = client.db("MealMatesDB").collection("menu");
    const userCollection = client.db("MealMatesDB").collection("users");
    const reviewCollection = client.db("MealMatesDB").collection("reviews");
    const cartsCollection = client.db("MealMatesDB").collection("carts");
    

    
    //users
    app.post('/users', async(req, res)=>{
      const user = req.body;
      //Insert email if user doesn't exist:
      //We can do this many ways like(email uniqu, upsert, simple checking)
      const query = {email: user.email}
      // console.log(query);
      const existingUser = await userCollection.findOne(query);
      if(existingUser){
        return res.send({message: 'User already exist', insertedId: null})
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    //get users data
    app.get('/users', async(req, res)=>{
      const result = await userCollection.find().toArray();
      res.send(result);
    })
    //delete users
    app.delete('/users', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })
    //Make Admin
    app.patch('/users/admin/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const updateDoc = {
        $set: {
          role: 'admin'
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);

    })

    //get menu collection all the data
    app.get('/menu', async(req, res)=>{
        const result = await menuCollection.find().toArray();
        res.send(result);
    })
    //get review collection all the data
    app.get('/reviews', async(req, res)=>{
        const result = await reviewCollection.find().toArray();
        res.send(result);
    })
    //get carts data
    app.get('/carts', async(req, res)=>{
      const email = req.query.email;
      const query = {email: email};
      const result = await cartsCollection.find(query).toArray();
      res.send(result);
    })
    //cart collection create or post
    app.post('/carts', async(req, res)=>{
      const cartItem = req.body;
      const result = await cartsCollection.insertOne(cartItem);
      res.send(result);

    })

    //delete item from cart
    app.delete('/carts/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await cartsCollection.deleteOne(query);
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Database Connect Successfully");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send("Hello World")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})