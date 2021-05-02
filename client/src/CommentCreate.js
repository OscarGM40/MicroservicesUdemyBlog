import React, { useState } from 'react';
import axios from 'axios';

export const CommentCreate = ({ postId }) => {
   const [content, setContent] = useState("");
   
   const handleSubmit = async (event) => {
   //   event.preventDefault();
      
      // await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
      await axios.post(`http://posts.com/posts/${postId}/comments`,{
         content
    });
    setContent("");
   };
   
   return (
      <div>
         <form className="" onSubmit={handleSubmit}>
            <div className="form-group">
               <label>New Comment</label>
               <input 
               type="text" 
               value={ content }
               onChange={ e => setContent( e.target.value ) }
               className="form-control"/>
            </div>
            <button className="btn btn-primary">Submit</button>   
         </form>
      </div>
   )
}

