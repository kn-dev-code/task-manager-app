import UserModel, { UserDocument } from "../models/user-model";
import { NotFoundException, UnauthorizedException } from "../util/app-error";
import { LoginSchemaType, RegisterSchemaType } from "../validators/user-validators";


export const registerService = async(body: RegisterSchemaType) => {
const {email} = body;
const existingUser = await UserModel.findOne({email});
if (existingUser) throw new UnauthorizedException("Unauthorized");

const newUser = new UserModel({
  name: body.name,
  email: body.email,
  password: body.password,
});
await newUser.save();
return newUser;
}


export const loginService = async(body: LoginSchemaType) => {
  const {email, password} = body;
  const user = await UserModel.findOne({email}).select("+password");
  if (!user) throw new NotFoundException("Resource Not Found");

  const isPasswordValid = await user.comparePassword(password)
  return user;
}