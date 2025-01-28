import { Router } from "express";
import { CategoriesController } from "../controllers/categoriescontroller";
import { ParamsType, validator } from "../middleware/validator.middleware";
import { createCategorySchema } from "../dtos/categories.dto";

export const categoriesRoutes = Router();

const controller = new CategoriesController();

categoriesRoutes.get('/', controller.index)

categoriesRoutes.post('/', validator({
    schema: createCategorySchema,
    type: ParamsType.BODY
}),
 controller.create
);