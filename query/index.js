import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
// acuerdate del parseador,o el nuevo o el viejo pero no entiende JSON por defecto
app.use(express.json());
app.use(cors());

const posts={};
// ASI SERÁ EL OBJETO posts
/* post === {
"fkdsfks":{
   id: "fkdsfks",
   title: "",
   comments: [ 
      {id:"df1":content:"contenido"},
      {id:"fs3":content:"contenido"},
      {id:"fs343":content:"contenido"},
   ],
} */

const handleEvent = ( type, data ) => {

   if(type === 'PostCreated')
   {//recuerda que en la data de un post vendrá un id y el title
      const { id, title} = data;
      posts[id] = 
      {
         id:id,
         title:title,
         comments:[]
      }
   }

   if(type === 'CommentCreated')
   {//en la data de un comment vienen 3(4 desde el moderation service) props diferentes
      const { id, content, postId, status } = data;
      const tmpPosts = posts[postId];
      tmpPosts?.comments.push({ id, content, status }) ;
   }

   if(type === 'CommentUpdated')
   {
      const { id, content, postId, status } = data;
      const tmpPosts = posts[postId];
      const tmpComment = tmpPosts.comments.find(comment => comment.id == id)
      tmpComment.status = status;
      // puede que también haya cambiado el contenido asi que lo actualizo por si acaso
      tmpComment.content = content;

   } 
}

 app.get('/posts',(req,res) => {
   res.send(posts);
 });

 app.post('/events',(req,res) => {
   // recuerda que cada evento tendrá las propiedades type y data
   const { type,data } = req.body;
   
   handleEvent(type, data);

   // console.log(posts);
   res.send({}) 
 });

 app.listen(4002, async _ => 
   {
      console.log('Query service listening on port 4002');
      // const res = await axios.get('http://localhost:4005/events')
      const res = await axios.get('http://event-bus-srv:4005/events')

      for(let event of res.data)
      {
         console.log("Processing event: ", event.type)
         handleEvent(event.type, event.data);
      }
   });
