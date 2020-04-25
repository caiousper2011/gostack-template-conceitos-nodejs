const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

function injectReqRepositoryIndex(request, response, next){
  const repoIndex = repositories.findIndex(repo=>repo.id==request.params.id);
  if(!(repoIndex>=0)){
    return response.status(400).json({error: 'Repository does not exists'})
  }
  request.repoIndex = repoIndex;
  next();
}

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const repository = {id: uuid(), likes: 0, ...request.body};
  repositories.push(repository)
  return response.status(200).json(repository)
});

app.put("/repositories/:id", injectReqRepositoryIndex, (request, response) => {
  const {repoIndex} = request;
  const {title, url, techs} = request.body;
  const {id, likes} = repositories[repoIndex];
  let repository = {title, url, techs, id, likes};
  console.log({title, url, techs})
  repositories[repoIndex] = repository;
  return response.status(200).json(repositories)
});

app.delete("/repositories/:id", injectReqRepositoryIndex, (request, response) => {
  const {repoIndex} = request;
  repositories.splice(repoIndex,1);
  return response.status(200).send('')
});

app.post("/repositories/:id/like", injectReqRepositoryIndex, (request, response) => {
  const {repoIndex} = request;
  const repo = repositories[repoIndex];
  repositories[repoIndex].likes = ++repo.likes;
  return response.status(200).json(repo)
});

module.exports = app;
