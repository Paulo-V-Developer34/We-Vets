import { genSaltSync, hashSync } from "bcryptjs"
import { Prisma, PrismaClient, Role, Status } from "../generated/prisma"

const prisma = new PrismaClient()

// Dados globais
// const dataEspecifica: Date = new Date(2025, 8, 25, 10, 30, 0)
// const dataEspecifica2: Date = new Date(2025, 9, 25, 10, 30, 0)

const vetUsers = (password: string): Prisma.UserCreateInput[] => [
	// Originais
	{
		name: "Dra. Ana Silva",
		email: "ana.vet@clinica.com",
		password: password,
		image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
		role: Role.VETERINARIO,
		veterinario: {
			create: { crmv: "12345-SP", especialidade: "Clínica Geral" },
		},
	},
	{
		name: "Dr. João Costa",
		email: "joao.vet@clinica.com",
		password: password,
		image:
			"https://images.pexels.com/photos/19431271/pexels-photo-19431271.jpeg",
		role: Role.VETERINARIO,
		veterinario: { create: { crmv: "67890-SP", especialidade: "Cirurgia" } },
	},
	// Novos (x14)
	{
		name: "Dr. Ricardo Mendes",
		email: "ricardo.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: {
			create: { crmv: "11223-SP", especialidade: "Dermatologia" },
		},
	},
	{
		name: "Dra. Fernanda Lima",
		email: "fernanda.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: {
			create: { crmv: "33445-SP", especialidade: "Oftalmologia" },
		},
	},
	{
		name: "Dr. Roberto Campos",
		email: "roberto.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: { create: { crmv: "55667-SP", especialidade: "Cardiologia" } },
	},
	{
		name: "Dra. Patrícia Rocha",
		email: "patricia.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: {
			create: { crmv: "77889-SP", especialidade: "Animais Exóticos" },
		},
	},
	{
		name: "Dr. Lucas Martins",
		email: "lucas.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: { create: { crmv: "99001-SP", especialidade: "Ortopedia" } },
	},
	{
		name: "Dra. Juliana Alves",
		email: "juliana.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: { create: { crmv: "10112-SP", especialidade: "Oncologia" } },
	},
	{
		name: "Dr. Marcos Paulo",
		email: "marcos.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: { create: { crmv: "13141-SP", especialidade: "Neurologia" } },
	},
	{
		name: "Dra. Beatriz Souza",
		email: "beatriz.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: {
			create: { crmv: "15161-SP", especialidade: "Fisioterapia" },
		},
	},
	{
		name: "Dr. Fernando Torres",
		email: "fernando.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: { create: { crmv: "17181-SP", especialidade: "Odontologia" } },
	},
	{
		name: "Dra. Camila Dias",
		email: "camila.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: { create: { crmv: "19202-SP", especialidade: "Nutrição" } },
	},
	{
		name: "Dr. Pedro Santos",
		email: "pedro.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: {
			create: { crmv: "21222-SP", especialidade: "Clínica Geral" },
		},
	},
	{
		name: "Dra. Larissa Gomes",
		email: "larissa.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: {
			create: { crmv: "23242-SP", especialidade: "Anestesiologia" },
		},
	},
	{
		name: "Dr. André Ribeiro",
		email: "andre.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: {
			create: { crmv: "25262-SP", especialidade: "Patologia Clínica" },
		},
	},
	{
		name: "Dra. Sofia Nunes",
		email: "sofia.vet@clinica.com",
		password: password,
		role: Role.VETERINARIO,
		veterinario: {
			create: { crmv: "27282-SP", especialidade: "Comportamento Animal" },
		},
	},
]

