import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  iconBgClass?: string;
  style?: React.CSSProperties;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  iconBgClass = "bg-primary/10",
  style
}: ServiceCardProps) {
  return (
    <a
      href={href}
      className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 card-hover-effect"
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${iconBgClass} rounded-md p-3`} style={style}>
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
