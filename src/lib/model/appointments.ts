"use server"

import { FormMessage } from "../types/message";

export async function appointmentCreat(
  prevState: FormMessage,
  formData: FormData,
): Promise<FormMessage> {
    //code
    return {
        message: "hello world"
    }
}

export async function appointmentRead(
  prevState: FormMessage,
  formData: FormData,
): Promise<FormMessage> {
    //code
    return {
        message: "hello world"
    }
}

export async function appointmentUpdate(
  prevState: FormMessage,
  formData: FormData,
): Promise<FormMessage> {
    //code
    return {
        message: "hello world"
    }
}

export async function appointmentDelete(
  prevState: FormMessage,
  formData: FormData,
): Promise<FormMessage> {
    //code
    return {
        message: "hello world"
    }
}
