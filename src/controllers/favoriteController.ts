import Favorite from "src/models/Favorite";
import { TRoute } from "../types/types";

class FavoriteClass {
  getAllFavorites: TRoute = async (_req, res) => {
    try {
      const all = await Favorite.find().lean();
      res.status(200).json(all);
    } catch (err: any) {
      console.log(`getAllFavorites: ${err.message}`);
      res.status(500).json({ msg: err.message });
    }
  };

  getOneFavorite: TRoute = async (req, res) => {
    try {
      const { profile_id } = req.params;

      if (!profile_id) {
        throw new Error("Profile id is not provided!");
      }

      const array = await Favorite.find({ profile_id }).lean();

      res.status(200).json(array);
    } catch (err: any) {
      console.log(`getOneFavorite: ${err.message}`);
      res.status(500).json({ msg: err.message });
    }
  };
}

const FavoriteController = new FavoriteClass();
export default FavoriteController;
