import { PrismaClient, Prisma } from "../generated/prisma";
import { genSaltSync, hashSync } from "bcryptjs";

const prisma = new PrismaClient();

const users = (password: string): Prisma.UserCreateInput[] => [
	{
		name: "Alice",
		email: "alice@prisma.io",
		password: password,
	},
	{
		name: "Paulo",
		email: "paulo@prisma.io",
		password: password,
	},
];

export async function main() {
	console.log("Iniciando a seed");
	let qtddDados = 0;
	const salt = genSaltSync(10);
	const hash = hashSync("wrl123@@", salt);
	const userData = users(hash);

	for (const u of userData) {
		const user = await prisma.user.create({ data: u });

		if (!user) {
			console.error(`Falha ao tentar criar usuario ${u.name}`);
		} else {
			console.log(`Usuario ${user.name} criado com sucesso`);
			qtddDados++;
		}
	}

	console.log(`Seed concluída com ${qtddDados} dados`);
}

main();
