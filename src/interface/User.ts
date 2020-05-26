import { Document } from "mongoose";

/* A las propiedades que tiene un documento de mongoose le va añadir las definidas en la interface */
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}
