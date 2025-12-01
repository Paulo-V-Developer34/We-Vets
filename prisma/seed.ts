import {
	PrismaClient,
	Prisma,
	Role,
	Status,
	TipoConsulta,
} from "../generated/prisma"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

// ==================== HELPER FUNCTIONS ====================

function randomDate(start: Date, end: Date): Date {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime()),
	)
}

function daysAgo(days: number): Date {
	const date = new Date()
	date.setDate(date.getDate() - days)
	return date
}

function daysFromNow(days: number): Date {
	const date = new Date()
	date.setDate(date.getDate() + days)
	return date
}

// ==================== DADOS ====================

const users: Prisma.UserCreateInput[] = [
	{
		email: "admin@petclinic.com",
		name: "Administrador",
		password: "", // Será hasheado
		role: Role.ADMIN,
	},
	{
		email: "joao.silva@email.com",
		name: "João Silva",
		password: "", // Será hasheado
		role: Role.DONO,
		dono: {
			create: {
				telefone: "(11) 98765-4321",
				endereco: "Rua das Flores, 123 - São Paulo, SP",
			},
		},
	},
	{
		email: "maria.santos@email.com",
		name: "Maria Santos",
		password: "", // Será hasheado
		role: Role.DONO,
		dono: {
			create: {
				telefone: "(11) 97654-3210",
				endereco: "Av. Paulista, 1000 - São Paulo, SP",
			},
		},
	},
	{
		email: "carlos.oliveira@email.com",
		name: "Carlos Oliveira",
		password: "", // Será hasheado
		role: Role.DONO,
		dono: {
			create: {
				telefone: "(11) 96543-2109",
				endereco: "Rua Augusta, 456 - São Paulo, SP",
			},
		},
	},
	{
		email: "ana.ferreira@email.com",
		name: "Ana Ferreira",
		password: "", // Será hasheado
		role: Role.DONO,
		dono: {
			create: {
				telefone: "(11) 95432-1098",
				endereco: "Rua Oscar Freire, 789 - São Paulo, SP",
			},
		},
	},
	{
		email: "dra.ana.costa@petclinic.com",
		name: "Dra. Ana Costa",
		password: "", // Será hasheado
		role: Role.VETERINARIO,
		veterinario: {
			create: {
				crmv: "SP-12345",
				especialidade: "Clínica Geral",
			},
		},
	},
	{
		email: "dr.pedro.lima@petclinic.com",
		name: "Dr. Pedro Lima",
		password: "", // Será hasheado
		role: Role.VETERINARIO,
		veterinario: {
			create: {
				crmv: "SP-54321",
				especialidade: "Cirurgia",
			},
		},
	},
	{
		email: "dra.julia.mendes@petclinic.com",
		name: "Dra. Júlia Mendes",
		password: "", // Será hasheado
		role: Role.VETERINARIO,
		veterinario: {
			create: {
				crmv: "SP-67890",
				especialidade: "Dermatologia",
			},
		},
	},
]

const pets: Prisma.PetCreateInput[] = [
	{
		nome: "Rex",
		especie: "Cachorro",
		raca: "Labrador",
		nascimento: new Date("2020-03-15"),
		cadastro: daysAgo(180),
	},
	{
		nome: "Mimi",
		especie: "Gato",
		raca: "Siamês",
		nascimento: new Date("2021-07-22"),
		cadastro: daysAgo(120),
	},
	{
		nome: "Bob",
		especie: "Cachorro",
		raca: "Golden Retriever",
		nascimento: new Date("2019-11-10"),
		cadastro: daysAgo(250),
	},
	{
		nome: "Luna",
		especie: "Gato",
		raca: "Persa",
		nascimento: new Date("2022-01-05"),
		cadastro: daysAgo(90),
	},
	{
		nome: "Thor",
		especie: "Cachorro",
		raca: "Pastor Alemão",
		nascimento: new Date("2021-05-18"),
		cadastro: daysAgo(150),
	},
	{
		nome: "Mel",
		especie: "Gato",
		raca: "Vira-lata",
		nascimento: new Date("2020-09-30"),
		cadastro: daysAgo(200),
	},
	{
		nome: "Toby",
		especie: "Cachorro",
		raca: "Poodle",
		nascimento: new Date("2023-02-14"),
		cadastro: daysAgo(60),
	},
	{
		nome: "Nina",
		especie: "Gato",
		raca: "Maine Coon",
		nascimento: new Date("2022-08-20"),
		cadastro: daysAgo(100),
	},
]

