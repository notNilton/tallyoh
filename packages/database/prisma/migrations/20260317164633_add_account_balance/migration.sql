-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "affects_account" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "card_id" TEXT;

-- CreateIndex
CREATE INDEX "transactions_user_id_card_id_date_idx" ON "transactions"("user_id", "card_id", "date");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
