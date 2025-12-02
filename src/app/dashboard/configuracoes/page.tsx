import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, User, Bell, Building } from "lucide-react"
import { deletarBanco } from "@/lib/model/data"
import { toast } from "sonner"
import BotaoDaDestruicao from "@/components/dashboard/configuracoes/BotaoDaDestruicao"

export default function ConfiguracoesPage() {
	return (
		<div className="flex-1 space-y-6 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-3xl font-bold tracking-tight text-slate-900">
						Configurações
					</h2>
					<p className="text-muted-foreground">
						Gerencie as preferências da clínica e do sistema.
					</p>
				</div>
			</div>

			<Tabs defaultValue="clinica" className="space-y-4">
				<TabsList className="bg-slate-100">
					<TabsTrigger
						value="clinica"
						className="data-[state=active]:bg-white data-[state=active]:text-emerald-700"
					>
						<Building className="mr-2 h-4 w-4" /> Dados da Clínica
					</TabsTrigger>
					<TabsTrigger
						value="notificacoes"
						className="data-[state=active]:bg-white data-[state=active]:text-emerald-700"
					>
						<Bell className="mr-2 h-4 w-4" /> Notificações
					</TabsTrigger>
					<TabsTrigger
						value="perfil"
						className="data-[state=active]:bg-white data-[state=active]:text-emerald-700"
					>
						<User className="mr-2 h-4 w-4" /> Meu Perfil
					</TabsTrigger>
				</TabsList>

				{/* Tab: Dados da Clínica */}
				<TabsContent value="clinica">
					<Card>
						<CardHeader>
							<CardTitle>Informações Gerais</CardTitle>
							<CardDescription>
								Atualize o nome, endereço e contatos da unidade veterinária.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="nome-clinica">Nome da Clínica</Label>
								<Input
									id="nome-clinica"
									defaultValue="WeVet - Clínica Central"
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="telefone">Telefone Comercial</Label>
									<Input id="telefone" defaultValue="(11) 98765-4321" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email de Contato</Label>
									<Input id="email" defaultValue="contato@wevet.com.br" />
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="endereco">Endereço Completo</Label>
								<Input
									id="endereco"
									defaultValue="Rua das Acácias, 123 - Jardim Vet"
								/>
							</div>
						</CardContent>
						<CardFooter className="gap-8 border-t px-6 py-4 bg-slate-50 rounded-b-xl flex justify-end">
							<Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
								<Save className="mr-2 h-4 w-4" /> Salvar Alterações
							</Button>
							<BotaoDaDestruicao />
						</CardFooter>
					</Card>
				</TabsContent>

				{/* Tab: Notificações */}
				<TabsContent value="notificacoes">
					<Card>
						<CardHeader>
							<CardTitle>Preferências de Alerta</CardTitle>
							<CardDescription>
								Escolha como você deseja ser notificado sobre as atividades.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between space-x-2">
								<div className="flex flex-col space-y-1">
									<Label className="text-base font-medium">
										Lembretes de Consulta
									</Label>
									<span className="text-sm text-muted-foreground">
										Receber resumo diário da agenda por email.
									</span>
								</div>
								<Switch
									className="data-[state=checked]:bg-emerald-600"
									defaultChecked
								/>
							</div>
							<Separator />
							<div className="flex items-center justify-between space-x-2">
								<div className="flex flex-col space-y-1">
									<Label className="text-base font-medium">
										Novos Clientes
									</Label>
									<span className="text-sm text-muted-foreground">
										Notificar quando um novo cliente for cadastrado.
									</span>
								</div>
								<Switch
									className="data-[state=checked]:bg-emerald-600"
									defaultChecked
								/>
							</div>
							<Separator />
							<div className="flex items-center justify-between space-x-2">
								<div className="flex flex-col space-y-1">
									<Label className="text-base font-medium">Estoque Baixo</Label>
									<span className="text-sm text-muted-foreground">
										Alerta quando medicamentos estiverem acabando.
									</span>
								</div>
								<Switch className="data-[state=checked]:bg-emerald-600" />
							</div>
						</CardContent>
						<CardFooter className="border-t px-6 py-4 bg-slate-50 rounded-b-xl flex justify-end">
							<Button variant="outline" className="mr-2">
								Cancelar
							</Button>
							<Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
								Salvar Preferências
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
