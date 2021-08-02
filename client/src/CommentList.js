/* import React, { useState, useEffect } from "react";
import axios from "axios"; */
import React from "react";

// export const CommentList = ({ postId }) => { // FORMA ANTIGÜA
export const CommentList = ({ comments }) => {
  // Con la llegada del QueryService ya no es necesario que pida todos los comentarios por postID pues ya recibimos el arreglo
  /*   const [comments, setComments] = useState([]);

  const fetchComments = async (postIdToGet) => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postIdToGet}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments(postId);
  }, [postId]); */

  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    }
    if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    }
    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
