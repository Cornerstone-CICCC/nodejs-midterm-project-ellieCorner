import express from "express";
import * as messageController from "../controller/message";
import { body } from "express-validator";
import { validate } from "../middleware/validator";

const router = express.Router();

const validateMessage = [
  body("text").trim().isLength({ min: 1 }).withMessage("Text is required"),
];

router.get("/", messageController.getMessages);

router.get("/:id", messageController.getMessage);

router.post("/", validateMessage, validate, messageController.createMessage);

router.put("/:id", validateMessage, validate, messageController.updateMessage);

router.delete("/:id", messageController.deleteMessage);

export default router;
