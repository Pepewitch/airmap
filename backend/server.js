const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

app.get("*", function(req, res) {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.listen(3000);
