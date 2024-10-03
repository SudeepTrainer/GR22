import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/getusers", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Intenal server error");
  }
});

app.listen(5000);
