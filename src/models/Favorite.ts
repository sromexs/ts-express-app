import { Schema, model, Types } from "mongoose";

export interface IFavorite {
  profile_id: Schema.Types.ObjectId | string;
  name: string;
  favorite1: string;
  favorite2: string;
  favorite3: string;
}

export type ILeanFavorite = IFavorite & { _id: Types.ObjectId };

const schema = new Schema<IFavorite>(
  {
    profile_id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    favorite1: { type: String, default: "" },
    favorite2: { type: String, default: "" },
    favorite3: { type: String, default: "" },
  },
  { timestamps: true }
);

const Favorite = model<IFavorite>("Favorite", schema);
export default Favorite;
