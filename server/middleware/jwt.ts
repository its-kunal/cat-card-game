import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export async function jwtResolver(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization?.split(" ")[1];
  if (token == undefined)
    return res.status(404).json({ message: "Unauthorized Access" });
  let userid;
  try {
    let decoded = verify(token, String(process.env.secret));
    userid = String(Object(decoded).userid);
  } catch (err) {
    return res.status(404).json({ message: "Invalid Token" });
  }
  req.query["userid"] = userid;
  next();
}
