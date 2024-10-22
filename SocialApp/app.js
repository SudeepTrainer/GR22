import express from "express";

import router from "./routes/userRoutes.js";
const PORT = 4000;

const app = express();
app.use(express.json());

// routes
app.use("/user", router);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
