-- CreateEnum
CREATE TYPE "Operacao" AS ENUM ('DEBITO', 'CREDITO');

-- AlterTable
ALTER TABLE "fatos_financeiros" ADD COLUMN     "operacao" "Operacao" NOT NULL DEFAULT 'CREDITO';
