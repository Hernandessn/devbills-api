import { Router } from "express";



import { createTransactionSchema, getDashboardSchema, getFinancialEvolutionSchema, indexTransactionsSchema } from "../dtos/transactions.dto";
import { ParamsType, validator } from "../middleware/validator.middleware";

import { TransactionFactory } from "../factories/transaction.factory";
import { TransactionsController } from "../controllers/transaction-controller";


export const transactionRoutes = Router();

const controller = new TransactionsController(
  TransactionFactory.getServiceInstance(),
);


transactionRoutes.post('/', 
    validator({
    schema: createTransactionSchema,
    type: ParamsType.BODY
}),
 controller.create
);


transactionRoutes.get('/', validator({
  schema: indexTransactionsSchema,
  type: ParamsType.QUERY,
}), controller.index);

transactionRoutes.get('/dashboard',validator({
  schema: getDashboardSchema,
  type: ParamsType.QUERY,

}),controller.getDashboard
);

transactionRoutes.get('/financial-evolution',validator({
  schema: getFinancialEvolutionSchema,
  type: ParamsType.QUERY,

}),controller.getFinancialEvolution,
);