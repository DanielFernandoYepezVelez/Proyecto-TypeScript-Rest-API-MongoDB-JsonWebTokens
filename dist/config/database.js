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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Connection {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connected = yield mongoose_1.connect("mongodb://localhost/authenticate", {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true,
                });
                if (connected) {
                    console.log(`>>> Database Is Connected`);
                }
            }
            catch (_a) {
                console.log(`Conexión Falló`);
            }
        });
    }
}
const db = new Connection();
exports.default = db.connect();
//# sourceMappingURL=database.js.map