const produtos: Omit<Prisma.ProdutoCreateInput, "veterinario">[] = [
	{
		nome: "Ração Premium Adulto",
		preco: new Prisma.Decimal(89.9),
		estoque: 50,
	},
	{
		nome: "Vacina V10",
		preco: new Prisma.Decimal(120.0),
		estoque: 30,
	},
	{
		nome: "Antipulgas",
		preco: new Prisma.Decimal(45.5),
		estoque: 100,
	},
	{
		nome: "Vermífugo",
		preco: new Prisma.Decimal(35.0),
		estoque: 80,
	},
	{
		nome: "Shampoo Medicinal",
		preco: new Prisma.Decimal(55.0),
		estoque: 40,
	},
	{
		nome: "Coleira Antiparasitária",
		preco: new Prisma.Decimal(78.9),
		estoque: 25,
	},
	{
		nome: "Ração Filhote",
		preco: new Prisma.Decimal(95.0),
		estoque: 35,
	},
	{
		nome: "Vacina Antirrábica",
		preco: new Prisma.Decimal(80.0),
		estoque: 45,
	},
	{
		nome: "Suplemento Vitamínico",
		preco: new Prisma.Decimal(62.5),
		estoque: 60,
	},
	{
		nome: "Pomada Cicatrizante",
		preco: new Prisma.Decimal(38.0),
		estoque: 70,
	},
]

const despesas: Prisma.DespesasCreateInput[] = [
	{
		tipoPatrimonial: "PASSIVO_CIRCULANTE",
		tipoResultado: "DESPESAS_OPERACIONAIS",
		valor: new Prisma.Decimal(5000.0),
		descricao: "Aluguel mensal da clínica",
		dataInicio: new Date("2024-01-01"),
		dataRegistro: new Date("2024-01-01"),
	},
	{
		tipoPatrimonial: "PASSIVO_CIRCULANTE",
		tipoResultado: "DESPESAS_OPERACIONAIS",
		valor: new Prisma.Decimal(850.0),
		descricao: "Conta de energia elétrica - Janeiro",
		dataInicio: new Date("2024-01-01"),
		dataFim: new Date("2024-01-31"),
		dataRegistro: new Date("2024-01-05"),
	},
	{
		tipoPatrimonial: "ATIVO_CIRCULANTE",
		tipoResultado: "DESPESAS_OPERACIONAIS",
		valor: new Prisma.Decimal(1500.0),
		descricao: "Compra de materiais cirúrgicos",
		dataInicio: new Date("2024-01-15"),
		dataFim: new Date("2024-01-15"),
		dataRegistro: new Date("2024-01-15"),
	},
	{
		tipoPatrimonial: "ATIVO_PERMANENTE",
		tipoResultado: "DESPESAS_OPERACIONAIS",
		valor: new Prisma.Decimal(2200.0),
		descricao: "Compra de equipamentos médicos",
		dataInicio: new Date("2024-02-20"),
		dataFim: new Date("2024-02-20"),
		dataRegistro: new Date("2024-02-20"),
	},
	{
		tipoPatrimonial: "PASSIVO_CIRCULANTE",
		tipoResultado: "DESPESAS_OPERACIONAIS",
		valor: new Prisma.Decimal(15000.0),
		descricao: "Folha de pagamento - Janeiro",
		dataInicio: new Date("2024-01-01"),
		dataFim: new Date("2024-01-31"),
		dataRegistro: new Date("2024-01-25"),
	},
]

// ==================== FUNÇÕES DE SEED ====================

async function seedUsers() {
	console.log("🌱 Criando usuários...")

	const hashedPassword = await hash("Senha@123", 10)

	for (const userData of users) {
		await prisma.user.create({
			data: {
				...userData,
				password: hashedPassword,
			},
		})
	}

	console.log(`✅ ${users.length} usuários criados`)
}

