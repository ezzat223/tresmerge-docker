// =================== redis =================== //
const redis = require("redis");
// for logging => built-in, no need to install
const os = require("os");

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "redis";

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on("error", (err) => console.log(`Redis Client Error: ${err}`));
redisClient.on("connect", () =>
  console.log("Redis Client Connected Successfully...")
);

(async () => {
  await redisClient.connect();
})();

// =================== Postgres =================== //
const { Client } = require("pg");

const client = new Client({
  user: "root",
  password: "example",
  host: "postgres",
  port: "5432",
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database...");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

// =================== laravel =================== //

// =================== express =================== //
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", async (req, res) => {
  // hostname => container id
  console.log(`Traffic from ${os.hostname}`);
  res.send(`<h1>Hello Tresmerge from DockerHub!</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
