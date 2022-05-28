const express = require("express");

const cors = require('cors') 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config(); 
const port = process.env.PORT||5000
const app = express();  
const objectId = require('mongodb').ObjectId;


const uri = `mongodb+srv://${process.env.Drill_USER}:${process.env.Drill_PASS}@cluster0.iyeky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() { 
   try{ 
    await client.connect();  
    const toolsItem = client.db("Tools").collection('product');  
    const orderCollection = client.db("Orders").collection('order');  
    app.get('/item',async(req,res)=>{ 
      const query = {} ; 
      const cursor = toolsItem.find(query);  
      const items = await cursor.toArray() ; 
      res.send(items);
   })  
   //order collection 
   app.post('/order',async(req,res)=>{ 
       const order = req.body ;
       const result =  await orderCollection.insertOne(order)
      res.send(result);
   })   
   // get order collection 
   app.get('/orders',async(req,res)=>{ 
        const name = req.query.name
      const query = {name:name} ;  
      const booking = await orderCollection.find(query).toArray() ; 
     ; 
      res.send(booking);
   })



   // single Item api 
   app.get('/item/:id',async(req,res)=>{ 
    const id = req.params.id; 
   // const query = {_id:ObjectId(id)} ; 
   const query = {_id:ObjectId(id)} ;

    const item =  await toolsItem.findOne(query)
    res.send(item)
})
   // delet order from database 
     app.delete('/orders/:id',async(req,res)=>{ 
       const id = req.params.id ;
       const query = {_id: ObjectId(id)} ;
       const result = await orderCollection.deleteOne(query) ;
        res.send(result)

     })
   
   } 
   finally{ 

   }

}
run().catch(console.dir)

// middlewaqre
app.use(cors());
app.use(express.json());


app.get('/' ,(req,res)=>{
res.send('running server')
}) 
app.listen(port,()=>{ 
    console.log("listening to port ",port);
  })  