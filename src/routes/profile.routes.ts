import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.utils";
import { LogOut, UpdatePassword } from "../Controllers/profile.controllers";

const router = Router();

router.route("/logout").get(asyncHandler(LogOut));

router.route("/updatePassword").post(asyncHandler(UpdatePassword));

export default router;
