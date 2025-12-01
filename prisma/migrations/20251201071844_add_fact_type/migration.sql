/*
  Warnings:

  - Changed the type of `tipo` on the `Despesas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tipo` on the `fatos_financeiros` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Despesas" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoFato" NOT NULL;

-- AlterTable
ALTER TABLE "fatos_financeiros" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoFato" NOT NULL;
