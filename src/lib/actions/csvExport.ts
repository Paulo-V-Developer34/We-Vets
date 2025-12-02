// utils/csvExport.ts

export function convertToCSV<T extends Record<string, any>>(
	data: T[],
	headers?: string[],
): string {
	if (data.length === 0) return ""

	// Usar headers fornecidos ou extrair do primeiro objeto
	const keys = headers || Object.keys(data[0])

	// Função para escapar valores CSV
	const escapeCSV = (value: any): string => {
		if (value === null || value === undefined) return ""

		const stringValue = String(value)

		// Se contém vírgula, aspas ou quebra de linha, envolver em aspas
		if (
			stringValue.includes(",") ||
			stringValue.includes('"') ||
			stringValue.includes("\n")
		) {
			return `"${stringValue.replace(/"/g, '""')}"`
		}

		return stringValue
	}

	// Criar linha de cabeçalho
	const headerRow = keys.map(escapeCSV).join(",")

	// Criar linhas de dados
	const dataRows = data.map((row) =>
		keys.map((key) => escapeCSV(row[key])).join(","),
	)

	return [headerRow, ...dataRows].join("\n")
}
