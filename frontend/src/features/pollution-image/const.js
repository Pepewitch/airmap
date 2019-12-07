export const TYPE = {
  "1H1GALL": "1H1GALL",
  "24H1GALL": "24H1GALL",
  PE00GALL: "PE00GALL"
};

export const NOT_SPECIFIC_LEVEL = "ไม่ระบุ Level";

export const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "http://34.87.95.181:3000"
    : "http://localhost:4000";
