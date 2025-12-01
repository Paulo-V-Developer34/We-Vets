"use server"

import { FormMessage } from "../types/message"

export async function userCreat(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	// const user: User = {

	// }

	return {
		message: "hello world",
		timestamp: Date.now(),
	}
}

export async function userRead(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//code
	return {
		message: "hello world",
		timestamp: Date.now(),
	}
}

export async function userUpdate(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//code
	return {
		message: "hello world",
		timestamp: Date.now(),
	}
}

export async function userDelete(
	prevState: FormMessage,
	formData: FormData,
): Promise<FormMessage> {
	//code
	return {
		message: "hello world",
		timestamp: Date.now(),
	}
}
