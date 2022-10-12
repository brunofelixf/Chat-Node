const express = require("express");
const logger = require("morgan");
const path = require("path");

const app = express();

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const database = {
  messages: [],
  addMessage({ author, message, time }) {
    this.messages.push({
      author,
      message,
      time
    });
  }
};

app.use("/", express.static(__dirname + "/public"));

app.get("/mensagem", (req, res) => {
  res.json({
    messages: database.messages
  });
});

app.post("/mensagem", (req, res) => {
  database.addMessage({
    author: req.body.author,
    message: req.body.message,
    time: req.body.time
  });
  console.log(database.messages);
});

const listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
