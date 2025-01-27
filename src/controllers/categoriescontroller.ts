import { Request, Response, NextFunction } from "express";
import { CategoriesService } from "../service/categoriesservice";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { CreatedCategoryDTO } from "../dtos/categories.dto";

export class CategoriesController {
  async create(
    req: Request<unknown, unknown, CreatedCategoryDTO>,
    res: Response,
    next: NextFunction  // Adicionei o NextFunction aqui, pois falta esse parâmetro
  ) {
    try {
      const { title, color } = req.body;
      const repository = new CategoriesRepository(CategoryModel);
      const service = new CategoriesService(
        new CategoriesRepository(CategoryModel)
      );

      const result = await service.create({ title, color });

      return res.status(201).json(result);
    } catch (err) {
      next(err); // O next é necessário para o tratamento de erro
    }
  }
}
