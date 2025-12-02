import {
	ClassPatrimonio,
	ClassResultado,
	Produto,
} from "../../../generated/prisma"

export type ProductWithID = Omit<Produto, "preco"> & {
	preco: number
	id: string
	tipoPatrimonial: ClassPatrimonio
	tipoResultado: ClassResultado
}

// export type ProductWithoutDecimal = Omit<ProductWithID, "preco"> & {

// }
