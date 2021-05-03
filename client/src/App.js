import React from "react";
import PostCreate from "./PostCreate";
import { PostList } from "./PostList";


export const App = () => {
  return (
    <div className="container">
      <h1>Create Post Below</h1>
      <PostCreate />
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};
