/*
  Warnings:

  - Made the column `result` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attempt` on table `Exam` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "result" SET NOT NULL,
ALTER COLUMN "attempt" SET NOT NULL;