// 2. Dados de Usuários que são DONOS
const donoUsers = (password: string): Prisma.UserCreateInput[] => [
	// Originais
	{
		name: "Carlos Oliveira",
		email: "carlos.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11999999999", endereco: "Rua das Flores, 123" },
		},
	},
	{
		name: "Maria Souza",
		email: "maria.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11888888888", endereco: "Av. Paulista, 1000" },
		},
	},
	// Novos (x14)
	{
		name: "Pedro Alcantara",
		email: "pedro.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: { create: { telefone: "11977777777", endereco: "Rua Augusta, 500" } },
	},
	{
		name: "Julia Pereira",
		email: "julia.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11966666666", endereco: "Rua Oscar Freire, 200" },
		},
	},
	{
		name: "Marcos Vinicius",
		email: "marcos.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11955555555", endereco: "Av. Faria Lima, 1500" },
		},
	},
	{
		name: "Aline Ferreira",
		email: "aline.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11944444444", endereco: "Rua da Consolação, 800" },
		},
	},
	{
		name: "Bruno Silva",
		email: "bruno.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11933333333", endereco: "Av. Rebouças, 300" },
		},
	},
	{
		name: "Carla Dias",
		email: "carla.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11922222222", endereco: "Rua Haddock Lobo, 400" },
		},
	},
	{
		name: "Daniela Rocha",
		email: "daniela.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: { create: { telefone: "11911111111", endereco: "Av. Brasil, 100" } },
	},
	{
		name: "Eduardo Santos",
		email: "eduardo.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11900000000", endereco: "Rua Estados Unidos, 50" },
		},
	},
	{
		name: "Fabiana Lima",
		email: "fabiana.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: { create: { telefone: "11899999999", endereco: "Av. Europa, 600" } },
	},
	{
		name: "Gustavo Henrique",
		email: "gustavo.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11877777777", endereco: "Rua Colômbia, 700" },
		},
	},
	{
		name: "Helena Costa",
		email: "helena.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11866666666", endereco: "Av. 9 de Julho, 2000" },
		},
	},
	{
		name: "Igor Almeida",
		email: "igor.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11855555555", endereco: "Rua Pamplona, 900" },
		},
	},
	{
		name: "Joana Martins",
		email: "joana.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11844444444", endereco: "Av. Brigadeiro, 1200" },
		},
	},
	{
		name: "Kleber Souza",
		email: "kleber.dono@gmail.com",
		password: password,
		role: Role.DONO,
		dono: {
			create: { telefone: "11833333333", endereco: "Rua Bela Cintra, 1100" },
		},
	},
]

// 3. Dados dos Pets
const pets = (): Prisma.PetCreateInput[] => [
	// Originais
	{ nome: "Rex", especie: "Cachorro", raca: "Labrador" },
	{ nome: "Mimi", especie: "Gato", raca: "Siamês" },
	{
		nome: "Sonic",
		especie: "Ouriço",
		raca: "Azulis",
		cadastro: new Date("2024-01-01"),
	}, // Assumindo Date direto se var não existir
	// Novos
	{ nome: "Thor", especie: "Cachorro", raca: "Bulldog Francês" },
	{ nome: "Luna", especie: "Cachorro", raca: "Poodle" },
	{ nome: "Mel", especie: "Cachorro", raca: "Vira-lata" },
	{ nome: "Simba", especie: "Gato", raca: "Persa" },
	{ nome: "Bob", especie: "Cachorro", raca: "Golden Retriever" },
	{ nome: "Belinha", especie: "Cachorro", raca: "Yorkshire" },
	{ nome: "Paçoca", especie: "Hamster", raca: "Sírio" },
	{ nome: "Nemo", especie: "Peixe", raca: "Palhaço" },
	{ nome: "Lola", especie: "Cachorro", raca: "Beagle" },
	{ nome: "Tom", especie: "Gato", raca: "Maine Coon" },
	{ nome: "Chico", especie: "Ave", raca: "Calopsita" },
	{ nome: "Nina", especie: "Gato", raca: "Angorá" },
	{ nome: "Zeus", especie: "Cachorro", raca: "Rottweiler" },
	{ nome: "Amora", especie: "Cachorro", raca: "Shih Tzu" },
	{ nome: "Fred", especie: "Cachorro", raca: "Schnauzer" },
	{ nome: "Lua", especie: "Gato", raca: "SRD" },
	{ nome: "Bidu", especie: "Cachorro", raca: "Schnauzer" },
	{ nome: "Mingau", especie: "Gato", raca: "Siamês" },
	{ nome: "Pingo", especie: "Cachorro", raca: "Chihuahua" },
	{ nome: "Jujuba", especie: "Coelho", raca: "Cabeça de Leão" },
	{ nome: "Floquinho", especie: "Cachorro", raca: "Maltês" },
	{ nome: "Sasha", especie: "Cachorro", raca: "Husky Siberiano" },
	{ nome: "Garfield", especie: "Gato", raca: "Exótico" },
]

