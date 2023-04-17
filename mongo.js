const fs = require('fs')
const express = require('express')
const {MongoClient, ObjectID,} = require('mongodb')
const bodyparser = require('body-parser')
const objectId = require('mongodb').ObjectID
const connectToMongoDB = require('./chechDB')
const app = express()

const url = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

connectToMongoDB()
//express middleware
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());

app.get('/', (req, res)=>{
    res.send('hello from node 5')
})

app.get('/hotels',(req, response)=>{
  client.connect((dberror,dbresponse)=>{
    if(dberror){
        response.send({
            status:500,
            message:"db connection error"
        })
    }
        else{
            const db = dbresponse.db("test")
            db.collection('hotels').find().toArray((rerr, result)=>{
                if(rerr){
                    console.log(rerr)
                }
                else{
                    const name =[]
                    for(let i=0; i<result.length; i++){
                       name.push(result[i].name)
                    }
                    response.send(name)
                   
                }
            })
        }
   
  })
})

////add orders
app.post('/addOrders',(request,res)=>{
    client.connect((dberr, dbres)=>{
        if(dberr){
            res.send({
                status:500,
                message:'an in the mongodb'
            })
        }
        else{
            const db = dbres.db('test')
            db.collection("citId").insert(request.body,(err, result)=>{
             
                if(err){
                    console.log(err)
                }
                else{
                    res.send('data is inserted')
                }
            })

            
        }
    })
})

///update order
app.put('/updateOrder',(req, response)=>{
    client.connect((dberr, dbres)=>{
        if(dberr){
            response.send({
                status:500,
                meaasage:"error with 500"
            })
        }
        else{
             const db = dbres.db('test')
             db.collection('citId').updateOne({ "_id" : ObjectID(req.body._id)},{$set:{"name":req.body.name}},(req.body,(err, result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    response.send('details updated successfully')
                }
             }))   
        }
    })

})

///delete order

app.delete('/deleteOrder',(req,response)=>{
    client.connect((dberr,dbres)=>{
        if(dberr){
            response.send({
                status:500,
                message:'status 500 err'
            })
        }
        else{
            const db= dbres.db('test')
            db.collection('citId').remove({_id:objectId(req.body._id)},(req.body,(err, result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    response.send('removed successfully')
                }
            }))
        }
    })
})
app.listen(4000,()=>{
    console.log('in 4000')
})