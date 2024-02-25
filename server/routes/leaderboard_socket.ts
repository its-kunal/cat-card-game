import { Router } from "express";
import { io } from "../server";
import red, { LEADERBOARDREF } from "../db/connect";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
const router = Router();

async function updateHandler(this: any) {
  const socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  > = this;
}
async function getLeaderboardHandler() {}
async function disconnectHandler() {}

// update leaderboard
io.on("connection", (socket) => {
  console.log("We;re live");
  // get update leaderboard
  socket.on("updateleaderboard", async (data) => {
    await red.zadd(LEADERBOARDREF, 1, data.userid);
    io.emit("getleaderboard");
  });
  // get leaderboard
  socket.on("getleaderboard", async (_) => {
    socket.send(await red.zrevrange(LEADERBOARDREF, 0, 20, "WITHSCORES"));
  });

  setInterval(() => {
    io.emit("getleaderboard");
  }, 2000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export default router;
