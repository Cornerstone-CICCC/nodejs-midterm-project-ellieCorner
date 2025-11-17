import express from "express";
import * as messageController from "../controller/message";
import { body } from "express-validator";
import { validate } from "../middleware/validator";
import { isAuth } from "../middleware/auth";

const router = express.Router();

const validateMessage = [
  body("text").trim().isLength({ min: 1 }).withMessage("Text is required"),
];

router.get("/", isAuth, messageController.getMessages);

router.get("/:id", isAuth, messageController.getMessage);

router.post(
  "/",
  isAuth,
  validateMessage,
  validate,
  messageController.createMessage
);

router.put(
  "/:id",
  isAuth,
  validateMessage,
  validate,
  messageController.updateMessage
);

router.delete("/:id", isAuth, messageController.deleteMessage);

export default router;
