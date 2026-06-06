import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import BannerRoute from "./routes/BannerRoute.js";
import ServiceRoute from "./routes/ServiceRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(AuthRoute);
app.use(UserRoute);
app.use(BannerRoute);
app.use(ServiceRoute);
app.use(TransactionRoute);

const startServer = async () => {
  await db.getConnection();
  console.log("DB Connected");

  app.listen(port, () => {
    console.log(`App berjalan di port ${port}`);
  });
};

startServer();
