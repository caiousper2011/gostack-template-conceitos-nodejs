const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [
  {
    "id": "f43518d3-163e-4ee7-9aa6-0becf8ad6a16",
    "likes": 0,
    "title": "Desafio Node.js",
    "url": "http://github.com/...",
    "techs": [
      "Node.js"
    ]
  }
];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  response.json(request.body);
  repositories.push({id: uuid(), likes: 0, ...request.body})
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
