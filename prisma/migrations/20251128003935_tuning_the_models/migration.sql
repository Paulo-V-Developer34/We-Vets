/*
  Warnings:

  - The `status` column on the `agendamentos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `precoCusto` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `precoVenda` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `agendamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'CONCLUIDO', 'CANCELADO');

-- AlterTable
ALTER TABLE "agendamentos" ADD COLUMN     "descricao" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "precoCusto",
DROP COLUMN "precoVenda",
ADD COLUMN     "preco" DECIMAL(65,30) NOT NULL;
