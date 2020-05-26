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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./config/database");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
class App {
    constructor(app) {
        this.app = app;
    }
    settings() {
        this.app.set("port", process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use("/api/auth", auth_routes_1.default);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.app.listen(this.app.get("port"));
                console.log(`Server On Port ${this.app.get("port")}`);
            }
            catch (_a) {
                console.log("No Exist PORT!");
            }
        });
    }
}
const application = new App(express_1.default());
exports.default = application;
//# sourceMappingURL=app.js.map