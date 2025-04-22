// Create web server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Endpoint to get comments
app.get("/comments", (req, res) => {
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading comments");
    }
    res.send(JSON.parse(data));
  });
});

// Endpoint to add a comment
app.post("/comments", (req, res) => {
  const newComment = req.body;

  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading comments");
    }

    const comments = JSON.parse(data);
    comments.push(newComment);

    fs.writeFile("comments.json", JSON.stringify(comments), "utf8", (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error saving comment");
      }
      res.status(201).send(newComment);
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
