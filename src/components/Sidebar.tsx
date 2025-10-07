// app/components/Sidebar.tsx
import Link from 'next/link';
import { Home, Settings, User, BarChart2 } from 'lucide-react';

export function Sidebar() {
  return (
    // 'aside' é uma tag semântica para conteúdo lateral
    <aside className="
      hidden md:flex flex-col w-64 h-screen px-4 py-8 
      bg-gray-800 text-white border-r border-gray-700
      sticky top-0
    ">
      {/* Logo ou Nome do App */}
      <h2 className="text-2xl font-semibold mb-8">Meu App</h2>

      {/* Container da Navegação */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link href="/home" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
              <Home size={20} />
              <span>Início</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
              <BarChart2 size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/profile" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
              <User size={20} />
              <span>Perfil</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-700">
              <Settings size={20} />
              <span>Configurações</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Seção do Rodapé da Sidebar (opcional) */}
      <div className="mt-auto">
        <p className="text-xs text-gray-400">© 2025 Meu App</p>
      </div>
    </aside>
  );
}