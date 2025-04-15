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
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Snake Game</h3>
            <GameSnake />
            <div className="mt-4 text-sm text-gray-600">
              Use as setas do teclado para controlar a cobra. Coma as maçãs para crescer.
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Jogo da Memória</h3>
            <GameMemory />
            <div className="mt-4 text-sm text-gray-600">
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
