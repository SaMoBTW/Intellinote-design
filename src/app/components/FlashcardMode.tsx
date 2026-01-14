import { useState } from 'react';
import { ArrowLeft, Check, X, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';

interface FlashcardModeProps {
  onBack: () => void;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    question: 'What is the primary function of the cell membrane?',
    answer: 'The cell membrane regulates the transport of materials entering and exiting the cell, acting as a selective barrier between the cell\'s interior and exterior environment.',
  },
  {
    id: '2',
    question: 'Define photosynthesis.',
    answer: 'Photosynthesis is the process by which plants convert light energy into chemical energy stored in glucose, using carbon dioxide and water.',
  },
  {
    id: '3',
    question: 'What does DNA stand for?',
    answer: 'DNA stands for Deoxyribonucleic Acid, a molecule that carries genetic instructions for life.',
  },
  {
    id: '4',
    question: 'What are organelles?',
    answer: 'Organelles are specialized structures within cells that perform specific functions, such as mitochondria, nucleus, and ribosomes.',
  },
  {
    id: '5',
    question: 'What is cellular respiration?',
    answer: 'Cellular respiration is the process by which cells convert glucose and oxygen into energy (ATP), carbon dioxide, and water.',
  },
];

export function FlashcardMode({ onBack }: FlashcardModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [studyAgainCards, setStudyAgainCards] = useState<string[]>([]);

  const currentCard = mockFlashcards[currentIndex];
  const progress = ((currentIndex + 1) / mockFlashcards.length) * 100;
  const isLastCard = currentIndex === mockFlashcards.length - 1;

  const handleKnow = () => {
    setKnownCards([...knownCards, currentCard.id]);
    nextCard();
  };

  const handleStudyAgain = () => {
    setStudyAgainCards([...studyAgainCards, currentCard.id]);
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentIndex < mockFlashcards.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setStudyAgainCards([]);
  };

  const isComplete = currentIndex === mockFlashcards.length - 1 && (knownCards.includes(currentCard.id) || studyAgainCards.includes(currentCard.id));

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b border-border bg-card/80 backdrop-blur-sm px-4 lg:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Study
          </Button>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} / {mockFlashcards.length}
            </div>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline">Reset</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 lg:px-6 py-4 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {!isComplete ? (
            <div className="space-y-8">
              {/* Flashcard */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="perspective-1000"
              >
                <motion.div
                  className="relative h-96 cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of Card */}
                  <Card
                    className="absolute inset-0 flex flex-col items-center justify-center p-12 shadow-2xl bg-gradient-to-br from-card to-card/80"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="w-5 h-5 text-secondary" />
                      <span className="text-sm text-muted-foreground">Question</span>
                    </div>
                    <h2 className="text-center mb-8">{currentCard.question}</h2>
                    <p className="text-sm text-muted-foreground">Click to reveal answer</p>
                  </Card>

                  {/* Back of Card */}
                  <Card
                    className="absolute inset-0 flex flex-col items-center justify-center p-12 shadow-2xl bg-gradient-to-br from-secondary/10 to-primary/10"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Answer</span>
                    </div>
                    <p className="text-center leading-relaxed">{currentCard.answer}</p>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <AnimatePresence>
                {isFlipped && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex justify-center gap-4"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 border-destructive/50 hover:bg-destructive/10 hover:text-destructive min-w-40"
                      onClick={handleStudyAgain}
                    >
                      <X className="w-5 h-5" />
                      Study Again
                    </Button>
                    <Button
                      size="lg"
                      className="gap-2 bg-green-600 hover:bg-green-700 text-white min-w-40"
                      onClick={handleKnow}
                    >
                      <Check className="w-5 h-5" />
                      I Know This
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // Completion Screen
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <Card className="p-12 shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h1 className="mb-4">Great Job!</h1>
                <p className="text-muted-foreground mb-8">
                  You've completed all {mockFlashcards.length} flashcards
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
                  <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <div className="text-3xl mb-2">
                      {knownCards.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Known</div>
                  </Card>
                  <Card className="p-4 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
                    <div className="text-3xl mb-2">
                      {studyAgainCards.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Review</div>
                  </Card>
                </div>

                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={onBack}>
                    Back to Study
                  </Button>
                  <Button onClick={handleReset} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Study Again
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}