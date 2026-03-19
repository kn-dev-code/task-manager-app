import mongoose from "mongoose";
import { logger } from "./winston-config";
import { Env } from "./env-config";


const connectDatabase = async() => {
  try {
await mongoose.connect(Env?.MONGO_URI);
logger?.info("Database connected")
  } catch(e) {
    logger.error("Database failed: ", e);
    process.exit(1);
  }
}

export default connectDatabase;