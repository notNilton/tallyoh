-- CreateEnum
CREATE TYPE "TransactionClassification" AS ENUM ('COMMON', 'FUEL');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('GASOLINA_COMUM', 'GASOLINA_ADITIVADA', 'ETANOL', 'DIESEL', 'GNV');

-- AlterTable
ALTER TABLE "refueling_logs" ADD COLUMN     "fuelType" "FuelType",
ADD COLUMN     "station" VARCHAR(100);

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "classification" "TransactionClassification" NOT NULL DEFAULT 'COMMON',
ADD COLUMN     "is_recurring" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "privacy_mode_enabled" BOOLEAN NOT NULL DEFAULT false;
