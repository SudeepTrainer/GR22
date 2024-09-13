import pg from "pg";
const { Client } = pg;
const client = new Client({
  user: "sudeep",
  password: "12345",
  host: "localhost",
  port: 5432,
  database: "gr22",
});
client
  .connect()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("Failed to connect");
    console.error(err);
  });
export default client;
