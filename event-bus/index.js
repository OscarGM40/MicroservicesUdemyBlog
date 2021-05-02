const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  //todo lo que venga por el body es el evento en si
  const event = req.body;

  events.push(event);

  //automáticamente lo mandamos a los servicios listeners
  // parece que hay que tratar los errores ya
  try {
    // axios.post("http://localhost:4000/events",event);
    axios.post("http://posts-clusterip-srv:4000/events", event);
  } catch (e) {
    console.log("Could not emit event to post service");
  }
  try {
    // axios.post("http://localhost:4001/events", event);
    axios.post("http://comments-srv:4001/events", event);
  } catch (e) {
    console.log("Could not emit event to comment service");
  }
  try {
    // axios.post("http://localhost:4002/events", event);
    axios.post("http://moderation-srv:4002/events", event);
  } catch (e) {
    console.log("Could not emit event to query service");
  }
  try {
    // axios.post("http://localhost:4003/events", event);
    axios.post("http://query-srv:4003/events", event);
  } catch (e) {
    console.log("Could not emit event to moderation service");
  }
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, (_) => console.log("event bus service listening on 4005"));
