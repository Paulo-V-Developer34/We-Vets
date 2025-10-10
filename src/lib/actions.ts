"use server"

import { AuthError } from "next-auth";
import { signIn } from "./auth/auth";
import { FormMessage } from "./types/message";

export async function login(
  prevState: FormMessage,
  formData: FormData,
): Promise<FormMessage> {
  try {
    await signIn('credentials', formData);

    //obs: o código abaixo nunca retornará, pois o signIn redireciona o usuário antes de chegar aqui
    return {
        message: "Login feito com sucesso"
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: "Credenciais inválidas",
            errors: {
                err: ["Credenciais inválidas"]
            }
          };
        default:
          return {
            message: "Falha no sistema",
            errors: {
                err: ["Falha no sistema"]
            }
          };
      }
    }
    throw error;
  }
}