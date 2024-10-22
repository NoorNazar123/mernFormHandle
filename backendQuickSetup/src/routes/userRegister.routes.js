import { Router } from "express";
import registerUser from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Route for registering a user
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1, // Allow only one file for the avatar
    },
  ]),
  registerUser
);

export default router;
