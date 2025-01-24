import { Request, Response } from "express";
import { CategoriesService } from "../service/categoriesservice";

export class CategoriesController {
    async create(_: Request, res: Response){
        const service = new CategoriesService()

        const result = await service.create();

        return res.status(201).json(result);
    }
}