import dotenv from "dotenv";

dotenv.config();

function required(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required config value: ${key}`);
  }
  return value;
}

export const config = {
  jwt: {
    secret: required("JWT_SECRET"),
    expiresIn: required("JWT_EXPIRES_IN"),
  },
  bcrypt: {
    saltRounds: Number(required("BCRYPT_SALT_ROUNDS")),
  },
  host: {
    port: Number(required("PORT", "8080")),
  },
};
