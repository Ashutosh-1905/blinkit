import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import indexRouter from "./routes/indexRouter.js";

app.use("/", indexRouter);

app.get("/", (req, res) => {
    res.json({ messaage: "hello Ashu" });
});

export default app;