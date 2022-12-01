import MESSAGES from "../../constants/messages";
import { CreateJWT } from "../../utils/jwt";
import { sendVerificationEmail } from "../../utils/sendVerificationEmail";
import validateRegisterData from "../../validators/validateRegisterData";

export default async function RegisterController(root, args, context) {
  try {
    const registerData = await validateRegisterData(args.userData);

    if (registerData.email === "test@test.com") {
      return { message: "Test ok!" };
    }

    const token = CreateJWT(registerData, process.env.JWT_REGISTER_SECRET, "1d");
    sendVerificationEmail(registerData.email, token);

    return { message: MESSAGES.REGISTERED_SUCCESSFULLY };
  } catch (err) {
    return { error: err.message };
  }
}
