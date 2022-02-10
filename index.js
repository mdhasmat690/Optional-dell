const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const cors = require("cors");
require("dotenv").config(); //env er jonno

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.az9qi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log("connected", uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("testRecap");
    const productsCollection = database.collection("products");
    const servicesCollection = database.collection("services");

    //get product
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find({});
      const page = req.query.page; //
      const size = parseInt(req.query.size); //

      let products;
      const count = await cursor.count();
      if (page) {
        products = await cursor
          .skip(page * size)
          .limit(size)
          .toArray();
      } else {
        products = await cursor.toArray();
      }

      res.send({
        count,
        products,
      });
    });


     //get api
     app.get("/services", async (req, res) => {
      const product = servicesCollection.find({});
      const result = await product.toArray();
      res.send(result);
    });

    //Use post to get data dy keys
    app.post("/products/byKeys", async (req, res) => {
      const keys = req.body;
      console.log(keys)
      const query = { key: { $in: keys } };
      const products = await productsCollection.find(query).toArray();
      console.log(products)
      res.send(products);
    });
  } finally {
    // await client.connect();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Ema jon server is running");
});

app.listen(port, () => {
  console.log("Ema 347jhon server", port);
});
/* 

---------------------------------------------------------------module 65---------------------------------------------------
async function run() {
  try {
    await client.connect();
    const database = client.db("testRecap");
    const servicesCollection = database.collection("services");

    //get api
    app.get("/services", async (req, res) => {
      const product = servicesCollection.find({});
      const result = await product.toArray();
      res.send(result);
    });

    //get single service
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.findOne(query);
      res.send(result);
    });

    //post api
    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await servicesCollection.insertOne(service);
      console.log(result);
      res.send(result);
    });


     //delete api
     app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.json(result);
    });


  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running genius car server");
});

app.listen(port, () => {
  console.log("running car ser", port);
});

 */

/*

--------------------------module 64 -------------

const express = require("express");
const cors = require("cors");
const app = express();
const ObjectId = require("mongodb").ObjectId;

const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://testDb:7OHqsV7xC9DYJX3G@cluster0.az9qi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 */

/* 

--------------------------module 64 -------------

async function run() {
  try {
    await client.connect();
    const database = client.db("testRecap");
    const usersCollection = database.collection("users");

    //get api
    app.get("/users", async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });
    //get single api by id
    app.get("/users/:id", async(req,res)=>{
      const id = req.params.id
      const query = {_id: ObjectId(id)}
      const result = await usersCollection.findOne(query)
      res.send(result)
    })
    //post api
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    //update api
    app.put('/users/:id', async(req,res)=>{
      const id = req.params.id
      const updatedUser = req.body
      const filter = {_id: ObjectId(id)}
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email
        },
      };
      const result = await usersCollection.updateOne(filter,updateDoc,options)
      res.send(result)
    })

    //delete api
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      console.log(query);
      const result = await usersCollection.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


// সবার প্রথমে এইভাবে করা হইছে
client.connect(err => {
  const collection = client.db("testRecap").collection("users");

  const user = {name: 'mitu', email: 'mitu@gmail.com',phone: '01888888'}
  collection.insertOne(user)
  .then(()=>{
    console.log("isert success");
  })
  // client.close();
});

app.get("/", (req, res) => {
  res.send("running my crud server");
});
app.listen(port, () => {
  console.log("");
});

 */
