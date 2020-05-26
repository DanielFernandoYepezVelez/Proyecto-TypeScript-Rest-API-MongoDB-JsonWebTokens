"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validateToken_1 = require("../middlewares/validateToken");
class AuthRoutes {
    constructor(router) {
        this.router = router;
        this.router.post("/signup", auth_controller_1.authContoller.signup);
        this.router.post("/signin", auth_controller_1.authContoller.signin);
        this.router.get("/profile", validateToken_1.validateToken.userVerify, auth_controller_1.authContoller.profile);
    }
}
const authRouter = new AuthRoutes(express_1.Router());
exports.default = authRouter.router;
//# sourceMappingURL=auth.routes.js.map