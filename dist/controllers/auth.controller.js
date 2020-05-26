"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authContoller = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            /* user va a tener las propiedades de la interface */
            const user = new User_1.default({
                username,
                email,
                password,
            });
            user.password = yield user.encryptPassword(password);
            const userSave = yield user.save();
            const token = jsonwebtoken_1.default.sign({ _id: userSave._id }, process.env.TOKEN_SECRET || "tokentest");
            return res.header("auth-token", token).json({
                message: "Registered Successfuly!",
                userSave,
            });
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield User_1.default.findOne({ email });
            if (!user)
                return res.status(400).json("Email No Existe");
            const validateUser = yield user.validatePassword(password);
            if (!validateUser)
                return res.status(400).json("Invalid Password");
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || "tokentest", {
                expiresIn: "48h",
            });
            return res.header("auth-token", token).json(user);
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Para No Mostrarle Al Usuario El Password
            const user = yield User_1.default.findById(req.userId, { password: 0 });
            if (!user)
                return res.status(401).json("No User Found");
            return res.json({
                user,
            });
        });
    }
}
exports.authContoller = new AuthController();
//# sourceMappingURL=auth.controller.js.map