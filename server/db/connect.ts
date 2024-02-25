import Redis from "ioredis";

const red = new Redis();

export default red;

export const USERREF = (userid: string) => {
  return `USERREF:${userid}`;
};

export const LEADERBOARDREF = "LEADERBOARDREF";

export const GAMEREF = (userid: string) => {
  return `GAMEREF:${userid}`;
};

export const DIFFUSERREF = (userid: string) => {
  return `GAMEREF:DIFFUSER:${userid}`;
};
