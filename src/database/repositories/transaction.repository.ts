import { GetDashboardDTO, IndexTransactionsDTO,  } from "../../dtos/transactions.dto";
import { Balance } from "../../entities/balance.entity";
import { Expense } from "../../entities/expense.entity";
import { Transaction, TransactionType } from "../../entities/transaction.entity";
import { TransactionModel } from "../schemas/transaction.schema";

  export class TransactionsRepository {
    constructor(private model: typeof TransactionModel) {}
  
    async create({
      title,
      date,
      amount,
      type,
      category,
    }: Transaction): Promise<Transaction> {
      const createdTransaction = await this.model.create({
        title,
        date,
        amount,
        type,
        category,
      });
  
      return createdTransaction.toObject<Transaction>();
    }
  
    async index({
      title,
      categoryId,
      beginDate,
      endDate,
    }: IndexTransactionsDTO): Promise<Transaction[]> {
      const whereParams: Record<string, unknown> = {
        ...(title && { title: { $regex: title, $options: 'i' } }),
        ...(categoryId && { 'category._id': categoryId }),
      };
  
      if (beginDate || endDate) {
        whereParams.date = {
          ...(beginDate && { $gte: beginDate }),
          ...(endDate && { $lte: endDate }),
        };
      }
  
      const transactions = await this.model.find(whereParams, undefined, {
        sort: {
          date: -1,
        },
      });
  
      const transactionsMap = transactions.map((item) =>
        item.toObject<Transaction>(),
      );
  
      return transactionsMap;
    }

    async getBalance({beginDate, endDate}: GetDashboardDTO): Promise<Balance>{
      const aggregate = this.model.aggregate<Balance>();
      if (beginDate || endDate) {
        aggregate.match ({
        date:{
          ...(beginDate && { $gte: beginDate }),
          ...(endDate && { $lte: endDate }),
        }
        });
      }
      const[ result] = await aggregate
      .match({
        date: {
          $gte: beginDate,
          $lte: endDate,
        },
      }).project({
        _id: 0,
        income: {
          $cond: {
            if: {
              $eq: ["$type", "income"]
            },
            then: "$amount",
            else: 0
          }
        },
        expense: {
          $cond: {
            if: {
              $eq: ["$type", "expense"]
            },
            then: "$amount",
            else: 0
          },
        },
      }).group({
        _id: null,
        incomes: {
          $sum: "$income"
        },
        expenses: {
          $sum: "$expense"
        }
      }).addFields({
        ballance: {
          $subtract: ["$incomes", "$expenses"]
        }
      });
      return result;
    }


    async getExpense({
      beginDate,
      endDate,
    }: GetDashboardDTO): Promise<Expense[]>{
      const aggregate = this.model.aggregate<Expense>();
      const matchParams: Record<string, unknown> = {
        type: TransactionType.EXPENSE,

      }
      if (beginDate || endDate) {
         
       matchParams.date = { 
          ...(beginDate && { $gte: beginDate }),
          ...(endDate && { $lte: endDate }),
       }; 
    }
    const result = await aggregate.match(matchParams).group({
      _id: '$category._id',
      title:{
        $first: '$category.title',
      },
      color: {
        $first: '$category.color',
      },
      amount:{
        $sum: '$amount',
      }, 
    });
    return result;
  }    
}

