const express = require("express");

const cors = require('cors') 
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config(); 
const port = process.env.PORT||5000
const app = express();  
const objectId = require('mongodb').ObjectId;


const uri = `mongodb+srv://${process.env.DRILL_USER}:${process.env.DRILL_PASS}@cluster0.iyeky.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() { 
   try{ 
    await client.connect();  
    const toolsItem = client.db("Tools").collection('product');  
    const orderCollection = client.db("Orders").collection('order');  
    const profile = client.db("Profile").collection('information');  
    const review = client.db("Review").collection('collection');  
     
    app.get('/item',async(req,res)=>{ 
      const query = {} ; 
      const cursor = toolsItem.find(query);  
      const items = await cursor.toArray() ; 
      res.send(items);
   })   
   // review item 
   app.get('/review',async(req,res)=>{ 
      const query = {} ; 
      const reviewItems = review.find(query);  
      const getReview = await reviewItems.toArray() ; 
      res.send(getReview);
   }) 
     //add review 
     app.post('/review',async(req,res)=>{ 
      const newReview = req.body ;
      const result =  await review.insertOne(newReview)
     res.send(result);
  }) 

   //order collection 
   app.post('/order',async(req,res)=>{ 
       const order = req.body ;
       const result =  await orderCollection.insertOne(order)
      res.send(result);
   })    
  // profile information 
  app.post('/profile',async(req,res)=>{ 
   const information = req.body ; 
   console.log(information);
   const results =  await profile.insertOne(information)
  res.send(results);
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