import { GraphQLError } from "graphql";
import ERRORS from "../constants/errors";

export default function GetContextUser(context) {
  const user = context.user;
  const error = context.error;

  if (error || user === null) {
    throw new GraphQLError(ERRORS.UN_AUTHORIZED, {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }

  return user
}
