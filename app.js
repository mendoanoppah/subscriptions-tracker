import { PORT } from "./src/config/env.js";

import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";

import userRouter from "./src/routes/user-routes.js";
import authRouter from "./src/routes/auth-routes.js";
import subscriptionRouter from "./src/routes/subscription-routes.js";
import connectToDatabase from "./src/database/mongodb.js";
import errorMiddleware from "./src/middlewares/error-middleware.js";
import arcjetMiddleware from "./src/middlewares/arcjet-middleware.js";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.set("trust proxy: ", true); // curl -H "X-Forwarded-For: 203.0.113.42" http://localhost:5500/api/v1/users
app.use(arcjetMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server runnin on PORT http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
