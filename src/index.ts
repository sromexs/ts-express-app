import express from "express";
import Config from "./config/mainConfig";
import Router from "./routes/routes";
import Starter from "./scripts/Starter";
import cors from "cors";

(async () => {
  const app = express();
  app.use(cors({ origin: Config.allowedOrigins }));
  await Starter.connectMongodb();
  Router(app);

  app.all("*", (_req, res) => res.status(404).json({ status: 404 }));
  app.listen(Config.port, () => {
    console.log(`> Ready on http://localhost:${Config.port}`);
  });
})();