// 4. Dados de Produtos (com referência ao email do veterinário)
const produtos = () => [
	// Original
	{
		nome: "Vacina V10",
		preco: 50.0,
		estoque: 100,
		veterinarioEmail: "ana.vet@clinica.com",
	},
	// Novos
	{
		nome: "Vacina Antirrábica",
		preco: 45.0,
		estoque: 150,
		veterinarioEmail: "ana.vet@clinica.com",
	},
	{
		nome: "Bravecto 10-20kg",
		preco: 220.0,
		estoque: 50,
		veterinarioEmail: "ricardo.vet@clinica.com",
	},
	{
		nome: "Ração Royal Canin 10kg",
		preco: 350.0,
		estoque: 20,
		veterinarioEmail: "camila.vet@clinica.com",
	}, // Nutricionista
	{
		nome: "Consulta Dermatológica",
		preco: 150.0,
		estoque: 999,
		veterinarioEmail: "ricardo.vet@clinica.com",
	},
	{
		nome: "Limpeza de Tártaro",
		preco: 400.0,
		estoque: 999,
		veterinarioEmail: "fernando.vet@clinica.com",
	}, // Odontologista
	{
		nome: "Shampoo Hipoalergênico",
		preco: 85.0,
		estoque: 30,
		veterinarioEmail: "ricardo.vet@clinica.com",
	},
	{
		nome: "Coleira Antipulgas",
		preco: 120.0,
		estoque: 60,
		veterinarioEmail: "ana.vet@clinica.com",
	},
	{
		nome: "Vermífugo Plus",
		preco: 35.0,
		estoque: 200,
		veterinarioEmail: "joao.vet@clinica.com",
	},
	{
		nome: "Cirurgia de Castração",
		preco: 600.0,
		estoque: 999,
		veterinarioEmail: "joao.vet@clinica.com",
	},
	{
		nome: "Sessão de Fisioterapia",
		preco: 100.0,
		estoque: 999,
		veterinarioEmail: "beatriz.vet@clinica.com",
	},
]

// 5. Dados de Vínculos Pet-Dono
// Nota: Os nomes dos Pets e emails dos Donos devem existir nas listas acima
const vinculos = () => [
	// Originais
	{ donoEmail: "carlos.dono@gmail.com", petNome: "Rex", ativo: true },
	{ donoEmail: "maria.dono@gmail.com", petNome: "Mimi", ativo: true },
	// Novos (Distribuindo os novos pets para os novos donos)
	{ donoEmail: "carlos.dono@gmail.com", petNome: "Sonic", ativo: true }, // Carlos tem um ouriço também
	{ donoEmail: "pedro.dono@gmail.com", petNome: "Thor", ativo: true },
	{ donoEmail: "julia.dono@gmail.com", petNome: "Luna", ativo: true },
	{ donoEmail: "marcos.dono@gmail.com", petNome: "Mel", ativo: true },
	{ donoEmail: "aline.dono@gmail.com", petNome: "Simba", ativo: true },
	{ donoEmail: "bruno.dono@gmail.com", petNome: "Bob", ativo: true },
	{ donoEmail: "carla.dono@gmail.com", petNome: "Belinha", ativo: true },
	{ donoEmail: "daniela.dono@gmail.com", petNome: "Paçoca", ativo: true },
	{ donoEmail: "eduardo.dono@gmail.com", petNome: "Nemo", ativo: true },
	{ donoEmail: "fabiana.dono@gmail.com", petNome: "Lola", ativo: true },
	{ donoEmail: "gustavo.dono@gmail.com", petNome: "Tom", ativo: true },
	{ donoEmail: "helena.dono@gmail.com", petNome: "Chico", ativo: true },
	{ donoEmail: "igor.dono@gmail.com", petNome: "Nina", ativo: true },
	{ donoEmail: "joana.dono@gmail.com", petNome: "Zeus", ativo: true },
	{ donoEmail: "kleber.dono@gmail.com", petNome: "Amora", ativo: true },
	{ donoEmail: "pedro.dono@gmail.com", petNome: "Fred", ativo: true }, // Pedro tem 2
	{ donoEmail: "julia.dono@gmail.com", petNome: "Lua", ativo: true }, // Julia tem 2
	{ donoEmail: "marcos.dono@gmail.com", petNome: "Bidu", ativo: true },
	{ donoEmail: "aline.dono@gmail.com", petNome: "Mingau", ativo: true },
	{ donoEmail: "bruno.dono@gmail.com", petNome: "Pingo", ativo: true },
	{ donoEmail: "carla.dono@gmail.com", petNome: "Jujuba", ativo: true },
	{ donoEmail: "daniela.dono@gmail.com", petNome: "Floquinho", ativo: true },
	{ donoEmail: "eduardo.dono@gmail.com", petNome: "Sasha", ativo: true },
	{ donoEmail: "fabiana.dono@gmail.com", petNome: "Garfield", ativo: true },
]

