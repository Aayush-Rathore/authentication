import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too Many Requests!",
});

app.use(limiter);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "25kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "15kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

// import routes

import userRouter from "./routes/user.routes";
import profileRouter from "./routes/profile.routes";
import router from "./routes/swagger.routes";
import { verifyJwt } from "./middleware/verifyJwt.middleware";

// using users routes {SignIn, SignUp}

app.use("/api/v1/profile", verifyJwt, profileRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/docs", router);

export default app;
