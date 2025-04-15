import ServiceCard from "@/components/ServiceCard";
import { ClipboardList, Code } from "lucide-react";
import CustomButtonsList from "@/components/CustomButtonsList";

export default function Sites() {
  const sites = [
    {
      title: "Warehouse",
      description: "Sistema de gestão de estoque",
      icon: <ClipboardList className="h-6 w-6 text-primary" />,
      href: "https://checklistsfile.alexflipe.ie",
      iconBgClass: "bg-primary/10"
    },
    {
      title: "Meu Site",
      description: "Site pessoal",
      icon: <Code className="h-6 w-6 text-[#10B981]" />,
      href: "https://siteeditor.alexflipe.ie",
      iconBgClass: "bg-[#10B981]/10"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Sites
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Meus websites
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
        {sites.map((site, index) => (
          <ServiceCard
            key={index}
            title={site.title}
            description={site.description}
            icon={site.icon}
            href={site.href}
            iconBgClass={site.iconBgClass}
          />
        ))}
      </div>
      
      {/* Botões personalizados */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Botões Personalizados</h3>
        <CustomButtonsList pageType="sites" />
      </div>
    </div>
  );
}
