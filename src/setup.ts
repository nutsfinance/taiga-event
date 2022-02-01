import { config } from "dotenv";

export function loadEnv() {
  if (process.env["NODE_ENV"] === "dev") {
    config();
  }
  process.env["PORT"] = process.env["PORT"] || "4000";
  process.env["CLIENT_ID"] =
    process.env["CLIENT_ID"] ||
    (() => {
      throw "CLIENT_ID not set";
    })();
  process.env["CLIENT_SECRET"] =
    process.env["CLIENT_SECRET"] ||
    (() => {
      throw "CLIENT_SECRET not set";
    })();
  process.env["CALLBACK_URL"] =
    process.env["CALLBACK_URL"] ||
    (() => {
      throw "CALLBACK_URL not set";
    })();
  process.env["DB_URI"] =
    process.env["DB_URI"] ||
    (() => {
      throw "DB_URI not set";
    })();
  process.env["SECRET"] =
    process.env["SECRET"] ||
    (() => {
      throw "SECRET not set";
    })();
}
