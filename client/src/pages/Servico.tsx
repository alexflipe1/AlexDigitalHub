import ServiceCard from "@/components/ServiceCard";
import { Server, Database, Code, ClipboardList, Eye } from "lucide-react";
import CustomButtonsList from "@/components/CustomButtonsList";

export default function Servico() {
  const services = [
    {
      title: "Proxmox",
      description: "Gerenciamento de máquinas virtuais",
      icon: <Server className="h-6 w-6 text-primary" />,
      href: "https://proxmox.alexflipe.ie",
      iconBgClass: "bg-primary/10"
    },
    {
      title: "Armazenamento",
      description: "Gerenciamento de arquivos",
      icon: <Database className="h-6 w-6 text-[#10B981]" />,
      href: "https://armazenamento.alexflipe.ie",
      iconBgClass: "bg-[#10B981]/10"
    },
    {
      title: "Meu Site Arquivos",
      description: "Editor do site",
      icon: <Code className="h-6 w-6 text-[#8B5CF6]" />,
      href: "https://siteeditor.alexflipe.ie",
      iconBgClass: "bg-[#8B5CF6]/10"
    },
    {
      title: "Site Warehouse",
      description: "Sistema de gestão",
      icon: <ClipboardList className="h-6 w-6 text-blue-500" />,
      href: "https://checklistsfile.alexflipe.ie/login?redirect=/files/",
      iconBgClass: "bg-blue-100"
    },
    {
      title: "Detecção de Hi-Vis",
      description: "Sistema de detecção",
      icon: <Eye className="h-6 w-6 text-yellow-500" />,
      href: "https://hivis.alexflipe.ie/",
      iconBgClass: "bg-yellow-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Serviços
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Acesse os serviços disponíveis
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            href={service.href}
            iconBgClass={service.iconBgClass}
          />
        ))}
      </div>
      
      {/* Botões personalizados */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Botões Personalizados</h3>
        <CustomButtonsList pageType="servico" />
      </div>
    </div>
  );
}
