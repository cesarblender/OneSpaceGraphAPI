import UserModel from "../../models/user";
import { CreateJWT } from "../../utils/jwt";
import dayjs from "dayjs";
import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import bcrypt from "bcrypt";
import SessionModel from "../../models/session";

export default async function LoginController(root, args, context) {
  
    const user = await UserModel.findOne({ email: args.userData.email });

    if (!user) {
      throw new GraphQLError(ERRORS.INCORRECT_EMAIL);
    }

    const isCorrectPassword = await bcrypt.compare(
      args.userData.password,
      user.password
    );

    if (!isCorrectPassword) {
      throw new GraphQLError(ERRORS.INCORRECT_PASSWORD);
    }

    const token = CreateJWT({ _id: user._id }, process.env.JWT_SECRET, "30d");
    const expiration = dayjs().add(30, "days").toDate();

    const session = await SessionModel.create({
        user: user._id,
        token,
        expiration,
    });

    user.sessions.push(session);
    await user.save();

    return { token, expiration };
  
}
