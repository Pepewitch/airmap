const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const moment = require("moment-timezone");

moment.tz.setDefault("Asia/Bangkok");

const TYPE = {
  "1H1GALL": "1H1GALL",
  "24H1GALL": "24H1GALL",
  PE00GALL: "PE00GALL"
};

const NOT_SPECIFIC_LEVEL = "ไม่ระบุ Level";

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

const getDateList = (startDate, endDate) => {
  const iter = startDate.clone();
  const dateList = [];
  while (!(iter > endDate)) {
    dateList.push(iter.clone());
    iter.add(1, "day");
  }
  return dateList;
};

app.get("/show", (req, res) => {
  const { query } = req;
  const startDate = (query.startDate
    ? moment(query.startDate)
    : moment()
  ).startOf("day");
  const endDate = (query.endDate ? moment(query.endDate) : moment()).startOf(
    "day"
  );
  const level = query.level;
  if (endDate.valueOf() < startDate.valueOf()) {
    return res
      .status(400)
      .send({ message: "endDate have to be larger than startDate" });
  }
  const dateList = getDateList(startDate, endDate);

  if (option.level === NOT_SPECIFIC_LEVEL) {
  }
});

app.get("/ping", (req, res) => {
  return res.status(200).send({ message: "pong" });
});

app.get("*", (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.listen(3000, () => {
  console.log(`Listen at PORT 3000`);
});
