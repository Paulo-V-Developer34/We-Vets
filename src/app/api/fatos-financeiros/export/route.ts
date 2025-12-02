// app/api/fatos-financeiros/export/route.ts
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { convertToCSV } from "@/lib/actions/csvExport"

export async function GET() {
	try {
		const fatosFinanceiros = await prisma.fatosFinanceiros.findMany({
			include: {
				agendamento: true,
				produto: true,
			},
			orderBy: {
				data: "desc",
			},
		})

		const dadosFormatados = fatosFinanceiros.map((fato) => ({
			ID: fato.id,
			"Tipo Patrimonial": fato.tipoPatrimonial,
			"Tipo Resultado": fato.tipoResultado,
			Valor: fato.valor.toString(),
			Descrição: fato.descricao,
			Data: fato.data.toISOString().split("T")[0],
			Parcelas: fato.parcelas,
			Operação: fato.operacao,
			"Agendamento ID": fato.agendamentoId || "",
			"Produto ID": fato.produtoId || "",
		}))

		const csv = convertToCSV(dadosFormatados)

		// Adicionar BOM UTF-8 para melhor compatibilidade com Excel
		const csvWithBOM = "\ufeff" + csv

		return new NextResponse(csvWithBOM, {
			status: 200,
			headers: {
				"Content-Type": "text/csv; charset=utf-8",
				"Content-Disposition": `attachment; filename="fatos-financeiros-${new Date().toISOString().split("T")[0]}.csv"`,
			},
		})
	} catch (error) {
		console.error("Erro ao exportar CSV:", error)
		return NextResponse.json(
			{ error: "Erro ao exportar dados" },
			{ status: 500 },
		)
	}
}
