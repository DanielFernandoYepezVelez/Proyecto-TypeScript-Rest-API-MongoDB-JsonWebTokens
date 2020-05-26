"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
class Main {
    constructor() {
        this.init();
    }
    init() {
        app_1.default.settings();
        app_1.default.middlewares();
        app_1.default.routes();
        app_1.default.start();
    }
}
new Main();
//# sourceMappingURL=index.js.map