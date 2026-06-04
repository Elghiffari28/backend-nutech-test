import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(UserRoute);

const startServer = async () => {
  await db.getConnection();
  console.log("DB Connected");

  app.listen(port, () => {
    console.log(`App berjalan di port ${port}`);
  });
};

startServer();
