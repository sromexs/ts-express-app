import { Schema, model, Types } from "mongoose";

export interface ISimulator {
  profile_id: Schema.Types.ObjectId | string;
  dateRecorded: Date;
  cryptocurrency: string;
  euros: number;
  price: number;
  quantity: number;
}

export type ILeanSimulator = ISimulator & { _id: Types.ObjectId };

const schema = new Schema<ISimulator>(
  {
    profile_id: { type: Schema.Types.ObjectId, required: true },
    dateRecorded: { type: Date, default: Date.now },
    cryptocurrency: { type: String, default: "" },
    euros: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Simulator = model<ISimulator>("Simulator", schema);
export default Simulator;
