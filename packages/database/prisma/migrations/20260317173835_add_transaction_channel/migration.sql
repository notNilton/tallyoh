-- CreateEnum
CREATE TYPE "TransactionChannel" AS ENUM ('CARD_CREDIT', 'CARD_DEBIT', 'PIX', 'BANK');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "channel" "TransactionChannel" NOT NULL DEFAULT 'BANK';
