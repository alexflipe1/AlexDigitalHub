import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Card = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function GameMemory() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  
  const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍍', '🥝'];

  const createCards = () => {
    // Create pairs of cards with the symbols
    const cardSymbols = [...symbols, ...symbols];
    
    // Shuffle cards
    for (let i = cardSymbols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardSymbols[i], cardSymbols[j]] = [cardSymbols[j], cardSymbols[i]];
    }
    
    // Create card objects
    const newCards = cardSymbols.map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
    
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setIsChecking(false);
  };

  const flipCard = (cardId: number) => {
    // Prevent flipping if already checking or card is already flipped or matched
    if (
      isChecking ||
      flippedCards.length >= 2 ||
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }
    
    // Flip the card
    setCards(prev => 
      prev.map(card => 
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );
    
    setFlippedCards(prev => [...prev, cardId]);
  };

  const checkForMatch = () => {
    if (flippedCards.length !== 2) return;
    
    setIsChecking(true);
    
    const [firstCardId, secondCardId] = flippedCards;
    const firstCard = cards[firstCardId];
    const secondCard = cards[secondCardId];
    
    if (firstCard.symbol === secondCard.symbol) {
      // Match found
      setCards(prev => 
        prev.map(card => 
          card.id === firstCardId || card.id === secondCardId
            ? { ...card, isMatched: true }
            : card
        )
      );
      
      setMatchedPairs(prev => prev + 1);
      setFlippedCards([]);
      setIsChecking(false);
      
      // Check if game is complete
      if (matchedPairs + 1 === symbols.length) {
        setTimeout(() => {
          alert('Parabéns! Você venceu!');
        }, 500);
      }
    } else {
      // No match
      setTimeout(() => {
        setCards(prev => 
          prev.map(card => 
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isFlipped: false }
              : card
          )
        );
        
        setFlippedCards([]);
        setIsChecking(false);
      }, 800);
    }
  };

  useEffect(() => {
    createCards();
  }, []);

  useEffect(() => {
    checkForMatch();
  }, [flippedCards.length === 2 ? flippedCards : null]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 h-64">
        {cards.map(card => (
          <div
            key={card.id}
            className={`
              flex items-center justify-center rounded-md cursor-pointer h-14
              ${card.isFlipped || card.isMatched ? 'bg-white' : 'bg-gray-200'}
              ${card.isMatched ? 'bg-green-100' : ''}
              transition-colors duration-300
            `}
            onClick={() => flipCard(card.id)}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="text-2xl">{card.symbol}</span>
            )}
          </div>
        ))}
      </div>
      <Button 
        onClick={createCards} 
        className="mt-4 bg-[#10B981] hover:bg-[#10B981]/80"
      >
        Novo Jogo
      </Button>
    </div>
  );
}
