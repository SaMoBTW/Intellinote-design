import { Brain, Clock, CheckCircle2, XCircle, Trophy, Play, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { useState } from 'react';
import { AddContentDialog } from './AddContentDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface QuizzesProps {
  onStartQuiz?: (quizId: string) => void;
}

interface Quiz {
  id: string;
  title: string;
  documentTitle: string;
  dateCreated: string;
  questionsCount: number;
  completed: boolean;
  score?: number;
  lastAttempt?: string;
}

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Biology 101 Quiz',
    documentTitle: 'Biology 101 Notes',
    dateCreated: 'Jan 8, 2026',
    questionsCount: 10,
    completed: true,
    score: 85,
    lastAttempt: 'Jan 8, 2026',
  },
  {
    id: '2',
    title: 'World History Quiz',
    documentTitle: 'World History Chapter 5',
    dateCreated: 'Jan 7, 2026',
    questionsCount: 15,
    completed: true,
    score: 92,
    lastAttempt: 'Jan 7, 2026',
  },
  {
    id: '3',
    title: 'Physics Fundamentals',
    documentTitle: 'Physics Lecture Slides',
    dateCreated: 'Jan 5, 2026',
    questionsCount: 12,
    completed: false,
  },
  {
    id: '4',
    title: 'Chemistry Reactions',
    documentTitle: 'Chemistry Lab Report',
    dateCreated: 'Jan 3, 2026',
    questionsCount: 8,
    completed: true,
    score: 75,
    lastAttempt: 'Jan 4, 2026',
  },
];

export function Quizzes({ onStartQuiz }: QuizzesProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending'>('all');
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const filteredQuizzes = mockQuizzes.filter((quiz) => {
    if (activeTab === 'completed') return quiz.completed;
    if (activeTab === 'pending') return !quiz.completed;
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-secondary';
    if (score >= 70) return 'text-primary';
    return 'text-destructive';
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-6 h-6 text-primary" />
                <h1>Quizzes</h1>
              </div>
              <p className="text-muted-foreground">
                Test your knowledge with AI-generated quizzes
              </p>
            </div>
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Generate Quiz</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Quizzes</p>
                <p className="text-2xl font-semibold">{mockQuizzes.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-semibold">
                  {mockQuizzes.filter((q) => q.completed).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-semibold">
                  {Math.round(
                    mockQuizzes
                      .filter((q) => q.score)
                      .reduce((acc, q) => acc + (q.score || 0), 0) /
                      mockQuizzes.filter((q) => q.score).length
                  )}
                  %
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
          >
            All Quizzes
          </Button>
          <Button
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </Button>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="group hover:shadow-lg transition-all">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="mb-1">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        From: {quiz.documentTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {quiz.completed ? (
                        <Badge className="bg-secondary text-secondary-foreground">
                          Completed
                        </Badge>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Quiz
                          </DropdownMenuItem>
                          <DropdownMenuItem variant="destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Quiz
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Quiz Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Created {quiz.dateCreated}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Brain className="w-4 h-4" />
                      <span>{quiz.questionsCount} questions</span>
                    </div>
                  </div>

                  {/* Score Display */}
                  {quiz.completed && quiz.score !== undefined && (
                    <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Last Score</span>
                        <span className={`text-2xl font-bold ${getScoreColor(quiz.score)}`}>
                          {quiz.score}%
                        </span>
                      </div>
                      <Progress value={quiz.score} className="h-2" />
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    className="w-full"
                    variant={quiz.completed ? 'outline' : 'default'}
                    onClick={() => onStartQuiz?.(quiz.id)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Brain className="w-20 h-20 text-muted-foreground/50 mb-4" />
            <h3 className="mb-2">No quizzes found</h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              {activeTab === 'completed'
                ? "You haven't completed any quizzes yet"
                : activeTab === 'pending'
                ? "You don't have any pending quizzes"
                : 'Upload a document and generate a quiz to get started'}
            </p>
          </div>
        )}
      </div>

      <AddContentDialog 
        open={isAddDialogOpen} 
        onClose={() => setAddDialogOpen(false)} 
        mode="quiz" 
      />
    </div>
  );
}