const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//console.log(process.env.STRIPE_SECRET_KEY)
const port = process.env.PORT || 5000


//Middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { default: Stripe } = require('stripe');
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
    //await client.connect(); this line comment out for deploy
    //await client.connect();
    // const database = client.db("MealMatesDB");
    // const menu = database.collection("menu");

    const menuCollection = client.db("MealMatesDB").collection("menu");
    const userCollection = client.db("MealMatesDB").collection("users");
    const reviewCollection = client.db("MealMatesDB").collection("reviews");
    const cartsCollection = client.db("MealMatesDB").collection("carts");
    const paymentsCollection = client.db("MealMatesDB").collection("payments");

    //JWT related api
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

      res.send({ token });//send token object
    })

    //Create Middlewares for token
    const verifyToken = (req, res, next) => {
      console.log('Inside verify token', req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Forbidden Access' })
      }
      //authorization have 2 part here one is barrier and next part is token
      const token = req.headers.authorization.split(' ')[1];
      //verify
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'Forbidden Access' })
        }
        req.decoded = decoded;
        next();
      });
    }

    //Middleware  user verify admin after verify token
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === 'admin';
      if (!isAdmin) {
        return res.status(403).send({ message: 'forbiden access' })
      }
      next();
    }
    //Stripe payment intent api
    app.post('/create-payment-intent', async(req, res)=>{
      const {price} = req.body;
      const amount = parseInt(price * 100);
      // console.log("Amoutn is",amount);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency:'usd',
        payment_method_types: ['card']
      });
      res.send({
        clientSecret: paymentIntent.client_secret
      })
    })
    //payment  api
    app.post('/payments', async(req, res)=>{
      const payment = req.body;
      console.log(payment)
      const paymentResult = await paymentsCollection.insertOne(payment);

      //carefully delete each item from the cart
      // console.log('payment info:', payment)
      //write query for delete multiple cart items
      const query ={_id: {
        $in: payment.cartIds.map(id => new ObjectId(id))
      }};
      const deleteResult = await cartsCollection.deleteMany(query)
      
      res.send({paymentResult, deleteResult});
    })
    //payment history api
    app.get('/payments/:email', verifyToken, async(req, res)=>{
      const query = {email: req.params.email};
      if(req.params.email !== req.decoded.email){
        return res.status(403).send({message: 'forbidden access'})
      }
      const result = await paymentsCollection.find(query).toArray();
      res.send(result);
    })
    //users post api (all post get putch everything is api)
    app.post('/users', async (req, res) => {

      const user = req.body;
      //Insert email if user doesn't exist:
      //We can do this many ways like(email uniqu, upsert, simple checking)
      const query = { email: user.email }
      // console.log(query);
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: 'User already exist', insertedId: null })
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    //get users data
    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {

      const result = await userCollection.find().toArray();
      res.send(result);
    })

    //check is user Admin? api
    app.get('/users/admin/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      console.log(req.params.email, req.decoded?.email)
      if (email !== req.decoded?.email) {
        return res.status(403).send({ message: 'unauthorized access' })
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === 'admin';
      }
      res.send({ admin })
    })
    // app.get('/users/admin/:email', verifyToken, async (req, res) => {
    //   try {
    //     const email = req.params.email;
    //     console.log('Route handler: req.params.email:', email);
    //     console.log('Decoded email:', req.decoded?.email);

    //     // Check for unauthorized access
    //     if (!email || email !== req.decoded?.email) {
    //       return res.status(403).send({ message: 'Unauthorized access' });
    //     }

    //     // Query user from the database
    //     const query = { email };
    //     const user = await userCollection.findOne(query);

    //     // Check if user is admin
    //     const admin = user?.role === 'admin';
    //     res.send({ admin });
    //   } catch (error) {
    //     console.error('Error in admin route:', error.message);
    //     res.status(500).send({ message: 'Internal server error' });
    //   }
    // });

    //delete users
    app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })
    //Make Admin
    app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: 'admin'
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result)
    })

    //get menu collection all the data
    app.get('/menu', async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    })
    //get menu specific data
    app.get('/menu/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await menuCollection.findOne(query);
      res.send(result);
    })
    //post menu data only user can able to add new item menu
    app.post('/menu', verifyToken, verifyAdmin, async (req, res) => {
      const item = req.body;
      const result = await menuCollection.insertOne(item);
      res.send(result);
    })
    //Update menu data api
    app.patch('/menu/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updateDoc = {
        $set: {
          name: item.name,
          recipe: item.recipe,
          category: item.category,
          price: item.price,

        }
      }
      const result = await menuCollection.updateOne(filter, updateDoc);
      res.send(result)

    })
    //delete specific collection 
    app.delete('/menu/:id', verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) }
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    })
    //get review collection all the data
    app.get('/reviews', async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    })
    //get carts data
    app.get('/carts', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartsCollection.find(query).toArray();
      res.send(result);
    })
    //cart collection create or post
    app.post('/carts', async (req, res) => {
      const cartItem = req.body;
      const result = await cartsCollection.insertOne(cartItem);
      res.send(result);

    })

    //delete item from cart
    app.delete('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await cartsCollection.deleteOne(query);
      res.send(result)
    })
  //admin stats or analytics
    app.get('/admin-stats', verifyToken, verifyAdmin, async(req, res)=>{
      const users = await userCollection.estimatedDocumentCount();
      const menuItems = await menuCollection.estimatedDocumentCount();
      //After complete the orders store data in payemnt section 
      const orders = await paymentsCollection.estimatedDocumentCount();

      //This is not the best way
      // const payemnts = await paymentsCollection.find().toArray();
      // const revenu = payemnts.reduce((total, item)=> total+ item.price, 0);

      const result = await paymentsCollection.aggregate([{
        $group:{
          _id: null,
          totalRevenue:{
            $sum: '$price'
          }
        }
      }]).toArray();
      
      const revenue = result.length > 0 ? result[0].totalRevenue : 0;

      res.send({
        users,
        menuItems,
        orders,
        revenue,
      })

    })
    //using aggregate pipeline
    app.get('/order-stats', verifyToken, verifyAdmin, async (req, res) => {
      const result = await paymentsCollection.aggregate([
        {
          $unwind: '$menuItemIds'
        },
        // Here menuItemsIds is not ObjectId that's why it's not it's give empty menuItems array after addin addFields it's gives currect value 
        {
          $addFields: {
            menuItemIds: { $toObjectId: '$menuItemIds' } // Cast to ObjectId
          }
        },
        {
          $lookup: {
            from: 'menu',
            localField: 'menuItemIds',
            foreignField: '_id',
            as: 'menuItems'
          }
        },
        {
          $unwind: '$menuItems'
        },
        {
          $group: {
            _id: '$menuItems.category',
            quantity: {$sum: 1},
            revenue: { $sum: '$menuItems.price'}
          }
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            quantity: '$quantity',
            revenue: '$revenue'
          }
        }
        
      ]).toArray();
    
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // COMMENT OUT FOR DEPLOY 
    // await client.db("admin").command({ ping: 1 });
    // console.log("Database Connect Successfully");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})