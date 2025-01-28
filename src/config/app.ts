import express from "express";

import userRoute from "../module/user/router";
import authRoute from "../module/auth/router";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/auth", authRoute);

export default app;
