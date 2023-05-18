import Profile from "src/models/Profile";
import { TRoute } from "../types/types";

interface IProfileBody {
  email: string;
  name: string;
  nickname: string;
}

class ProfileClass {
  getAllProfiles: TRoute = async (_req, res) => {
    try {
      const all = await Profile.find().lean();
      res.status(200).json(all);
    } catch (err: any) {
      console.log(`getAllProfiles: ${err.message}`);
      res.status(500).json({ msg: err.message });
    }
  };

  getOneProfile: TRoute = async (req, res) => {
    try {
      const { email, name, nickname } = <IProfileBody>req.body;

      if (!email && !name && !nickname) {
        throw new Error(
          "At least one of the fields (email, name, or nickname) must be provided"
        );
      }

      const searchCriteria = { $or: [] };
      if (email) searchCriteria.$or.push({ email });
      if (name) searchCriteria.$or.push({ name });
      if (nickname) searchCriteria.$or.push({ nickname });

      let profile = await Profile.findOne(searchCriteria).lean();

      if (!profile) {
        profile = await Profile.create({ name, email, nickname });
      }

      res.status(200).json(profile);
    } catch (err: any) {
      console.log(`getOneProfile: ${err.message}`);
      res.status(500).json({ msg: err.message });
    }
  };
}

const ProfileController = new ProfileClass();
export default ProfileController;
