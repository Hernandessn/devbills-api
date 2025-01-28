import { TransactionRepository } from "../database/repositories/transaction.repository";
import { Transaction } from "../entities/transaction.entity";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { AppError } from "../errors/app.error";
import { StatusCodes } from "http-status-codes";
import { CreateTransactionDTO, IndexTransactionDTO } from "../dtos/transactions.dto";

export class TransactionService {
    constructor(
        private transactionsRepository: TransactionRepository,
        private categoriesRepository: CategoriesRepository,
    ) {}

    async create({ 
        title, 
        date, 
        amount, 
        type, 
        categoryId 
    }: CreateTransactionDTO): Promise<Transaction> {

        const category = await this.categoriesRepository.findById(categoryId);

        if (!category) {
            throw new AppError('Category does not exists', StatusCodes.NOT_FOUND);
        }

        const transaction = new Transaction({
            title,
            type,
            date,
            category,
            amount,
        });

        const createdTransaction = 
        await this.transactionsRepository.create(transaction);

        return createdTransaction;
    }

    // Implementação do método index
    async index(filters: IndexTransactionDTO): Promise<Transaction[]> {
        // Use o repositório para buscar todas as transações
        const transactions = await this.transactionsRepository.index(filters);
        return transactions;
    }
}
