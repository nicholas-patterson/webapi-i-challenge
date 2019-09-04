// implement your API here
const express = require("express");
const server = express();
const Db = require("./data/db");
const cors = require("cors");
server.use(express.json());
server.use(cors());

// Get Method

server.get("/api/users", (req, res) => {
  Db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

// Post Method

server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({ message: "Please provide name and bio for user" });
  } else {
    const userInformation = req.body;
    Db.insert(userInformation)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "There was a error saving user to the database" });
      });
  }
});

// Get Specific User

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Db.findById(id)
    .then(result => {
      console.log(result);
      if (!result) {
        res.status(404).json({
          message: "The user with the specified ID does not exist"
        });
      } else {
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

// Update a specific user

server.put("/api/users/:id", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({ message: "Please provide name and bio" });
  } else {
    const id = req.params.id;
    const body = req.body;
    Db.update(id, body)
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "The user information could not be modified" });
      });
  }
});

// Delete Method

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  Db.remove(id)
    .then(result => {
      if (result) {
        res.status(200).json({ message: "The user was successfully removed" });
      } else {
        res
          .status(404)
          .json({ message: "User with the specified ID was not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

const port = 5050;
server.listen(port, () => console.log(`Server Listening On Port: ${port}`));
