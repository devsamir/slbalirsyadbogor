"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.Router();
router.get("/login", auth_controller_1.isLogged, (req, res, next) => {
    res.render("user/v_login", { layout: false });
});
router.use(auth_controller_1.protect);
router.get("/admin/user", (req, res, next) => {
    res.render("admin/v_user", { layout: "admin_layout" });
});
exports.default = router;
//# sourceMappingURL=view.routes.js.map