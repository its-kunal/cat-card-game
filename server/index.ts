import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import authRouter from "./routes/auth";
import gameRouter from "./routes/game";
import leaderBoardRouter from "./routes/leaderboard2";

import dotenv from "dotenv";
import server, { app } from "./server";

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/game", gameRouter);
app.use("/leaderboard", leaderBoardRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

server.listen(3000, () => {
  console.log("Server Started");
});
