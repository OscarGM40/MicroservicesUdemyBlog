import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json())
app.use(cors());

const posts = {};
/* 
app.get('/posts',(req, res) =>{
   res.send(posts);
}) */

app.post('/posts/create',async(req, res) => {
   const id = randomBytes(4).toString('hex');
   const { title } = req.body;

   posts[id] ={
      id,title
   };
   //este es el momento ideal para mandar el evento al bus
   // await axios.post('http://localhost:4005/events',{ //<- válido para local,no para kubernetes
   await axios.post('http://event-bus-srv:4005/events',{
       type:"PostCreated",
       data:{
         id,
         title
       }
   })

   res.status(201).send(posts[id]);
   // res.status(201).send({});
})

app.post('/events',( req, res ) => {
   console.log('Received event',req.body.type)

   res.send({})
});

app.listen(4000,() => {
   console.log("version latest again");
   console.log("post service listening on 4000");
})