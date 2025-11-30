"use server"

import { z } from "zod"
import { clientFormSchema } from "@/lib/types/schema/client-schema"

export type FormState = {
	success: boolean
	message: string
	errors?: {
		[K in keyof z.infer<typeof clientFormSchema>]?: string[]
	}
	fields?: Record<string, string>
	timestamp: number // <--- NOVO CAMPO
}

export async function saveClientAction(
	prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	const rawData = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		status: formData.get("status") as string,
		ltv: formData.get("ltv") as string,
	}

	const validatedFields = clientFormSchema.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			success: false,
			message: "Erro na validação dos campos.",
			errors: validatedFields.error.flatten().fieldErrors as any,
			fields: rawData,
			timestamp: Date.now(), // <--- Gere um timestamp
		}
	}

	// Simulando DB delay
	await new Promise((resolve) => setTimeout(resolve, 1000))

	return {
		success: true,
		message: "Cliente salvo com sucesso!",
		errors: {},
		fields: {},
		timestamp: Date.now(), // <--- Gere um timestamp
	}
}
