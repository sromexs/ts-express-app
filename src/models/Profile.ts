import { Schema, model, Types } from "mongoose";

export interface IProfile {
  name: string;
  nickname: string;
  email: string;
  capital: number;
  divisa: string;
  prefered_cryptocurrency: string;
}

export type ILeanProfile = IProfile & { _id: Types.ObjectId };

const schema = new Schema<IProfile>({
  name: { type: String, default: "" },
  nickname: { type: String, default: "" },
  email: { type: String, default: "" },
  capital: { type: Number, default: 0 },
  divisa: { type: String, default: "" },
  prefered_cryptocurrency: { type: String, default: "" },
});

const Profile = model<IProfile>("Profile", schema);
export default Profile;
