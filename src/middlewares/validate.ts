import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

type ValidationSchema = {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
};

export function validate(schema: ValidationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        const parsed = schema.body.parse(req.body);
        req.body = parsed;
      }
      if (schema.query) schema.query.parse(req.query);
      if (schema.params) schema.params.parse(req.params);
      next();
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
        error: error.errors,
      });
      return;
    }
  };
}
