"use server"

import { z, ZodError } from "zod"
import prisma from "../prisma" // Ajuste o caminho conforme necessário
import { FormMessage } from "../types/message"
import { revalidatePath } from "next/cache"
import { Pet } from "../../../generated/prisma" // Import do tipo gerado pelo Prisma

// --- DEFINIÇÃO DO SCHEMA (Sugestão para validar os dados do Pet) ---
const petSchema = z.object({
	nome: z.string().min(1, "O nome do pet é obrigatório"),
	especie: z.string().min(1, "A espécie é obrigatória"),
	raca: z.string().optional().nullable(),
	nascimento: z.date().optional().nullable(),
	donoId: z.string().uuid("ID do dono inválido").optional().nullable(), // Opcional: Para criar o vínculo imediatamente
})

export type PetType = z.infer<typeof petSchema>

export async function petCreate(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	// Tratamento da data de nascimento (vem como string do form)
	const nascimentoRaw = formData.get("nascimento") as string | null
	const nascimento = nascimentoRaw ? new Date(nascimentoRaw) : null

	// Preparação do objeto
	const rawPet = {
		nome: formData.get("nome") as string | null,
		especie: formData.get("especie") as string | null,
		raca: formData.get("raca") as string | null,
		nascimento: nascimento,
		donoId: formData.get("donoId") as string | null, // Se você passar o ID do dono no form
	}

	try {
		const petValido = petSchema.parse(rawPet)

		// Criando o Pet
		// Se houver um donoId, criamos o relacionamento na tabela "Pertence"
		const pet = await prisma.pet.create({
			data: {
				nome: petValido.nome,
				especie: petValido.especie,
				raca: petValido.raca,
				nascimento: petValido.nascimento,
				// Se o ID do dono for fornecido, cria a relação na tabela Pertence
				pertence: petValido.donoId
					? {
							create: {
								donoId: petValido.donoId,
							},
						}
					: undefined,
			},
		})

		if (!pet) {
			throw new Error("Não foi possível criar o pet")
		}

		revalidatePath("/dashboard/pets")
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				message: "Um erro ocorreu",
				errors: {
					err: [error.issues[0].message],
				},
				timestamp: Date.now(),
			}
		}

		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Erro no servidor ao criar pet"],
			},
			timestamp: Date.now(),
		}
	}

	return {
		message: "Pet cadastrado com sucesso",
		timestamp: Date.now(),
	}
}

export async function petRead(): Promise<Pet[]> {
	const pets = await prisma.pet.findMany({
		orderBy: {
			cadastro: "desc",
		},
		include: {
			pertence: {
				include: {
					dono: {
						include: {
							user: true,
						},
					},
				},
			},
		},
	})

	if (!pets) {
		throw new Error("Não foi possível obter os dados dos pets")
	}

	return pets
}

export async function petReadOne(
	prevState: FormMessage,
	formData: FormData,
): Promise<Pet> {
	const id = formData.get("id") as string | null

	if (!id) {
		throw new Error("Não foi possível obter o id do pet")
	}

	const pet = await prisma.pet.findUnique({
		where: {
			id: id,
		},
		include: {
			pertence: {
				include: {
					dono: true,
				},
			},
			agendamentos: true,
		},
	})

	if (!pet) {
		throw new Error("Não foi possível encontrar o pet")
	}

	return pet
}

export async function petUpdate(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	const petID = formData.get("id") as string | null

	// Tratamento da data
	const nascimentoRaw = formData.get("nascimento") as string | null
	const nascimento = nascimentoRaw ? new Date(nascimentoRaw) : null

	const rawPet = {
		nome: formData.get("nome") as string | null,
		especie: formData.get("especie") as string | null,
		raca: formData.get("raca") as string | null,
		nascimento: nascimento,
	}

	try {
		if (!petID) {
			throw new Error("ID do Pet não informado")
		}

		// Reutilizamos o schema, mas sem exigir o donoId para update simples
		const petUpdateSchema = petSchema.omit({ donoId: true })
		const petValido = petUpdateSchema.parse(rawPet)

		const petAtualizado = await prisma.pet.update({
			where: {
				id: petID,
			},
			data: {
				nome: petValido.nome,
				especie: petValido.especie,
				raca: petValido.raca,
				nascimento: petValido.nascimento,
			},
		})

		if (!petAtualizado) {
			throw new Error("Não foi possível atualizar o pet")
		}

		revalidatePath("/dashboard/pets")
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				message: "Dados inválidos",
				errors: {
					err: [error.issues[0].message],
				},
				timestamp: Date.now(),
			}
		}

		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["Erro no servidor ao atualizar pet"],
			},
			timestamp: Date.now(),
		}
	}

	return {
		message: "Pet atualizado com sucesso",
		timestamp: Date.now(),
	}
}

export async function petDelete(id: string): Promise<FormMessage> {
	if (!id) {
		return {
			message: "Um erro ocorreu",
			errors: {
				err: ["ID do pet não fornecido"],
			},
			timestamp: Date.now(),
		}
	}

	try {
		const petDeletado = await prisma.pet.delete({
			where: {
				id: id,
			},
		})

		if (!petDeletado) {
			throw new Error("Falha ao deletar")
		}

		revalidatePath("/dashboard/pets")

		return {
			message: "Pet deletado com sucesso",
			timestamp: Date.now(),
		}
	} catch (error) {
		return {
			message: "Erro ao deletar",
			errors: {
				err: [
					"Não foi possível deletar o pet. Verifique se existem agendamentos ativos.",
				],
			},
			timestamp: Date.now(),
		}
	}
}
