import { Router } from "express";



import { createTransactionsSchema } from "../dtos/transactions.dto";
import { ParamsType, validator } from "../middleware/validator.middleware";
import { TransactionController } from "../controllers/transaction-controller";
import { TransactionFactory } from "../factories/transaction.factory";


export const transactionRoutes = Router();

const controller = new TransactionController(
  TransactionFactory.getServiceInstance(),
);


transactionRoutes.post('/', 
    validator({
    schema: createTransactionsSchema,
    type: ParamsType.BODY
}),
 controller.create
);