async function seedPets() {
	console.log("🌱 Criando pets e relacionamentos com donos...")

	const donos = await prisma.dono.findMany({
		include: { user: true },
	})

	for (let i = 0; i < pets.length; i++) {
		const dono = donos[i % donos.length]

		await prisma.pet.create({
			data: {
				...pets[i],
				pertence: {
					create: {
						donoId: dono.id,
						ativo: true,
						criadoEm: pets[i].cadastro || new Date(),
					},
				},
			},
		})
	}

	console.log(`✅ ${pets.length} pets criados`)
}

async function seedProdutos() {
	console.log("🌱 Criando produtos...")

	const veterinarios = await prisma.veterinario.findMany({
		include: { user: true },
	})

	for (let i = 0; i < produtos.length; i++) {
		const vet = veterinarios[i % veterinarios.length]

		await prisma.produto.create({
			data: {
				...produtos[i],
				veterinario: {
					connect: { id: vet.id },
				},
			},
		})
	}

	console.log(`✅ ${produtos.length} produtos criados`)
}

async function seedDespesas() {
	console.log("🌱 Criando despesas...")

	for (const despesaData of despesas) {
		await prisma.despesas.create({
			data: despesaData,
		})
	}

	console.log(`✅ ${despesas.length} despesas criadas`)
}

