const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app=express();
const port=8000;
app.use(bodyParser.json());
app.use(cors());

const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb://localhost:27017";
// Create a new MongoClient
const client = new MongoClient(uri);
const database=client.db("reviewhub");
const reviews=database.collection("reviews");

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






app.listen(port, ()=>{
    console.log("app listening at port 8000");
})