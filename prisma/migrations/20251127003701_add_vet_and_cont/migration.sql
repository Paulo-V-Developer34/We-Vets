-- CreateTable
CREATE TABLE "donos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "donos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pertence" (
    "id" TEXT NOT NULL,
    "donoId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pertence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT,
    "nascimento" TIMESTAMP(3),

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agendamentos" (
    "id" TEXT NOT NULL,
    "datahora" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "donoId" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veterinarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "crmv" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,

    CONSTRAINT "veterinarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "observacoes" TEXT,
    "agendamentoId" TEXT NOT NULL,
    "veterinarioId" TEXT NOT NULL,

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "precoCusto" DECIMAL(65,30) NOT NULL,
    "precoVenda" DECIMAL(65,30) NOT NULL,
    "estoque" INTEGER NOT NULL,
    "veterinarioId" TEXT,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fatos_financeiros" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agendamentoId" TEXT,
    "produtoId" TEXT,

    CONSTRAINT "fatos_financeiros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "donos_email_key" ON "donos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "veterinarios_crmv_key" ON "veterinarios"("crmv");

-- CreateIndex
CREATE UNIQUE INDEX "consultas_agendamentoId_key" ON "consultas"("agendamentoId");

-- AddForeignKey
ALTER TABLE "pertence" ADD CONSTRAINT "pertence_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "donos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pertence" ADD CONSTRAINT "pertence_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "donos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "agendamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "veterinarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "veterinarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fatos_financeiros" ADD CONSTRAINT "fatos_financeiros_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "agendamentos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fatos_financeiros" ADD CONSTRAINT "fatos_financeiros_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
