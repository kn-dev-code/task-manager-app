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


export const loginService = async(body: LoginSchemaType) => {
  console.log("Login Service Layer Reached!");
  const {email, password} = body;
  const user = await UserModel.findOne({email}).select("+password");

  const isPasswordValid = user ? await user.comparePassword(password) : false;

  if (!user || !isPasswordValid) throw new UnauthorizedException("Invalid email or password");
  return user;
}