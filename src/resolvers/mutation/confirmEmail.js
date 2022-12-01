import UserModel from "../../models/user";
import { CreateJWT, DecodeJWT } from "../../utils/jwt";
import dayjs from "dayjs";
import { GraphQLError } from "graphql";
import ERRORS from "../../constants/errors";
import SessionModel from "../../models/session";

export default async function ConfirmEmailController(root, args, context) {
  try {
    const decoded = DecodeJWT(args.token, process.env.JWT_REGISTER_SECRET);

    if (!!(await UserModel.findOne({ email: decoded.email })))
      throw new GraphQLError(ERRORS.EMAIL_IN_USE);
    if (!!(await UserModel.findOne({ userName: decoded.userName })))
      throw new GraphQLError(ERRORS.USER_NAME_IN_USE);

    const newUser = new UserModel();
    newUser.firstName = decoded.firstName;
    newUser.lastName = decoded.lastName;
    newUser.userName = decoded.userName;
    newUser.email = decoded.email;
    newUser.password = decoded.password;
    newUser.birthday = decoded.birthday;
    newUser.gender = decoded.gender;

    const user = await newUser.save();

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
  } catch (err) {
    return { error: err.message };
  }
}
