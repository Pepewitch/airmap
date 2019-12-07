const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

app.get("/www/*", (req, res) => {
  const location = path.join("C:\\AppServ", ...req.path.split("/").slice(1));
  fs.readdir(location, (err, files) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send({ files });
    }
  });
});

app.get("*", (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.listen(3000);
