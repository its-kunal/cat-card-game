import { Router } from "express";
import redis, { LEADERBOARDREF } from "../db/connect";

const router = Router();

router.get("/", async (req, res) => {
  let l = await redis.zrevrange(LEADERBOARDREF, 0, 20, "WITHSCORES");
  return res.json({ leaderboard: l });
});

export default router;
