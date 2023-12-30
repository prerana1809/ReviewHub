const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app=express();
const port=8000;
app.use(bodyParser.json());
app.use(cors());

const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb://0.0.0.0:27017/reviewhub";
const client = new MongoClient(uri);
async function connectToDatabase() {
    try {
      // Connect to the MongoDB server
      await client.connect();
  
      console.log('Connected to the database.');
      // Do your database operations here...
  
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}
connectToDatabase()
// Create a new MongoClient

const database=client.db("reviewhub");
const reviews=database.collection("reviews");
const comments=database.collection("comments");

app.get('/reviews', async(req, res)=>{
    const type=req.query.type;
    const query={"type": type};
    const review_result=reviews.find(query);
    const result=[];
    await review_result.forEach((item)=>{
        result.push(item);
    });
    res.send({"reviews": result});
})


app.post('/reviews', async(req, res)=>{
    const doc={...req.body};
    const result=await reviews.insertOne(doc);
    res.send({
        status: "OK"
    })
})

app.get('/comments', async(req, res)=>{
    const type=req.query.type;
    const query={"type": type};
    const comments_result=comments.find(query);
    const result=[];
    await comments_result.forEach((item)=>{
        result.push(item);
    });
    res.send({"comments": result});
})

app.post('/comments', async(req, res)=>{
    const doc={...req.body};
    const result=await comments.insertOne(doc);
    res.send({
        status: "OK"
    })
})






app.listen(port, ()=>{
    console.log("app listening at port 8000");
})
