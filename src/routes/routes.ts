import { Express } from "express";
import FavoriteController from "src/controllers/favoriteController";
import ProfileController from "src/controllers/profileController";
import SimulatorController from "src/controllers/simulatorController";

const Router = (app: Express) => {
  // Favorite Controller
  app.get("/api/favorite", FavoriteController.getAllFavorites);
  app.get("/api/favorite/:profile_id", FavoriteController.getOneFavorite);

  // Profile Controller
  app.get("/api/profile", ProfileController.getAllProfiles);
  app.post("/api/profile", ProfileController.getOneProfile);

  // Simulator Controller
  app.get("/api/simulator", SimulatorController.getAllSimulators);
  app.get("/api/simulator/:profile_id", SimulatorController.getSimulatorByProfileId);
  app.post("/api/simulator/:profile_id", SimulatorController.createSimulator);
};

export default Router;
