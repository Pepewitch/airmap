const express = require("express");
const path = require("path");
const fs = require("fs");
const moment = require("moment-timezone");
const cors = require("cors");

const app = express();
moment.tz.setDefault("Asia/Bangkok");

app.use(cors());

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
const pad = (num, size) => {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

app.get("/image2d", async (req, res) => {
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
  const today = moment().startOf("day");
  const images = [];
  for (const date of dateList) {
    const isPass = data <= today;
    if (option.level === NOT_SPECIFIC_LEVEL) {
      if (isPass) {
        const location = path.join(
          "C:\\AppServ",
          "AIR_MODEL",
          "temp",
          date.format("YYYYMMDD00"),
          type,
          "median",
          "image2D"
        );
        const files = await new Promise(res => {
          fs.readdir(location, (err, files) => {
            if (err) return res([]);
            return res(files);
          });
        });
        for (const file of files) {
          images.push(
            [
              "AIR_MODEL",
              "temp",
              date.format("YYYYMMDD00"),
              type,
              "median",
              "image2D",
              file
            ].join("/")
          );
        }
      } else {
        const location = path.join(
          "C:\\AppServ",
          "AIR_MODEL",
          "temp",
          today.format("YYYYMMDD00"),
          type,
          "median",
          "image2D"
        );
        const files = await new Promise(res => {
          fs.readdir(location, (err, files) => {
            if (err) return res([]);
            return res(files);
          });
        });
        for (const file of files) {
          if (
            file.slice(10, 16) >= startDate.format("YYMMDD") &&
            file.slice(10, 16) <= endDate.format("YYMMDD")
          ) {
            images.push(
              [
                "AIR_MODEL",
                "temp",
                today.format("YYYYMMDD00"),
                type,
                "median",
                "image2D",
                file
              ].join("/")
            );
          }
        }
        break;
      }
    } else {
      if (isPass) {
        const location = path.join(
          "C:\\AppServ",
          "AIR_MODEL",
          "temp",
          date.format("YYYYMMDD00"),
          type,
          "image2D"
        );
        const files = await new Promise(res => {
          fs.readdir(location, (err, files) => {
            if (err) return res([]);
            return res(files);
          });
        });
        for (const file of files) {
          if (file.slice(4, 6) === pad(level, 2)) {
            images.push(
              [
                "AIR_MODEL",
                "temp",
                date.format("YYYYMMDD00"),
                type,
                "image2D",
                file
              ].join("/")
            );
          }
        }
      } else {
        const location = path.join(
          "C:\\AppServ",
          "AIR_MODEL",
          "temp",
          today.format("YYYYMMDD00"),
          type,
          "image2D"
        );
        const files = await new Promise(res => {
          fs.readdir(location, (err, files) => {
            if (err) return res([]);
            return res(files);
          });
        });
        for (const file of files) {
          if (
            file.slice(6, 12) >= startDate.format("YYMMDD") &&
            file.slice(6, 12) <= endDate.format("YYMMDD") &&
            file.slice(4, 6) === pad(level, 2)
          ) {
            images.push(
              [
                "AIR_MODEL",
                "temp",
                today.format("YYYYMMDD00"),
                type,
                "image2D",
                file
              ].join("/")
            );
          }
        }
        break;
      }
    }
  }

  return res.status(200).send({ images });
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
