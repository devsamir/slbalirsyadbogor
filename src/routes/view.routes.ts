import { NextFunction, Router, Request, Response } from "express";
import { isLogged, protect } from "../controllers/auth.controller";

const router = Router();

router.get(
  "/login",
  isLogged,
  (req: Request, res: Response, next: NextFunction) => {
    res.render("user/v_login", { layout: false });
  }
);

router.use(protect);

// ADMIN
router.get("/admin/user", (req: Request, res: Response, next: NextFunction) => {
  res.render("admin/v_user", { layout: "admin_layout" });
});

export default router;
