import { FatosFinanceiros } from "../../../generated/prisma"

export type FactWithoutDecimal = Omit<FatosFinanceiros, "valor"> & {
	valor: number
}
