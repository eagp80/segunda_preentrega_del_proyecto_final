import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,//es nativo process.env.NODE_ENV, profe trabaja con .local
});
//lo que se guarde en process.env 
const {
  API_VERSION,
  NODE_ENV,
  PORT,
  ORIGIN,
  DB_CNN,//string connection
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  CURSO,
} = process.env;

export {
  API_VERSION,
  NODE_ENV,
  PORT,
  ORIGIN,
  DB_CNN,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  CURSO,
};
