import ServiceCard from "@/components/ServiceCard";
import { Server, Home as HomeIcon, Database, Monitor } from "lucide-react";
import CustomButtonsList from "@/components/CustomButtonsList";

export default function Alex() {
  const alexServices = [
    {
      title: "Proxmox",
      description: "Gerenciamento de máquinas virtuais",
      icon: <Server className="h-6 w-6 text-primary" />,
      href: "https://proxmox.alexflipe.ie",
      iconBgClass: "bg-primary/10"
    },
    {
      title: "Home Assistant",
      description: "Automação residencial",
      icon: <HomeIcon className="h-6 w-6 text-[#10B981]" />,
      href: "https://casa.alexflipe.ie",
      iconBgClass: "bg-[#10B981]/10"
    },
    {
      title: "Armazenamento",
      description: "Gerenciamento de arquivos",
      icon: <Database className="h-6 w-6 text-[#8B5CF6]" />,
      href: "https://armazenamento.alexflipe.ie",
      iconBgClass: "bg-[#8B5CF6]/10"
    },
    {
      title: "PC Principal",
      description: "Acesso ao computador principal",
      icon: <Monitor className="h-6 w-6 text-blue-500" />,
      href: "https://proxmox.alexflipe.ie/?console=kvm&novnc=1&vmid=108&vmname=Principal&node=alexflipe&resize=off&cmd=",
      iconBgClass: "bg-blue-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Alex
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Serviços e ferramentas pessoais
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {alexServices.map((service, index) => (
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
        <CustomButtonsList pageType="alex" />
      </div>
    </div>
  );
}
