import GameSnake from "@/components/GameSnake";
import GameMemory from "@/components/GameMemory";
import CustomButtonsList from "@/components/CustomButtonsList";

export default function Entretenimento() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold sm:text-4xl gradient-heading">
          Entretenimento
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Jogos simples para passar o tempo
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 card-hover-effect">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </span>
              Snake Game
            </h3>
            <GameSnake />
            <div className="mt-4 text-sm text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Use as setas do teclado para controlar a cobra. Coma as maçãs para crescer.
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 card-hover-effect">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="bg-[#8B5CF6]/10 p-1.5 rounded-full mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M9 10a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9Z"></path></svg>
              </span>
              Jogo da Memória
            </h3>
            <GameMemory />
            <div className="mt-4 text-sm text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8B5CF6] mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Clique nas cartas para virá-las. Encontre os pares correspondentes.
            </div>
          </div>
        </div>
      </div>
      
      {/* Botões personalizados */}
      <div className="mt-14">
        <h3 className="custom-buttons-title">Botões Personalizados</h3>
        <CustomButtonsList pageType="entretenimento" />
      </div>
    </div>
  );
}
