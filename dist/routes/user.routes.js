"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.Router();
router.use(auth_controller_1.protect);
router.get("/", user_controller_1.getAllUser);
router.post("/", user_controller_1.createUser);
router.put("/:id", user_controller_1.updateUser);
router.delete("/:id", user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map