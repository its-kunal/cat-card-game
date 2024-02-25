import { Router } from "express";
import redis, { DIFFUSERREF, GAMEREF, LEADERBOARDREF } from "../db/connect";
import { jwtResolver } from "../middleware/jwt";
const router = Router();

router.use(jwtResolver);

enum Cards {
  CAT = "CAT",
  DEFUSE = "DEFUSE",
  SHUFFLE = "SHUFFLE",
  EXPLODE = "EXPLODE",
}

const cards = Object.values(Cards);

// generate deck
function generateDeck(numCards: number): Cards[] {
  let genereatedDeck = [];
  for (let i = 0; i < numCards; i++) {
    genereatedDeck.push(cards[Math.round(Math.random() * 10) % 4]);
  }
  return genereatedDeck;
}

// start game
router.get("/start", async (req, res) => {
  const { userid } = req.query;
  if (userid == null)
    return res.status(401).json({ message: "Please provide userid" });
  let gameExist = await redis.exists(GAMEREF(String(req.query.userid)));
  if (gameExist) {
    let cardLen = await redis.llen(GAMEREF(String(userid)));
    return res.json({ message: "Game Successfully created", cardLen });
  }
  let cards = generateDeck(5);
  await redis.lpush(GAMEREF(String(userid)), ...cards);
  return res.json({ message: "Game Successfully created", cardLen: 5 });
});
// reset game
router.get("/reset", async (req, res) => {
  const { userid } = req.query;
  if (userid == null)
    return res.status(401).json({ message: "Please provide userid" });
  let cards = generateDeck(5);
  let gameExist = await redis.exists(GAMEREF(String(req.query.userid)));
  if (gameExist) {
    await redis.del(GAMEREF(String(userid)));
    await redis.del(DIFFUSERREF(String(userid)));
  }
  await redis.lpush(GAMEREF(String(userid)), ...cards);
  return res.json({ message: "Game Successfully Created", cardLen: 5 });
});
// end game
router.get("/end", async (req, res) => {
  const { userid } = req.query;
  if (userid == null)
    return res.status(401).json({ message: "Please Provide User id" });
  //   while (redis.exists(GAMEREF(String(userid)))) {
  //     await redis.lpop(GAMEREF(String(userid)));
  //   }
  await redis.del(GAMEREF(String(userid)));
  await redis.del(DIFFUSERREF(String(userid)));
  return res.json({ message: "Game Ended Successfully" });
});

// process game
// pop card
router.get("/pop", async (req, res) => {
  const { userid } = req.query;
  const user = GAMEREF(String(userid));
  const userdiff = DIFFUSERREF(String(userid));
  if (userid == null)
    return res.status(401).json({ message: "Please Provide User id" });
  if ((await redis.exists(user)) == 0)
    return res
      .status(401)
      .json({ message: "No Game Exist for given user, please reset" });
  let card = await redis.lpop(user);
  let cardLen = await redis.llen(user);
  if (cardLen == 0 && (card == Cards.DEFUSE || card == Cards.CAT)) {
    await redis.del(user);
    await redis.del(userdiff);
    await redis.zincrby(LEADERBOARDREF, 1, String(userid));
    return res.json({ message: "You Win", cardLen: 0, card });
  }
  if (card == Cards.EXPLODE) {
    if ((await redis.exists(userdiff)) == 0) {
      await redis.del(user);
      await redis.del(userdiff);
      return res.json({ message: "Sorry you lose", card, cardLen: 0 });
    } else {
      await redis.decrby(userdiff, 1);
      if (cardLen == 0) {
        await redis.del(user);
        await redis.del(userdiff);
        await redis.zincrby(LEADERBOARDREF, 1, String(userid));
        return res.json({ message: "You win", cardLen: 0, card });
      }
      return res.json({ message: "Continue Playing", card, cardLen });
    }
  } else if (card == Cards.DEFUSE) {
    if (await redis.exists(userdiff)) await redis.incrby(userdiff, 1);
    else await redis.set(userdiff, 1);
  } else if (card == Cards.SHUFFLE) {
    await redis.del(user);
    let cards = generateDeck(5);
    await redis.lpush(user, ...cards);
    return res.json({ message: "", card, cardLen: 5 });
  }
  return res.json({ message: "Continue Playing", card, cardLen });
});

export default router;