// 6. Dados de Agendamentos
const agendamentos = () => [
	// Original (Index 0)
	{
		datahora: new Date(),
		status: Status.CONCLUIDO,
		donoEmail: "carlos.dono@gmail.com",
		petNome: "Rex",
		descricao: "Meu cachorro comeu nutela",
	},
	// Novos
	// Index 1
	{
		datahora: new Date(new Date().setDate(new Date().getDate() + 1)), // Amanhã
		status: Status.PENDENTE,
		donoEmail: "pedro.dono@gmail.com",
		petNome: "Thor",
		descricao: "Vacinação anual",
	},
	// Index 2
	{
		datahora: new Date(new Date().setDate(new Date().getDate() - 5)), // 5 dias atrás
		status: Status.CONCLUIDO,
		donoEmail: "julia.dono@gmail.com",
		petNome: "Luna",
		descricao: "Tosse seca e falta de apetite",
	},
	// Index 3
	{
		datahora: new Date(new Date().setDate(new Date().getDate() + 2)),
		status: Status.PENDENTE,
		donoEmail: "marcos.dono@gmail.com",
		petNome: "Mel",
		descricao: "Avaliação para castração",
	},
	// Index 4
	{
		datahora: new Date(new Date().setDate(new Date().getDate() - 10)),
		status: Status.CONCLUIDO,
		donoEmail: "aline.dono@gmail.com",
		petNome: "Simba",
		descricao: "Check-up geral",
	},
	// Index 5
	{
		datahora: new Date(new Date().setDate(new Date().getDate() + 7)),
		status: Status.PENDENTE,
		donoEmail: "bruno.dono@gmail.com",
		petNome: "Bob",
		descricao: "Dores na pata traseira",
	},
	// Index 6
	{
		datahora: new Date(),
		status: Status.PENDENTE,
		donoEmail: "carla.dono@gmail.com",
		petNome: "Belinha",
		descricao: "Banho e tosa (Estética)",
	},
	// Index 7
	{
		datahora: new Date(new Date().setDate(new Date().getDate() - 2)),
		status: Status.CONCLUIDO,
		donoEmail: "daniela.dono@gmail.com",
		petNome: "Paçoca",
		descricao: "Queda de pelos excessiva",
	},
	// Index 8
	{
		datahora: new Date(new Date().setDate(new Date().getDate() + 3)),
		status: Status.PENDENTE,
		donoEmail: "eduardo.dono@gmail.com",
		petNome: "Sasha",
		descricao: "Olhos vermelhos e secreção",
	},
]

// 7. Dados de Consultas (referenciando agendamento por índice do array acima)
const consultas = () => [
	// Original (Linkado ao Index 0)
	{
		diagnostico: "Tudo certo com o Rex. Foi apenas um susto.",
		agendamentoIndex: 0,
		veterinarioEmail: "ana.vet@clinica.com",
	},
	// Novos
	// Linkado ao Index 2 (Luna - Tosse)
	{
		diagnostico: "Gripe canina. Receitado antibiótico e repouso.",
		agendamentoIndex: 2,
		veterinarioEmail: "ana.vet@clinica.com",
	},
	// Linkado ao Index 4 (Simba - Checkup)
	{
		diagnostico: "Saúde perfeita. Exames de sangue normais.",
		agendamentoIndex: 4,
		veterinarioEmail: "pedro.vet@clinica.com",
	},
	// Linkado ao Index 7 (Paçoca - Queda de pelos)
	{
		diagnostico: "Dermatite fúngica. Receitado pomada antifúngica.",
		agendamentoIndex: 7,
		veterinarioEmail: "ricardo.vet@clinica.com", // Dermatologista
	},
	// Note: Agendamentos pendentes geralmente não têm consultas fechadas ainda,
	// mas adicionei diagnósticos para os que estão marcados como CONCLUIDO acima.
]

