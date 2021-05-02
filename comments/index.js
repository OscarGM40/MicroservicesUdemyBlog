const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use(cors());

//el objeto va a ser diferente,por cada key va a tener un array de comentarios:
/*
{
   'k43':[{id:1,comment:"fdf"},{id:2,comment:"xxf"}]
   'cdc':[{id:4,comment:"fdxf"},{id:5,comment:"xxx"}]
}
*/
const commentsByPostID = {}

app.get('/posts/:id/comments',(req,res)=>{
    
    res.send(commentsByPostID[req.params.id] || []);


})

app.post('/posts/:id/comments',async (req,res) => {
 const commentId = randomBytes(4).toString('hex');
 const { content } = req.body;

 //pido la lista de comentarios o bien la creo si no existe aún
 const comments = commentsByPostID[req.params.id] || [] ; //dará o un array o undefined
   
 comments.push({
      id:commentId,
      content,
      status:'pending'
   })

 commentsByPostID[req.params.id] = comments;  

//  await axios.post('http://localhost:4005/events',{
 await axios.post('http://event-bus-srv:4005/events',{
    type: 'CommentCreated',
    data:{
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
 })

 res.status(201).send(comments);
//  res.status(201).send({});

})


app.post('/events',async ( req, res ) => {
   
   const { type, data } = req.body;
   
   if (type === "CommentModerated") {
      const { postId, id, status, content } = data;
      const comments = commentsByPostID[postId];
      //el método find para en cuanto encuentre la primera coincidencia,con lo que es más eficiente que filter,que va a recorrer todo el arreglo 
      const comment = comments.find(comment => comment.id === id)
      // const comment = comments.filter(comment => comment.id === id)[0] <- se puede decir que me devuelva el primero únicamente con [0], ojo que con find da error pasasrle un indice
      comment.status = status;
      //falta mandar el evento commentUpdated para el query service

      // await axios.post("http://localhost:4005/events", {
      await axios.post("http://event-bus-srv:4005/events", {
         type: "CommentUpdated",
         data: {
           id: id,
           postId: postId,
           status: status,
           content: content,
         },
       });

  }
   
   
   console.log('Received event',type)
   res.send({})
});

app.listen(4001,_ => console.log('comments service listening on port 4001'))