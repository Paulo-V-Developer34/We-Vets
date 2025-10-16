import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		serverActions: {
			allowedOrigins: [
				"localhost:3000",
				"*.app.github.dev", // Permite todos os domínios do GitHub Codespaces
			],
		},
	},
}

export default nextConfig
