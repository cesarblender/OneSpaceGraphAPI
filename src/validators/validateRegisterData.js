import { EMAIL_REGEX, NAME_REGEX, USER_NAME_REGEX } from "../constants/regex";
import dayjs from "dayjs";
import spanishbadwords from "../censorDatasets/spanish-words.js";
import { GraphQLError } from "graphql";
import capitalize from "../utils/capitalizeString";
import bcrypt from "bcrypt";
import ERRORS from "../constants/errors";
import Filter from "bad-words";
import UserModel from "../models/user";

const filter = new Filter();

export default async function validateRegisterData(args) {
  let registerData = args;

  if (!registerData) throw new GraphQLError("No data");

  registerData.firstName = capitalize(registerData.firstName.trim());
  registerData.lastName = capitalize(registerData.lastName.trim());
  registerData.userName = registerData.userName.trim();
  registerData.email = registerData.email.trim();

  const birthday = dayjs(registerData.birthday);

  if (!birthday.isValid()) throw new GraphQLError(ERRORS.INVALID_BIRTHDAY);

  if (dayjs().diff(birthday, "years") < 13)
    throw new GraphQLError(ERRORS.TOO_YOUNG);
  if (dayjs().diff(birthday, "years") > 130)
    throw new GraphQLError(ERRORS.TOO_OLD);

  if (!NAME_REGEX.test(registerData.firstName))
    throw new GraphQLError(ERRORS.INVALID_FIRST_NAME);
  if (!NAME_REGEX.test(registerData.lastName))
    throw new GraphQLError(ERRORS.INVALID_LAST_NAME);
  if (!USER_NAME_REGEX.test(registerData.userName))
    throw new GraphQLError(ERRORS.INVALID_USER_NAME);
  if (!EMAIL_REGEX.test(registerData.email))
    throw new GraphQLError(ERRORS.INVALID_EMAIL);

  if (registerData.password.length < 8)
    throw new GraphQLError(ERRORS.SHORT_PASSWORD);
  if (registerData.password.length > 100)
    throw new GraphQLError(ERRORS.LONG_PASSWORD);

  const salt = await bcrypt.genSalt(10);
  registerData.password = await bcrypt.hash(registerData.password, salt);

  // Check if the name of the user contains offensive words
  filter.addWords(...spanishbadwords);

  if (filter.isProfane(registerData.firstName))
    throw new GraphQLError(ERRORS.FIRST_NAME_CONTAINS_OFFENSIVE_WORDS);
  if (filter.isProfane(registerData.lastName))
    throw new GraphQLError(ERRORS.LAST_NAME_CONTAINS_OFFENSIVE_WORDS);

  registerData.birthday = birthday.toDate();

  if (!!(await UserModel.findOne({ email: registerData.email })))
    throw new GraphQLError(ERRORS.EMAIL_IN_USE);
  if (!!(await UserModel.findOne({ userName: registerData.userName })))
    throw new GraphQLError(ERRORS.USER_NAME_IN_USE);

  return registerData;
}
