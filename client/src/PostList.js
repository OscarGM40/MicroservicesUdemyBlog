import React, { useEffect, useState } from "react";
import axios from "axios";
import { CommentCreate } from "./CommentCreate";
import { CommentList } from "./CommentList";

export const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async (_) => {
    // const res = await axios.get("http://localhost:4002/posts");
    const res = await axios.get("http://posts.com/posts");
    // console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
 /*     const id = setInterval(fetchPosts,1000)
        return () => {clearInterval(id)} */
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          {/* <CommentList postId={ post.id } />    */}
          {/* Con la creación del Query Service dejemos que sea el propio componente el que reciba el array de comentarios en vez del postID y opere como necesite */}
          <CommentList comments={ post.comments } />   
          <CommentCreate postId={ post.id } /> 
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
