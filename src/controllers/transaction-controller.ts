import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { TransactionService } from "../service/transaction-service";
import { CreateTransactionDTO, IndexTransactionDTO } from "../dtos/transactions.dto";

export class TransactionController {
    constructor(private transactionService: TransactionService) { }

    create = async (
        req: Request<unknown, unknown, CreateTransactionDTO>,
        res: Response,
        next: NextFunction  // Adicionei o NextFunction aqui, pois falta esse parâmetro
    ) => {
        try {
            const { title, amount, categoryId, date, type } = req.body;


            const result = await this.transactionService.create({
                title,
                amount,
                categoryId,
                date,
                type,
            });

            return res.status(StatusCodes.CREATED).json(result);
        } catch (err) {
            next(err); // O next é necessário para o tratamento de erro
        }
    };
    index = async (
        req: Request<unknown, unknown, IndexTransactionDTO>,
        res: Response,
        next: NextFunction  // Adicionei o NextFunction aqui, pois falta esse parâmetro
    ) => {
        try {
        
            const { title,categoryId, beginDate, endDate} = req.query;
            const result = await this.transactionService.index({
                title,
                categoryId, 
                beginDate, 
                endDate
            });
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            next(err); // O next é necessário para o tratamento de erro
        }
    };
}
