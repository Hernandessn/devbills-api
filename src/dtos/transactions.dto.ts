import { z } from "zod";
import { TransactionType } from "../entities/transaction.entity";

export const createTransactionsSchema = {
    title: z.string(),
    amount: z.number().int().positive(),
    type: z.nativeEnum(TransactionType),
    date: z.coerce.date(),
    categoryId: z.string().length(24),
};

const createTransactionObject = z.object(createTransactionsSchema);
export type CreateTransactionDTO = z.infer<typeof createTransactionObject>;

export const indexTransactionSchema = {
    title: z.string().optional(),
    categoryId: z.string().length(24).optional(),
    beginDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
};

const indexTransactionObject = z.object(indexTransactionSchema);
export type IndexTransactionDTO = z.infer<typeof indexTransactionObject>;
