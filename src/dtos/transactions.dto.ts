import { z } from "zod";
import { TransactionType } from "../entities/transaction.entity";

// Schema para criação de transações
export const createTransactionsSchema = {
    title: z.string(),
    amount: z.number().int().positive(),
    type: z.nativeEnum(TransactionType),
    date: z.coerce.date(),
    categoryId: z.string().length(24),
};

const createTransactionObject = z.object(createTransactionsSchema);
export type CreateTransactionDTO = z.infer<typeof createTransactionObject>;

// Schema para index de transações
export const indexTransactionSchema = {
    title: z.string().optional(),
    categoryId: z.string().length(24).optional(),
    beginDate: z.coerce.date().optional(), // Corrigido de "baginDate" para "beginDate"
    endDate: z.coerce.date().optional(),
};

const indexTransactionsObject = z.object(indexTransactionSchema);
export type IndexTransactionDTO = z.infer<typeof indexTransactionsObject>;
