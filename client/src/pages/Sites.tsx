import CustomButtonsList from "@/components/CustomButtonsList";

export default function Sites() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold sm:text-4xl gradient-heading">
          Sites
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Meus websites
        </p>
      </div>
      
      {/* Todos os botões são personalizados e gerenciados pelo admin */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
        <CustomButtonsList pageType="sites" />
      </div>
    </div>
  );
}
