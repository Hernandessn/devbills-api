
import { Transaction } from "../entities/transaction.entity";
import { CategoriesRepository } from "../database/repositories/categories.repository";
import { AppError } from "../errors/app.error";
import { StatusCodes } from "http-status-codes";
import { CreateTransactionDTO, GetDashboardDTO, IndexTransactionsDTO } from "../dtos/transactions.dto";
import { TransactionsRepository } from "../database/repositories/transaction.repository";
import { Balance } from "../entities/balance.entity";

export class TransactionService {
    constructor(
        private transactionsRepository: TransactionsRepository,
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
    async index({  title,
        beginDate,
        categoryId,
        endDate}: IndexTransactionsDTO): Promise<Transaction[]> {
        // Use o repositório para buscar todas as transações
        const transactions = await this.transactionsRepository.index({  title,
            beginDate,
            categoryId,
            endDate});
        return transactions;
    }

    async getDashboard({beginDate, endDate}: GetDashboardDTO){
     let balance = await this.transactionsRepository.getBalance({beginDate, endDate});

    if(!balance){
        balance = new Balance({
            _id: null,
            incomes: 0,
            expenses: 0,
            balance: 0,
        });
      }
       return balance
    }
}
