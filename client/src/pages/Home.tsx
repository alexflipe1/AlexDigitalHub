import { Link } from "wouter";
import { 
  User, 
  Settings, 
  Play, 
  Globe,
  Sliders 
} from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold sm:text-4xl gradient-heading">
          Bem-vindo ao meu site pessoal
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Um portal para acessar todos os meus serviços e projetos de forma organizada.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Seções do site */}
        <div className="space-y-6 col-span-1 lg:col-span-4">
          <h3 className="custom-buttons-title text-center">Seções do Site</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <Link href="/alex" className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 card-hover-effect">
              <div className="px-4 py-5 sm:p-6 text-center">
                <div className="bg-primary/10 inline-flex p-3 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Alex</h3>
                <p className="mt-1 text-sm text-gray-500">Acesse os serviços pessoais</p>
              </div>
            </Link>

            <Link href="/servico" className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 card-hover-effect">
              <div className="px-4 py-5 sm:p-6 text-center">
                <div className="bg-[#10B981]/10 inline-flex p-3 rounded-full">
                  <Settings className="h-6 w-6 text-[#10B981]" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Serviço</h3>
                <p className="mt-1 text-sm text-gray-500">Acesse os serviços disponíveis</p>
              </div>
            </Link>

            <Link href="/entretenimento" className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 card-hover-effect">
              <div className="px-4 py-5 sm:p-6 text-center">
                <div className="bg-[#8B5CF6]/10 inline-flex p-3 rounded-full">
                  <Play className="h-6 w-6 text-[#8B5CF6]" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Entretenimento</h3>
                <p className="mt-1 text-sm text-gray-500">Jogos e diversão</p>
              </div>
            </Link>

            <Link href="/sites" className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 card-hover-effect">
              <div className="px-4 py-5 sm:p-6 text-center">
                <div className="bg-blue-100 inline-flex p-3 rounded-full">
                  <Globe className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Sites</h3>
                <p className="mt-1 text-sm text-gray-500">Acesse meus sites</p>
              </div>
            </Link>
            
            <Link href="/admin" className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 card-hover-effect">
              <div className="px-4 py-5 sm:p-6 text-center">
                <div className="bg-orange-100 inline-flex p-3 rounded-full">
                  <Sliders className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Administração</h3>
                <p className="mt-1 text-sm text-gray-500">Gerenciar botões personalizados</p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
