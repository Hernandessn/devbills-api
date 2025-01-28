import { IndexTransactionDTO } from "../../dtos/transactions.dto";
import { Transaction } from "../../entities/transaction.entity";
import { TransactionModel } from "../schemas/transaction.schema";


export class TransactionRepository {
    constructor(private model: typeof TransactionModel) { }

    async create({ title, date, amount, type, category }: Transaction): Promise<Transaction> {
        const createdTransaction = await this.model.create({});

        return createdTransaction.toObject<Transaction>();
    }


    async index({
        title,
        beginDate,
        categoryId,
        endDate }: IndexTransactionDTO): Promise<Transaction[]> {
        const whereParams: Record<string, unknown> = {
                ...(title && {title: { $regex: title, $options: 'i'} }),
                ...(categoryId && { 'category._id': categoryId}),
            };
        
        if(beginDate || endDate){
            whereParams.date = {
                ...(beginDate && { $gte: beginDate}),
                ...(endDate && { $lte: endDate}),
            };
        }
console.log(whereParams);

        const transactions = await this.model.find(whereParams);

        const transactionsMap = transactions.map(item => item.toObject<Transaction>());

        return transactionsMap;
    }
}