async function seedAgendamentos() {
	console.log("🌱 Criando agendamentos...")

	const donos = await prisma.dono.findMany({
		include: { user: true },
	})
	const pets = await prisma.pet.findMany()
	const veterinarios = await prisma.veterinario.findMany({
		include: { user: true },
	})

	const agendamentosData: Prisma.AgendamentoCreateInput[] = [
		// Agendamentos concluídos - mês passado
		{
			datahora: daysAgo(45),
			status: Status.CONCLUIDO,
			descricao: "Consulta de rotina e aplicação de vacina V10",
			dono: { connect: { id: donos[0].id } },
			pet: { connect: { id: pets[0].id } },
			consulta: {
				create: {
					diagnostico:
						"Animal saudável, sem alterações detectadas. Vacinação em dia.",
					observacoes: "Aplicada vacina V10. Retornar em 1 ano para reforço.",
					tipo: TipoConsulta.VACINACAO,
					veterinario: { connect: { id: veterinarios[0].id } },
				},
			},
			fatos: {
				create: [
					{
						tipoPatrimonial: "ATIVO_CIRCULANTE",
						tipoResultado: "RECEITAS_OPERACIONAIS",
						valor: new Prisma.Decimal(150.0),
						descricao: "Consulta veterinária",
						data: daysAgo(45),
					},
					{
						tipoPatrimonial: "ATIVO_CIRCULANTE",
						tipoResultado: "RECEITAS_OPERACIONAIS",
						valor: new Prisma.Decimal(120.0),
						descricao: "Vacina V10",
						data: daysAgo(45),
					},
				],
			},
		},
		{
			datahora: daysAgo(38),
			status: Status.CONCLUIDO,
			descricao: "Consulta dermatológica - coceira excessiva",
			dono: { connect: { id: donos[1].id } },
			pet: { connect: { id: pets[1].id } },
			consulta: {
				create: {
					diagnostico: "Dermatite alérgica causada por pulgas",
					observacoes:
						"Prescrito shampoo medicinal e antipulgas. Retornar em 15 dias para avaliação.",
					tipo: TipoConsulta.CONSULTA,
					veterinario: { connect: { id: veterinarios[2].id } },
				},
			},
			fatos: {
				create: [
					{
						tipoPatrimonial: "ATIVO_CIRCULANTE",
						tipoResultado: "RECEITAS_OPERACIONAIS",
						valor: new Prisma.Decimal(180.0),
						descricao: "Consulta especializada - Dermatologia",
						data: daysAgo(38),
					},
					{
						tipoPatrimonial: "ATIVO_CIRCULANTE",
						tipoResultado: "RECEITAS_OPERACIONAIS",
						valor: new Prisma.Decimal(45.5),
						descricao: "Antipulgas",
						data: daysAgo(38),
					},
				],
			},
		},
		{
			datahora: daysAgo(30),
			status: Status.CONCLUIDO,
			descricao: "Cirurgia de castração",
			dono: { connect: { id: donos[2].id } },
			pet: { connect: { id: pets[4].id } },
			consulta: {
				create: {
					diagnostico:
						"Procedimento cirúrgico de orquiectomia realizado com sucesso",
					observacoes:
						"Repouso absoluto por 7 dias. Retornar para retirada de pontos em 10 dias.",
					tipo: TipoConsulta.CIRURGIA,
					veterinario: { connect: { id: veterinarios[1].id } },
				},
			},
			fatos: {
				create: [
					{
						tipoPatrimonial: "ATIVO_CIRCULANTE",
						tipoResultado: "RECEITAS_OPERACIONAIS",
						valor: new Prisma.Decimal(450.0),
						descricao: "Cirurgia de castração",
						data: daysAgo(30),
					},
				],
			},
		},
		{
			datahora: daysAgo(25),
			status: Status.CONCLUIDO,
			descricao: "Retorno - Avaliação pós-cirúrgica",
			dono: { connect: { id: donos[2].id } },
			pet: { connect: { id: pets[4].id } },
			consulta: {
				create: {
					diagnostico: "Cicatrização adequada, sem sinais de infecção",
					observacoes:
						"Pontos removidos com sucesso. Animal liberado para atividades normais.",
					tipo: TipoConsulta.RETORNO,
					veterinario: { connect: { id: veterinarios[1].id } },
				},
			},
		},
		{
			datahora: daysAgo(20),
			status: Status.CONCLUIDO,
			descricao: "Retorno dermatológico - reavaliação",
			dono: { connect: { id: donos[1].id } },
			pet: { connect: { id: pets[1].id } },
			consulta: {
				create: {
					diagnostico: "Melhora significativa do quadro dermatológico",
					observacoes:
						"Continuar tratamento por mais 15 dias. Próximo retorno agendado.",
					tipo: TipoConsulta.RETORNO,
					veterinario: { connect: { id: veterinarios[2].id } },
				},
			},
		},
		{
			datahora: daysAgo(15),
			status: Status.CONCLUIDO,
			descricao: "Exames laboratoriais - check-up anual",
			dono: { connect: { id: donos[3].id } },
			pet: { connect: { id: pets[2].id } },
			consulta: {
				create: {
					diagnostico: "Hemograma e bioquímica dentro dos padrões normais",
					observacoes:
						"Animal saudável. Manter rotina de exercícios e alimentação adequada.",
					tipo: TipoConsulta.EXAMES,
					veterinario: { connect: { id: veterinarios[0].id } },
				},
			},
			fatos: {
				create: [
					{
						tipoPatrimonial: "ATIVO_CIRCULANTE",
						tipoResultado: "RECEITAS_OPERACIONAIS",
						valor: new Prisma.Decimal(280.0),
						descricao: "Exames laboratoriais completos",
						data: daysAgo(15),
					},
				],
			},
		},
		{
			datahora: daysAgo(10),
			status: Status.CONCLUIDO,
			descricao: "Atendimento emergencial - vômitos",
			dono: { connect: { id: donos[0].id } },
			pet: { connect: { id: pets[0].id } },
			consulta: {
				create: {
					diagnostico: "Gastroenterite aguda",
					observacoes:
						"Administrado antiemético e protetor gástrico. Dieta leve por 3 dias.",
					tipo: TipoConsulta.EMERGENCIA,
					veterinario: { connect: { id: veterinarios[0].id } },
				},
			},
			fatos: {
				create: [
					{
						tipoPatrimonial: "ATIVO_CIRCULANTE",
						tipoResultado: "RECEITAS_OPERACIONAIS",
						valor: new Prisma.Decimal(350.0),
						descricao: "Atendimento emergencial",
						data: daysAgo(10),
					},
				],
			},
		},
		{
			datahora: daysAgo(5),
			status: Status.CONCLUIDO,
			descricao: "Banho e tosa higiênica",
			dono: { connect: { id: donos[3].id } },
			pet: { connect: { id: pets[6].id } },
			fatos: {
				create: [
					{
						tipoPatrimonial: "ATIVO_CIRCULANTE",
						tipoResultado: "RECEITAS_OPERACIONAIS",
						valor: new Prisma.Decimal(80.0),
						descricao: "Banho e tosa",
						data: daysAgo(5),
					},
				],
			},
		},
		// Agendamentos pendentes - futuros
		{
			datahora: daysFromNow(2),
			status: Status.PENDENTE,
			descricao: "Consulta de rotina e check-up geral",
			dono: { connect: { id: donos[1].id } },
			pet: { connect: { id: pets[3].id } },
		},
		{
			datahora: daysFromNow(5),
			status: Status.PENDENTE,
			descricao: "Aplicação de vacina antirrábica",
			dono: { connect: { id: donos[2].id } },
			pet: { connect: { id: pets[2].id } },
		},
		{
			datahora: daysFromNow(7),
			status: Status.PENDENTE,
			descricao: "Banho e tosa",
			dono: { connect: { id: donos[0].id } },
			pet: { connect: { id: pets[0].id } },
		},
		{
			datahora: daysFromNow(10),
			status: Status.PENDENTE,
			descricao: "Aplicação de vermífugo",
			dono: { connect: { id: donos[3].id } },
			pet: { connect: { id: pets[7].id } },
		},
		{
			datahora: daysFromNow(12),
			status: Status.PENDENTE,
			descricao: "Consulta dermatológica - manchas na pele",
			dono: { connect: { id: donos[1].id } },
			pet: { connect: { id: pets[5].id } },
		},
		{
			datahora: daysFromNow(15),
			status: Status.PENDENTE,
			descricao: "Avaliação pré-cirúrgica",
			dono: { connect: { id: donos[3].id } },
			pet: { connect: { id: pets[6].id } },
		},
		// Agendamento cancelado
		{
			datahora: daysAgo(3),
			status: Status.CANCELADO,
			descricao: "Consulta de rotina - CANCELADA pelo cliente",
			dono: { connect: { id: donos[2].id } },
			pet: { connect: { id: pets[4].id } },
		},
	]

	for (const agendData of agendamentosData) {
		await prisma.agendamento.create({
			data: agendData,
		})
	}

	console.log(`✅ ${agendamentosData.length} agendamentos criados`)
}

