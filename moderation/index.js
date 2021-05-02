import axios from "axios";
import express from "express";

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    //parece que string.contains salió sólo para Firefox
    //olvidate de contains ,usa includes bajo las mismas reglas
    // const status = data.content.includes("orange") ? "rejected" : "approved";
    // si quiero mayusculas puedo usar una regexp de javascript
    const status = (/orange/gi).test(data.content) ? 'rejected' : 'approved';

    // await axios.post("http://localhost:4005/events", {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status: status,
        content: data.content,
      },
    });
  }

  res.send({})
});

app.listen(4003, _ => console.log(`Moderation service listening on 4003`));
