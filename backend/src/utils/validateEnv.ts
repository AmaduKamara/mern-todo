import { cleanEnv, port, str } from "envalid";
// import { port, str } from "envalid/dist/port/validators";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
});
