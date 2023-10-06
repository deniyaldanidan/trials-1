/*
  Warnings:

  - Made the column `refresh` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "refresh" SET NOT NULL,
ALTER COLUMN "refresh" SET DEFAULT '';
