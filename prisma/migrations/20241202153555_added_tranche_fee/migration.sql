/*
  Warnings:

  - Added the required column `fee` to the `Tranche` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tranche" ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL;
