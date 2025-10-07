import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    
    const formTipo = formData.get("tipo");
    const formValue = formData.get("value");
    // 1. Verifique se o valor existe e é do tipo string
    if (typeof formValue !== 'string' || formValue === '') {
    // Trate o erro: retorne uma mensagem, lance uma exceção, etc.
    // Exemplo:
    throw new Error("O campo 'formValue' é inválido ou não foi preenchido.");
    }

    // 2. Converta a string para um número (use parseFloat para aceitar decimais)
    const value = parseFloat(formValue);

    // 3. Verifique se a conversão resultou em um número válido (e não NaN)
    if (isNaN(value)) {
    // Trate o erro caso a string não seja um número válido (ex: "abc")
    throw new Error("O valor fornecido não é um número válido.");
    }

    if (typeof formTipo !== 'string' || formTipo === '') {
    // Trate o erro: retorne uma mensagem, lance uma exceção, etc.
    // Exemplo:
    throw new Error("O campo 'formTipo' é inválido ou não foi preenchido.");
    }

    // 2. Converta a string para um número (use parseFloat para aceitar decimais)
    const tipo = parseFloat(formTipo);

    // 3. Verifique se a conversão resultou em um número válido (e não NaN)
    if (isNaN(tipo)) {
    // Trate o erro caso a string não seja um número válido (ex: "abc")
    throw new Error("O valor fornecido não é um número válido.");
    }




    await prisma.fatos.create({
      data: {
        title,
        tipo,
        value,
        authorId: 1,
      },
    });

    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <Form action={createPost} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="value" className="block text-lg mb-2">
            Preço
          </label>
          <input
            type="number"
            id="value"
            name="value"
            placeholder="Enter your post title"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="tipo" className="block text-lg mb-2">
            Tipo
          </label>
          <input
            type="number"
            id="tipo"
            name="tipo"
            placeholder="Enter your post title"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Create Post
        </button>
      </Form>
    </div>
  );
}