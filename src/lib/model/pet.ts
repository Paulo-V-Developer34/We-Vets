"use server"

import { FormMessage } from "../types/message"

export async function petCreat(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	return {
		message: "hello world",
	}
}

export async function petRead(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//code
	return {
		message: "hello world",
	}
}

export async function petUpdate(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//code
	return {
		message: "hello world",
	}
}

export async function petDelete(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//code
	return {
		message: "hello world",
	}
}
