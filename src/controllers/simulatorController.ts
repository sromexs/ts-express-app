import { TRoute } from "../types/types";
import Simulator from "src/models/Simulator";

interface ICSBody {
  dateRecorded: Date;
  cryptocurrency: string;
  euros: number;
  price: number;
  quantity: number;
}

class SimulatorClass {
  getAllSimulators: TRoute = async (_req, res) => {
    try {
      const all = await Simulator.find().lean();
      res.status(200).json(all);
    } catch (err: any) {
      console.log(`getAllSimulators: ${err.message}`);
      res.status(500).json({ msg: err.message });
    }
  };

  getSimulatorByProfileId: TRoute = async (req, res) => {
    try {
      const { profile_id } = req.params;

      if (!profile_id) {
        throw new Error("Profile id is not provided!");
      }

      const array = await Simulator.find({ profile_id }).lean();

      res.status(200).json(array);
    } catch (err: any) {
      console.log(`getSimulatorsByProfileId: ${err.message}`);
      res.status(500).json({ msg: err.message });
    }
  };

  createSimulator: TRoute = async (req, res) => {
    try {
      const { profile_id } = req.params;

      if (!profile_id) {
        throw new Error("Profile id is not provided!");
      }

      const data = <ICSBody>req.body;

      const simulator = await Simulator.create({ profile_id, ...data });

      res.status(200).json({ ok: 1, simulator });
    } catch (err: any) {
      console.log(`createSimulator: ${err.message}`);
      res.status(500).json({ ok: 0, msg: err.message });
    }
  };
}

const SimulatorController = new SimulatorClass();
export default SimulatorController;
