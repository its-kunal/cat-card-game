import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const red = new Redis({
  password: String(process.env.dbpassword),
  username: String(process.env.dbusername),
  host: String(process.env.host),
  port: Number(process.env.dbport),
  connectionName: String(process.env.connectionName),
});

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
