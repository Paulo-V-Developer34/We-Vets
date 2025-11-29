export type Kpi = {
	receita: {
		valotTotal: number
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
	mes: string
	valor: number
}

export type Atendimento = {
	nome: string
	valor: number
}
