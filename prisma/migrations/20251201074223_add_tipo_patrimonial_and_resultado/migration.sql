/*
  Warnings:

  - You are about to drop the column `tipo` on the `Despesas` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `fatos_financeiros` table. All the data in the column will be lost.
  - Added the required column `tipoPatrimonial` to the `Despesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoResultado` to the `Despesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoPatrimonial` to the `fatos_financeiros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoResultado` to the `fatos_financeiros` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClassPatrimonio" AS ENUM ('ATIVO_CIRCULANTE', 'ATIVO_NAO_CIRCULANTE', 'ATIVO_PERMANENTE', 'PASSIVO_CIRCULANTE', 'PASSIVO_EXIGIVEL', 'PATRIMONIO_LIQUIDO');

-- CreateEnum
CREATE TYPE "ClassResultado" AS ENUM ('DESPESAS_OPERACIONAIS', 'DESPESAS_NAO_OPERACIONAIS', 'RECEITAS_OPERACIONAIS', 'RECEITAS_NAO_OPERACIONAIS');

-- AlterTable
ALTER TABLE "Despesas" DROP COLUMN "tipo",
ADD COLUMN     "tipoPatrimonial" "ClassPatrimonio" NOT NULL,
ADD COLUMN     "tipoResultado" "ClassResultado" NOT NULL;

-- AlterTable
ALTER TABLE "fatos_financeiros" DROP COLUMN "tipo",
ADD COLUMN     "tipoPatrimonial" "ClassPatrimonio" NOT NULL,
ADD COLUMN     "tipoResultado" "ClassResultado" NOT NULL;

-- DropEnum
DROP TYPE "public"."TipoFato";
