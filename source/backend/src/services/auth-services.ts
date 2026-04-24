import UserModel, { UserDocument } from "../models/user-model";
import { NotFoundException, BadRequestException, UnauthorizedException} from "../util/app-error";
import { LoginSchemaType, RegisterSchemaType } from "../validators/user-validators";


export const registerService = async(body: RegisterSchemaType) => {
console.log("Register Service Layer Reached!");
const {email} = body;
const existingUser = await UserModel.findOne({email});
if (existingUser) {throw new BadRequestException("This email is already registered.");}

const newUser = new UserModel({
  name: body.name,
  email: body.email,
  password: body.password,
});
await newUser.save();
return newUser;
}


export const loginService = async (body: any) => {
  console.log("Login Service Layer Reached!");
  
  console.log("CRITICAL SECURITY LOG: Attempting login for", body.email, "with password:", body.password);

  const user = await UserModel.findOne({ email: body.email }).select("+password");

  if (!user) {
    throw new UnauthorizedException("Invalid email or password");
  }

  return user;
};