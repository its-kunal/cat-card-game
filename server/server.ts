import express from "express";
import http from "http";
import { Server } from "socket.io";
import fs from "fs";
export const app = express();
const server = http.createServer( app);
export const io = new Server(server);

export default server;