// ==================== FUNÇÃO MAIN ====================

async function main() {
	console.log("🚀 Iniciando seed do banco de dados...\n")

	try {
		// Limpar banco de dados (ordem inversa das dependências)
		console.log("🧹 Limpando banco de dados...")
		await prisma.fatosFinanceiros.deleteMany()
		await prisma.consulta.deleteMany()
		await prisma.agendamento.deleteMany()
		await prisma.despesas.deleteMany()
		await prisma.produto.deleteMany()
		await prisma.pertence.deleteMany()
		await prisma.pet.deleteMany()
		await prisma.dono.deleteMany()
		await prisma.veterinario.deleteMany()
		await prisma.account.deleteMany()
		await prisma.session.deleteMany()
		await prisma.authenticator.deleteMany()
		await prisma.user.deleteMany()
		console.log("✅ Banco de dados limpo\n")

		// Executar seeds
		await seedUsers()
		await seedPets()
		await seedProdutos()
		await seedDespesas()
		await seedAgendamentos()

		console.log("\n✨ Seed concluído com sucesso!")
		console.log("\n📊 Resumo:")
		console.log(`   • ${users.length} usuários`)
		console.log(`   • ${pets.length} pets`)
		console.log(`   • ${produtos.length} produtos`)
		console.log(`   • ${despesas.length} despesas`)
		console.log(`   • 15 agendamentos (8 concluídos, 6 pendentes, 1 cancelado)`)
	} catch (error) {
		console.error("❌ Erro durante o seed:", error)
		throw error
	}
}

// ==================== EXECUÇÃO ====================

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
