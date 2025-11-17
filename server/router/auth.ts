import express from "express";
import * as authController from "../controller/auth";
import { body } from "express-validator";
import { validate } from "../middleware/validator";
import { isAuth } from "../middleware/auth";

const router = express.Router();

const validateAuth = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username is required"),
  body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
  body("url")
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .withMessage("URL must be valid if provided"),
];

router.post("/signup", validateAuth, validate, authController.signup);

router.post("/signin", authController.signin);

router.get("/me", isAuth, authController.me);

export default router;
