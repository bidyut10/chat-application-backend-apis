const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

//chatschema
const chatModel = require("../src/models/chatModel");

//websocket
const websocket = require("ws");
const server = new websocket.Server({ port: 8080 });

server.on("connection", (ws, req) => {
  //connect msg
  console.log("New User Connected");
  //welcome res
  ws.send("Welcome to chatapp");

  const token = req.headers["x-api-key"];
  // console.log(token)

  //auth check
  jwt.verify(token, "5^8LydB!mso^o!Yx", function (err) {
    if (err) {
      ws.terminate();
    } else {
      ws.on("message", (msg) => {
        try {
          const message = new chatModel(JSON.parse(msg));
          message.save().then(() => {
            // console.log(JSON.parse(msg));
            console.log(message);
          });
        } catch (error) {
          console.log(error.message);
        }
      });
    }
  });
});

mongoose
  .connect(
    "mongodb+srv://bidyut10:kabir34268@cluster0.rw6eu.mongodb.net/chatManagement?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
