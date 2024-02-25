import { Router } from "express";
import { sign, decode } from "jsonwebtoken";
import { compare, genSalt, hash } from "bcrypt";
import redis, { LEADERBOARDREF } from "../db/connect";
import { USERREF } from "../db/connect";

const router = Router();

router.post("/login", async (req, res) => {
  const { userid, password } = req.body;
  const hashval = await redis.get(USERREF(userid));
  if (hashval == null) {
    res.status(401);
    return res.json({ message: "No Record Found" });
  }
  if (await compare(password, hashval)) {
    const token = sign({ userid }, process.env.secret || "", {
      expiresIn: "1h",
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.json({ token });
  } else {
    res.status(401);
    return res.json({ message: "Invalid credential" });
  }
});

router.post("/signup", async (req, res) => {
  const { userid, password } = req.body;
  const hashval = await redis.get(USERREF(userid));
  if (hashval != null) {
    res.status(401);
    return res.json({ message: "Select another username" });
  }
  await redis.set(USERREF(userid), await hash(password, 10));
  await redis.zadd(LEADERBOARDREF, 0, userid);
  const token = sign({ userid }, process.env.secret || "", {
    expiresIn: "1h",
  });
  res.setHeader("Authorization", `Bearer ${token}`);
  return res.json({ message: "User Created Successfully", token });
});

export default router;
