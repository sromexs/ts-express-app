import mongoose from "mongoose";
import Config from "../config/mainConfig";
import Profile from "../models/Profile";
import Simulator from "src/models/Simulator";
import Favorite from "src/models/Favorite";

class StarterClass {
async seed() {
  const profile = await Profile.create({
    capital: 0,
    divisa: "divisa",
    email: "email@gmail.com",
    name: "profile name",
    nickname: "nickname",
    prefered_cryptocurrency: "Bitcoin",
  });

  const profile_id = profile._id;

  await Simulator.create({
    profile_id,
    cryptocurrency: "Bitcoin",
    dateRecorded: Date.now(),
    euros: 12,
    price: 10,
    quantity: 100,
  });

  await Favorite.create({
    favorite3: "Third",
    name: "favorite name",
    profile_id,
    favorite1: "First",
    favorite2: "Second",
  });
}

  async connectMongodb() {
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect(Config.dbConfig);
      console.log("\x1b[33m%s\x1b[0m", "Connected to Database Successfully.");
    } catch {
      throw new Error("Failed To Connect Database.");
    }
  }
}

const Starter = new StarterClass();
export default Starter;
