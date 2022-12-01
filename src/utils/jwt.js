import jwt from "jsonwebtoken";

export function CreateJWT(payload, secret, expiration) {
  return jwt.sign(payload, secret, { expiresIn: expiration });
}

export function DecodeJWT(token, secret) {
  return jwt.verify(token, secret);
}
