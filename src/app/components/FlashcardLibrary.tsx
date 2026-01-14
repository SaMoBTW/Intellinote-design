import { Brain, Clock, Play, Plus, MoreVertical, Grid3x3, List, Edit, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface FlashcardLibraryProps {
  onSelectDeck: (deckId: string) => void;
  onCreateNew: () => void;
}

interface FlashcardDeck {
  id: string;
  title: string;
  documentTitle: string;
  dateCreated: string;
  cardsCount: number;
  lastStudied?: string;
  mastery: number;
}

const mockDecks: FlashcardDeck[] = [
  {
    id: '1',
    title: 'Biology 101 Flashcards',
    documentTitle: 'Biology 101 Notes',
    dateCreated: 'Jan 8, 2026',
    cardsCount: 25,
    lastStudied: 'Jan 8, 2026',
    mastery: 85,
  },
  {
    id: '2',
    title: 'World History Flashcards',
    documentTitle: 'World History Chapter 5',
    dateCreated: 'Jan 7, 2026',
    cardsCount: 30,
    lastStudied: 'Jan 7, 2026',
    mastery: 92,
  },
  {
    id: '3',
    title: 'Physics Fundamentals',
    documentTitle: 'Physics Lecture Slides',
    dateCreated: 'Jan 5, 2026',
    cardsCount: 20,
    mastery: 0,
  },
  {
    id: '4',
    title: 'Chemistry Reactions',
    documentTitle: 'Chemistry Lab Report',
    dateCreated: 'Jan 3, 2026',
    cardsCount: 18,
    lastStudied: 'Jan 4, 2026',
    mastery: 75,
  },
];

export function FlashcardLibrary({ onSelectDeck, onCreateNew }: FlashcardLibraryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-secondary';
    if (mastery >= 50) return 'text-primary';
    if (mastery > 0) return 'text-orange-500';
    return 'text-muted-foreground';
  };

  const getMasteryLabel = (mastery: number) => {
    if (mastery >= 80) return 'Mastered';
    if (mastery >= 50) return 'Learning';
    if (mastery > 0) return 'Started';
    return 'New';
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-6 h-6 text-primary" />
              <h1>Flashcard Decks</h1>
            </div>
            <p className="text-muted-foreground">
              Study with AI-generated flashcards
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>

            {/* Add New Button */}
            <Button onClick={onCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Create Deck</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="text-2xl font-bold mb-1">{mockDecks.length}</div>
            <div className="text-sm text-muted-foreground">Total Decks</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <div className="text-2xl font-bold mb-1">
              {mockDecks.reduce((sum, deck) => sum + deck.cardsCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Cards</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <div className="text-2xl font-bold mb-1">
              {mockDecks.filter((d) => d.mastery >= 80).length}
            </div>
            <div className="text-sm text-muted-foreground">Mastered</div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
            <div className="text-2xl font-bold mb-1">
              {Math.round(
                mockDecks.reduce((sum, deck) => sum + deck.mastery, 0) / mockDecks.length
              )}%
            </div>
            <div className="text-sm text-muted-foreground">Avg. Mastery</div>
          </Card>
        </div>

        {/* Flashcard Decks Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockDecks.map((deck, index) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="group hover:shadow-lg transition-all overflow-hidden">
                  {/* Header */}
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                    <Brain className="w-12 h-12 text-primary/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <Badge
                      className={`absolute top-3 left-3 ${
                        deck.mastery >= 80
                          ? 'bg-secondary text-secondary-foreground'
                          : deck.mastery >= 50
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {getMasteryLabel(deck.mastery)}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Deck
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Deck
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4 className="mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {deck.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                      From: {deck.documentTitle}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{deck.cardsCount} cards</span>
                        <span className={`font-medium ${getMasteryColor(deck.mastery)}`}>
                          {deck.mastery}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            deck.mastery >= 80
                              ? 'bg-secondary'
                              : deck.mastery >= 50
                              ? 'bg-primary'
                              : 'bg-orange-500'
                          }`}
                          style={{ width: `${deck.mastery}%` }}
                        />
                      </div>
                    </div>

                    {deck.lastStudied && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Clock className="w-3 h-3" />
                        <span>Studied {deck.lastStudied}</span>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      onClick={() => onSelectDeck(deck.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {deck.mastery > 0 ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {mockDecks.map((deck, index) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="group hover:shadow-md transition-all cursor-pointer p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-8 h-8 text-primary/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1 group-hover:text-primary transition-colors">
                        {deck.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        From: {deck.documentTitle}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{deck.cardsCount} cards</span>
                        {deck.lastStudied && (
                          <>
                            <span>•</span>
                            <span>Studied {deck.lastStudied}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getMasteryColor(deck.mastery)}`}>
                          {deck.mastery}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {getMasteryLabel(deck.mastery)}
                        </div>
                      </div>
                      <Button onClick={() => onSelectDeck(deck.id)}>
                        <Play className="w-4 h-4 mr-2" />
                        Study
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Deck
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Deck
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {mockDecks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Brain className="w-20 h-20 text-muted-foreground/50 mb-4" />
            <h3 className="mb-2">No flashcard decks yet</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Upload a document and generate flashcards to get started
            </p>
            <Button onClick={onCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Deck
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}