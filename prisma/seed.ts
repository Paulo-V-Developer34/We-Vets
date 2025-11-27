import { genSaltSync, hashSync } from "bcryptjs"
import { Prisma, PrismaClient, Role } from "../generated/prisma"

const prisma = new PrismaClient()
// 1. Dados de Usuários que são VETERINÁRIOS
const vetUsers = (password: string): Prisma.UserCreateInput[] => [
	{
		name: "Dra. Ana Silva",
		email: "ana.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		// Criação aninhada do perfil de Veterinário
		veterinario: {
			create: {
				crmv: "12345-SP",
				especialidade: "Clínica Geral",
			},
		},
	},
	{
		name: "Dr. João Costa",
		email: "joao.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: {
			create: {
				crmv: "67890-SP",
				especialidade: "Cirurgia",
			},
		},
	},
]

// 2. Dados de Usuários que são DONOS
const donoUsers = (password: string): Prisma.UserCreateInput[] => [
	{
		name: "Carlos Oliveira",
		email: "carlos.dono@gmail.com",
		password: password,
		role: Role.DONO,
		// Criação aninhada do perfil de Dono
		dono: {
			create: {
				telefone: "11999999999",
				endereco: "Rua das Flores, 123",
			},
		},
	},
	{
		name: "Maria Souza",
		email: "maria.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: {
				telefone: "11888888888",
				endereco: "Av. Paulista, 1000",
			},
		},
	},
]

// 3. Dados dos Pets
const pets = (): Prisma.PetCreateInput[] => [
	{
		nome: "Rex",
		especie: "Cachorro",
		raca: "Labrador",
	},
	{
		nome: "Mimi",
		especie: "Gato",
		raca: "Siamês",
	},
]

export async function main() {
	console.log("Iniciando a seed...")
	let qtddDados = 0

	// Configuração de senha
	const salt = genSaltSync(10)
	const hash = hashSync("123456", salt) // Senha padrão para testes

	// --- CRIAÇÃO DE USUÁRIOS VETERINÁRIOS ---
	const vetsData = vetUsers(hash)
	for (const u of vetsData) {
		// Upsert no User verifica pelo email
		const user = await prisma.user.upsert({
			where: { email: u.email },
			update: {}, // Não faz nada se já existir
			create: u, // Cria User + Veterinario (nested)
		})

		if (!user) console.error(`Falha ao criar vet user ${u.name}`)
		else {
			console.log(`User Vet ${user.name} verificado/criado`)
			qtddDados++
		}
	}

	// --- CRIAÇÃO DE USUÁRIOS DONOS ---
	const donosData = donoUsers(hash)
	for (const u of donosData) {
		const user = await prisma.user.upsert({
			where: { email: u.email },
			update: {},
			create: u, // Cria User + Dono (nested)
		})

		if (!user) console.error(`Falha ao criar dono user ${u.name}`)
		else {
			console.log(`User Dono ${user.name} verificado/criado`)
			qtddDados++
		}
	}

	// --- CRIAÇÃO DE PETS ---
	const petsData = pets()
	for (const p of petsData) {
		const pet = await prisma.pet.create({ data: p })
		if (!pet) console.error(`Falha ao criar pet ${p.nome}`)
		else {
			console.log(`Pet ${pet.nome} criado`)
			qtddDados++
		}
	}

	// --- DADOS RELACIONAIS (Dependem dos IDs gerados acima) ---

	// Recuperar os registros do banco para pegar os IDs reais
	// Precisamos dos perfis (Dono/Veterinario), não apenas do User
	const perfilVetAna = await prisma.veterinario.findFirst({
		where: { user: { email: "ana.vet@clinica.com" } },
	})
	const perfilDonoCarlos = await prisma.dono.findFirst({
		where: { user: { email: "carlos.dono@gmail.com" } },
	})
	const petRex = await prisma.pet.findFirst({ where: { nome: "Rex" } })

	if (perfilVetAna && perfilDonoCarlos && petRex) {
		// 4. Criar Produto (Vinculado ao Veterinário ID, não User ID)
		const produto = await prisma.produto.create({
			data: {
				nome: "Vacina V10",
				precoCusto: 50.0,
				precoVenda: 120.0,
				estoque: 100,
				veterinarioId: perfilVetAna.id,
			},
		})
		console.log(`Produto ${produto.nome} criado`)
		qtddDados++

		// 5. Vincular Pet ao Dono
		await prisma.pertence.create({
			data: {
				donoId: perfilDonoCarlos.id,
				petId: petRex.id,
				ativo: true,
			},
		})
		console.log(`Vínculo Pertence criado`)
		qtddDados++

		// 6. Criar Agendamento
		const agendamento = await prisma.agendamento.create({
			data: {
				datahora: new Date(),
				status: "CONCLUIDO",
				donoId: perfilDonoCarlos.id,
				petId: petRex.id,
			},
		})
		console.log(`Agendamento criado`)
		qtddDados++

		// 7. Criar Consulta (Vinculada ao Agendamento e Veterinário)
		await prisma.consulta.create({
			data: {
				diagnostico: "Tudo certo com o Rex.",
				agendamentoId: agendamento.id,
				veterinarioId: perfilVetAna.id,
			},
		})
		console.log(`Consulta criada`)
		qtddDados++

		// 8. Fatos Financeiros
		await prisma.fatosFinanceiros.create({
			data: {
				tipo: "RECEITA",
				valor: 120.0,
				descricao: "Venda Vacina V10",
				produtoId: produto.id,
			},
		})
		console.log(`Fato Financeiro criado`)
		qtddDados++
	}

	console.log(
		`Seed concluída com ${qtddDados} registros principais processados.`,
	)
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
