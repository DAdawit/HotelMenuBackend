import express, { Router } from "express";
import { createConnection } from "typeorm";
import router from "./routes/router";
import cors from "cors";

const app = express();
const port: number = 4000;
const startServer = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "hotelMenu",
      synchronize: true,
      entities: [__dirname + "/entities/*{.js,.ts}"],
    });
    console.log("db connected successfully !");
  } catch (error) {
    throw new Error("unable to connect to db");
  }

  app.use(express.static("public"));
  app.use(cors());

  app.use(express.json());
  app.use("/api", router);

  app.listen(port, () => {
    console.log("server started on port " + port);
  });
};

startServer();
