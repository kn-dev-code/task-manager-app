import express, { Request, Response, NextFunction } from "express"
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { Env} from "./config/env-config";
import { asyncHandler } from "./middleware/async-handler";
import { HTTPSTATUS } from "./config/http-config";
import { errorHandler } from "./middleware/error-handler";
import connectDatabase from "./config/database-config";
import { logger } from "./config/winston-config";
import mainRouter from "./routes";
import cookieParser from "cookie-parser";
import passport from "passport";



const app = express();
const server = http.createServer(app);



app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(cors({
origin: Env?.FRONTEND_ORIGIN,
credentials: true,
methods: ["GET", "POST", "PUT", "DELETE"],
allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[INCOMING REQUEST] ${req.method} ${req.originalUrl}`);
  next();
});


app.get("/health", asyncHandler(async (req: Request, res: Response) => {
res.status(HTTPSTATUS.OK).json({
message: "Server is healthy",
status: "OK",
})
}))


app.use(passport.initialize());
app.use("/api", mainRouter);
app.use(errorHandler);

server.listen(Env?.PORT, async() => {
await connectDatabase();
logger.info(`Server running on port ${Env?.PORT} in ${Env?.NODE_ENV} mode`)
})