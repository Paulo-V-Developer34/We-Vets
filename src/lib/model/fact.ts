"use server"

import { FormMessage } from "../types/message";

export async function factCreat(
  prevState: FormMessage,
  formData: FormData,
): Promise<FormMessage> {
    //code
    return {
        message: "hello world"
    }
}

export async function factRead(
  prevState: FormMessage,
  formData: FormData,
): Promise<FormMessage> {
    //code
    return {
        message: "hello world"
    }
}

export async function factUpdate(
  prevState: FormMessage,
  formData: FormData,
): Promise<FormMessage> {
    //code
    return {
        message: "hello world"
    }
}

export async function factDelete(
  prevState: FormMessage,
  formData: FormData,
): Promise<FormMessage> {
    //code
    return {
        message: "hello world"
    }
}