// 8. Dados de Fatos Financeiros
const fatosFinanceiros = () => [
	// Original
	{
		tipo: "RECEITA",
		valor: 50.0,
		descricao: "Venda Vacina V10",
		produtoNome: "Vacina V10",
	},
	// Novos
	{
		tipo: "RECEITA",
		valor: 220.0,
		descricao: "Venda Bravecto",
		produtoNome: "Bravecto 10-20kg",
	},
	{
		tipo: "RECEITA",
		valor: 150.0,
		descricao: "Consulta Dermatológica Paçoca",
		produtoNome: "Consulta Dermatológica",
	},
	{
		tipo: "RECEITA",
		valor: 350.0,
		descricao: "Venda Ração Royal Canin",
		produtoNome: "Ração Royal Canin 10kg",
	},
	{
		tipo: "RECEITA",
		valor: 85.0,
		descricao: "Venda Shampoo Hipoalergênico",
		produtoNome: "Shampoo Hipoalergênico",
	},
	{
		tipo: "RECEITA",
		valor: 600.0,
		descricao: "Cirurgia Castração Mel (Pagamento Antecipado)",
		produtoNome: "Cirurgia de Castração",
	},
	{
		tipo: "RECEITA",
		valor: 35.0,
		descricao: "Venda Vermífugo",
		produtoNome: "Vermífugo Plus",
	},
	{
		tipo: "DESPESA", // Exemplo de saída se sua lógica permitir, ou apenas receita de venda
		valor: -200.0,
		descricao: "Compra de insumos cirúrgicos",
		produtoNome: null, // Sem produto vinculado
	},
	{
		tipo: "RECEITA",
		valor: 120.0,
		descricao: "Venda Coleira Antipulgas",
		produtoNome: "Coleira Antipulgas",
	},
]

