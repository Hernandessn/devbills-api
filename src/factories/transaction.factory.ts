import { CategoriesRepository } from "../database/repositories/categories.repository";
import { TransactionRepository } from "../database/repositories/transaction.repository";
import { CategoryModel } from "../database/schemas/category.schema";
import { TransactionModel } from "../database/schemas/transaction.schema";
import { TransactionService } from "../service/transaction-service";

export class TransactionFactory {
    private static transactionService: TransactionService;


    static getServiceInstance() {
        if (this.transactionService) {
            return this.transactionService;
        }

        const repository = new TransactionRepository(TransactionModel)
        const categoriesRepository = new CategoriesRepository(CategoryModel)
        const service = new TransactionService(repository, categoriesRepository)

        this.transactionService = service;

        return service;
    }
}