import express from "express";
import bodyParser from "body-parser";

const createServer = () => {
    const app = express();
    app.use(bodyParser.json({
        limit: "100mb"
    }));

    app.post("/write-log", writeLog);

    return app;
}