export async function main() {
	console.log("Iniciando a seed...")
	let qtddDados = 0

	// Configuração de senha
	const salt = genSaltSync(10)
	const hash = hashSync("wrl12345@@", salt)

	// --- CRIAÇÃO DE USUÁRIOS VETERINÁRIOS ---
	console.log("\n📋 Criando Veterinários...")
	const vetsData = vetUsers(hash)
	for (let i = 0; i < vetsData.length; i++) {
		const u = vetsData[i]
		const user = await prisma.user.upsert({
			where: { email: u.email },
			update: {},
			create: u,
		})

		if (!user) {
			console.error(`❌ Falha ao criar vet user ${u.name}`)
		} else {
			console.log(
				`✅ [${i + 1}/${vetsData.length}] User Vet ${user.name} verificado/criado`,
			)
			qtddDados++
		}
	}

	// --- CRIAÇÃO DE USUÁRIOS DONOS ---
	console.log("\n📋 Criando Donos...")
	const donosData = donoUsers(hash)
	for (let i = 0; i < donosData.length; i++) {
		const u = donosData[i]
		const user = await prisma.user.upsert({
			where: { email: u.email },
			update: {},
			create: u,
		})

		if (!user) {
			console.error(`❌ Falha ao criar dono user ${u.name}`)
		} else {
			console.log(
				`✅ [${i + 1}/${donosData.length}] User Dono ${user.name} verificado/criado`,
			)
			qtddDados++
		}
	}

	// --- CRIAÇÃO DE PETS ---
	console.log("\n📋 Criando Pets...")
	const petsData = pets()
	for (let i = 0; i < petsData.length; i++) {
		const p = petsData[i]
		const pet = await prisma.pet.create({
			data: p,
		})

		if (!pet) {
			console.error(`❌ Falha ao criar pet ${p.nome}`)
		} else {
			console.log(`✅ [${i + 1}/${petsData.length}] Pet ${pet.nome} criado`)
			qtddDados++
		}
	}

	// --- CRIAÇÃO DE PRODUTOS ---
	console.log("\n📋 Criando Produtos...")
	const produtosData = produtos()
	for (let i = 0; i < produtosData.length; i++) {
		const p = produtosData[i]
		const perfilVet = await prisma.veterinario.findFirst({
			where: { user: { email: p.veterinarioEmail } },
		})

		if (!perfilVet) {
			console.error(`❌ Veterinário ${p.veterinarioEmail} não encontrado`)
			continue
		}

		const produto = await prisma.produto.create({
			data: {
				nome: p.nome,
				preco: p.preco,
				estoque: p.estoque,
				veterinarioId: perfilVet.id,
			},
		})

		console.log(
			`✅ [${i + 1}/${produtosData.length}] Produto ${produto.nome} criado`,
		)
		qtddDados++
	}

	// --- CRIAÇÃO DE VÍNCULOS PERTENCE ---
	console.log("\n📋 Criando Vínculos Pet-Dono...")
	const vinculosData = vinculos()
	for (let i = 0; i < vinculosData.length; i++) {
		const v = vinculosData[i]
		const perfilDono = await prisma.dono.findFirst({
			where: { user: { email: v.donoEmail } },
		})
		const pet = await prisma.pet.findFirst({
			where: { nome: v.petNome },
		})

		if (!perfilDono || !pet) {
			console.error(`❌ Dono ${v.donoEmail} ou Pet ${v.petNome} não encontrado`)
			continue
		}

		// Verifica se já existe o vínculo
		const vinculoExistente = await prisma.pertence.findFirst({
			where: {
				donoId: perfilDono.id,
				petId: pet.id,
			},
		})

		if (!vinculoExistente) {
			await prisma.pertence.create({
				data: {
					donoId: perfilDono.id,
					petId: pet.id,
					ativo: v.ativo,
				},
			})
			console.log(
				`✅ [${i + 1}/${vinculosData.length}] Vínculo ${v.donoEmail} ↔ ${v.petNome} criado`,
			)
			qtddDados++
		} else {
			console.log(
				`⏭️  [${i + 1}/${vinculosData.length}] Vínculo ${v.donoEmail} ↔ ${v.petNome} já existe`,
			)
		}
	}

	// --- CRIAÇÃO DE AGENDAMENTOS ---
	console.log("\n📋 Criando Agendamentos...")
	const agendamentosData = agendamentos()
	const agendamentosCriados = []

	for (let i = 0; i < agendamentosData.length; i++) {
		const a = agendamentosData[i]
		const perfilDono = await prisma.dono.findFirst({
			where: { user: { email: a.donoEmail } },
		})
		const pet = await prisma.pet.findFirst({
			where: { nome: a.petNome },
		})

		if (!perfilDono || !pet) {
			console.error(`❌ Dono ${a.donoEmail} ou Pet ${a.petNome} não encontrado`)
			continue
		}

		const agendamento = await prisma.agendamento.create({
			data: {
				datahora: a.datahora,
				status: a.status,
				donoId: perfilDono.id,
				petId: pet.id,
				descricao: a.descricao,
			},
		})

		agendamentosCriados.push(agendamento)
		console.log(`✅ [${i + 1}/${agendamentosData.length}] Agendamento criado`)
		qtddDados++
	}

	// --- CRIAÇÃO DE CONSULTAS ---
	console.log("\n📋 Criando Consultas...")
	const consultasData = consultas()
	for (let i = 0; i < consultasData.length; i++) {
		const c = consultasData[i]
		const perfilVet = await prisma.veterinario.findFirst({
			where: { user: { email: c.veterinarioEmail } },
		})

		if (!perfilVet) {
			console.error(`❌ Veterinário ${c.veterinarioEmail} não encontrado`)
			continue
		}

		const agendamento = agendamentosCriados[c.agendamentoIndex]
		if (!agendamento) {
			console.error(
				`❌ Agendamento índice ${c.agendamentoIndex} não encontrado`,
			)
			continue
		}

		await prisma.consulta.create({
			data: {
				diagnostico: c.diagnostico,
				agendamentoId: agendamento.id,
				veterinarioId: perfilVet.id,
			},
		})

		console.log(`✅ [${i + 1}/${consultasData.length}] Consulta criada`)
		qtddDados++
	}

	// --- CRIAÇÃO DE FATOS FINANCEIROS ---
	console.log("\n📋 Criando Fatos Financeiros...")
	const fatosData = fatosFinanceiros()
	for (let i = 0; i < fatosData.length; i++) {
		const f = fatosData[i]

		if (!f.produtoNome) {
			console.error(`❌ Produto ${f.produtoNome} não encontrado`)
			continue
		}

		const produto = await prisma.produto.findFirst({
			where: { nome: f.produtoNome },
		})

		if (!produto) {
			console.error(`❌ Produto ${f.produtoNome} não encontrado`)
			continue
		}

		await prisma.fatosFinanceiros.create({
			data: {
				tipo: f.tipo,
				valor: f.valor,
				descricao: f.descricao,
				produtoId: produto.id,
			},
		})

		console.log(`✅ [${i + 1}/${fatosData.length}] Fato Financeiro criado`)
		qtddDados++
	}

	console.log(
		`\n🎉 Seed concluída com ${qtddDados} registros principais processados.`,
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
