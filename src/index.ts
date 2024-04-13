import express from "express";
import router from "./routes/router";
import cors from "cors";
import { AppDataSource } from "./config";

const app = express();
const port: number = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await AppDataSource.initialize(); // Initialize your DataSource
    console.log("db connected successfully !");
  } catch (error) {
    throw new Error("unable to connect to db");
  }

  app.use(express.static("public"));
  app.use(cors());

  app.use("/api", router);

  app.listen(port, () => {
    console.log("server started on port " + port);
  });
};

startServer();
