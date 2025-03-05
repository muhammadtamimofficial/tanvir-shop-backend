const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
//Require dotenv
require('dotenv').config()

// middleware
app.use(cors());
app.use(express.json());

const uri = process.env.URI + "&ssl=true";

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

        const productCollection = client.db("main").collection("product");

        // Add a New product
        app.post('/product', async (req, res) => {
            const Newproduct = req.body;
            console.log("New product", Newproduct);
            const result = await productCollection.insertOne(Newproduct)
            res.send(result)

        })

        app.get("/product", async (req, res) => {
            const result = await productCollection.find().toArray();
            res.send(result);
        })

        app.get('/product/:id', async (req, res) => {
            const id = await req.params.id;
            const product_id = { _id: new ObjectId(id) };
            const productInfo = await productCollection.findOne(product_id)
            console.log(id);


            if (!productInfo) {
                return res.status(404).json({ error: "User not found" }); // Return 404 if no user is found
            }
            return res.json(productInfo)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('PORT 3000 Server is running..')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})












// const express = require('express');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const app = express();
// const cors = require('cors');
// const port = process.env.PORT || 5000;
// //Require dotenv
// require('dotenv').config()

// // middleware
// app.use(cors());
// app.use(express.json());

// const uri = process.env.URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();

//         const clientsCollection = client.db("clients_management").collection("clients");

//         // Add a New Clinet
//         app.post('/clients', async (req, res) => {
//             const NewClient = req.body;
//             console.log("New User", NewClient);
//             const result = await clientsCollection.insertOne(NewClient)
//             res.send(result)

//         })

//         app.get("/clients", async (req, res) => {
//             const result = await clientsCollection.find().toArray();
//             res.send(result);
//         })

//         app.get('/clients/:id', async (req, res) => {
//             const id = await req.params.id;
//             const client_id = { _id: new ObjectId(id) };
//             const clientInfo = await clientsCollection.findOne(client_id)
//             // console.log(id);


//             if (!clientInfo) {
//                 return res.status(404).json({ error: "User not found" }); // Return 404 if no user is found
//             }
//             return res.json(clientInfo)
//         })

//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // await client.close();
//     }
// }
// run().catch(console.dir);



// app.get('/', (req, res) => {
//     res.send('PORT 3000 Server is running..')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })