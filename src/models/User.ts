import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";

import { IUser } from "../interface/User";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/* Antes De Que Entre El Objeto A La Base De Datos Ciframos La Contraseña */
userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
};

/* Antes De Que Entre El Objeto A La Base De Datos Comparamos La Contraseña */
/* Usamos un funcion de es5 por que me da referencia al esquema del usuario
encambio un arrow function no es valido con la palabra this, entonces
no se sabria a cual password se esta haciendo referencia */
userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
