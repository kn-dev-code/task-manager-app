import mongoose, { Schema, Document } from "mongoose";
import { compareValue, hashValue } from "../util/bcrypt";


export interface UserDocument extends Document {
  name: string;
  email?: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  planType: "free" | "pro" | "premium";
  comparePassword(value: string): Promise<boolean>;
}


const userSchema = new Schema<UserDocument>(

  {
    name: {
      type: String, required: true,
    },
    email: {
      type: String, required: true, unique: true, trim: true, lowercase: true,
    },
    password: {
      type: String, required: true, lowercase: true,
    },
    planType: {
      type: String, enum: ["free", "pro", "premium"], default: "free",
    },
  }, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      if (ret) {
        delete (ret as any).password;
      }
      return ret;
    }
  }
}
);

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await hashValue(this.password);
  }
})

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password)
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;