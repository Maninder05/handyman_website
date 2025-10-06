import { validationResult } from "express-validator";

export default function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map(err => ({ field: err.param, msg: err.msg })),
    });
  }
  next();
}