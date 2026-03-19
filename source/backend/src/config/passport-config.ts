import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Env } from "./env-config";
import { UnauthorizedException } from "../util/app-error";
import { findByIdUserService } from "../services/user-services";



passport.use(
  new JWTStrategy({
jwtFromRequest: ExtractJwt.fromExtractors([
  (req) => {
    const token = req.cookies.accessToken;
    if (!token) throw new UnauthorizedException("Unauthorized accesss");
    return token;
  },
]),
secretOrKey: Env.JWT_SECRET,
audience: ["user"],
algorithms: ["HS256"],
  },
  async({userId}, done) => {
    try {
        const user = userId && (await findByIdUserService(userId));
        return done(null, user || false);
      } catch (error) {
        return done(null, false);
      }
    }
  )
);

export const passportAuthenticateJwt = passport.authenticate("jwt", {
  session: false,
});