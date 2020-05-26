import { Router } from "express";
import { authContoller } from "../controllers/auth.controller";
import { validateToken } from "../middlewares/validateToken";

class AuthRoutes {
  constructor(public router: Router) {
    this.router.post("/signup", authContoller.signup);
    this.router.post("/signin", authContoller.signin);
    this.router.get(
      "/profile",
      validateToken.userVerify,
      authContoller.profile
    );
  }
}

const authRouter = new AuthRoutes(Router());
export default authRouter.router;
