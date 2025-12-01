-- DropForeignKey
ALTER TABLE "public"."agendamentos" DROP CONSTRAINT "agendamentos_donoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."agendamentos" DROP CONSTRAINT "agendamentos_petId_fkey";

-- DropForeignKey
ALTER TABLE "public"."consultas" DROP CONSTRAINT "consultas_agendamentoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."consultas" DROP CONSTRAINT "consultas_veterinarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."fatos_financeiros" DROP CONSTRAINT "fatos_financeiros_agendamentoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."fatos_financeiros" DROP CONSTRAINT "fatos_financeiros_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pertence" DROP CONSTRAINT "pertence_donoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pertence" DROP CONSTRAINT "pertence_petId_fkey";

-- DropForeignKey
ALTER TABLE "public"."produtos" DROP CONSTRAINT "produtos_veterinarioId_fkey";

-- AddForeignKey
ALTER TABLE "pertence" ADD CONSTRAINT "pertence_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "donos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pertence" ADD CONSTRAINT "pertence_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "donos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "agendamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "veterinarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "veterinarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fatos_financeiros" ADD CONSTRAINT "fatos_financeiros_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "agendamentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fatos_financeiros" ADD CONSTRAINT "fatos_financeiros_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
