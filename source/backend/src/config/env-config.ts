import 'dotenv/config';
import {z} from "zod";
import { logger } from "./winston-config";

export const envSchema = z.object({
  NODE_ENV: (z.enum(["development", "test", "production"]).default("development")),
  PORT: z.coerce.number().min(4),
  MONGO_URI: z.string().url({message: "MONGO_URI must be a valid connection string"}),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("15m"),
  FRONTEND_ORIGIN: z.string().url().default('http://localhost:5173'),
  SESSION_SECRET: z.string().min(10),
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  logger.error("Failed to connect env");
  process.exit(1);
}

export const Env = _env.data;