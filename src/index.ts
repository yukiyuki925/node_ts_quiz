import express, { Express, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import datasource from "./datasource";
import authController from "./modules/auth/auth.controller";
import setCurrentUser from "./middleware/set-current-user";

const port = 8888;
const app: Express = express();
const httpServer = createServer(app);

require("dotenv").config();

// JSONミドルウェアの設定
app.use(express.json());
app.use(cors());
app.use(setCurrentUser);

// ルートの設定
app.use("/auth", authController);

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
