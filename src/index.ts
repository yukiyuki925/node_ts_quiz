import express, { Express, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import datasource from "./datasource";

const port = 8888;
const app: Express = express();
const httpServer = createServer(app);

require("dotenv").config();

// JSONミドルウェアの設定
app.use(express.json());
app.use(cors());

datasource
  .initialize()
  .then(async (connection) => {
    httpServer.listen(port, () =>
      console.log(`Server listening on port ${port}!`)
    );
  })
  .catch((error) => console.error(error));

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
