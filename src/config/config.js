import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.SERVER_PORT,
  databaseUrl: process.env.MONGODB_URL,
  jwtSecret: process.env.JSONWEBTOKEN_SECRET,
};

const config = Object.freeze(_config);

export default config;