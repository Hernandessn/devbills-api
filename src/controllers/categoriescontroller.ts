import { Request, Response, NextFunction } from "express";
import { CategoriesService } from "../service/categoriesservice";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { CreatedCategoryDTO } from "../dtos/categories.dto";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";

export class CategoriesController {
  constructor (private categoriesService: CategoriesService){}

   create  = async(
    req: Request<unknown, unknown, CreatedCategoryDTO>,
    res: Response,
    next: NextFunction  // Adicionei o NextFunction aqui, pois falta esse parâmetro
  ) => {
    try {
      const { title, color } = req.body;
     

      const result = await this.categoriesService.create({ title, color });

      return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err); // O next é necessário para o tratamento de erro
    }
  }

   index = async (req: Request,res: Response,next: NextFunction) => {
    try {
    

      const result = await this.categoriesService.index();;

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err); // O next é necessário para o tratamento de erro
    }
  }
}
