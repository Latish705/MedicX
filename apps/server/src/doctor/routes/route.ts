import { Router } from "express";

const startUpRouter = Router();

startUpRouter.get("/", (req, res) => {
  res.send("Hello Startup");
});

export default startUpRouter;
