import { CategoriesRepository } from "../database/repositories/categories.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { CategoriesService } from "../service/categoriesservice";

export class CategoriesFactory {
    private static categoriesService: CategoriesService;


    static getServiceInstance(){
        if(this.categoriesService){
            return this.categoriesService;
        }

        const repository = new CategoriesRepository(CategoryModel)
    }
}