-- CreateEnum
CREATE TYPE "InvestmentStatus" AS ENUM ('PENDING', 'CANCELLED', 'CONFIRMED');

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "status" "InvestmentStatus" NOT NULL DEFAULT 'PENDING';
