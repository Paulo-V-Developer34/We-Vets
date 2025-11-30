export type Kpi = {
	receita: {
		valorTotal: number
		media: number
	}
	agendamento: {
		feitos: number
		aFazer: number
	}
	produtos: {
		estoque: number
		faltando: number
	}
	pets: {
		quantidade: number
		ultimoCadastrado: Date
	}
}

export type Receita = {
	name: string
	valor: number
}

export type Atendimento = {
	name: string
	valor: number
}

export type ChartsHomeType = {
	kpi: Kpi
	services: Atendimento[]
	revenue: Receita[]
}
