import App from "./app";
import dotenv from "dotenv";
import { connectMongo } from "@/database/mongo";

dotenv.config();
connectMongo();

export const app = new App(8000);
