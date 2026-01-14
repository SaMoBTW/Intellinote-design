import { Upload, BookOpen, Brain, Settings, FileText, Clock, Flame, FileCheck, Sparkles, Trophy, Target, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { TopBar } from './TopBar';
import { FileUploadDialog } from './FileUploadDialog';
import { motion } from 'motion/react';
import { useState } from 'react';

interface DashboardProps {
  onNavigateToStudy: (documentId: string) => void;
  userName?: string;
}

interface Document {
  id: string;
  title: string;
  type: string;
  progress: number;
  lastAccessed: string;
  thumbnail?: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Biology 101 Notes',
    type: 'PDF',
    progress: 40,
    lastAccessed: '2 hours ago',
  },
  {
    id: '2',
    title: 'World History Chapter 5',
    type: 'PDF',
    progress: 75,
    lastAccessed: '1 day ago',
  },
  {
    id: '3',
    title: 'Physics Lecture Slides',
    type: 'PDF',
    progress: 20,
    lastAccessed: '3 days ago',
  },
  {
    id: '4',
    title: 'Chemistry Lab Report',
    type: 'PDF',
    progress: 90,
    lastAccessed: '5 days ago',
  },
];

export function Dashboard({ onNavigateToStudy, userName = "Student" }: DashboardProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Hero Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative overflow-hidden"
        >
          <Card className="border-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
            <div className="relative p-8 lg:p-12">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-6 h-6 text-secondary" />
                    <span className="text-sm font-medium text-primary-foreground/80">Welcome back!</span>
                  </div>
                  <h1 className="mb-3 text-white">
                    {getGreeting()}, {userName}
                  </h1>
                  <p className="text-lg text-primary-foreground/90 max-w-2xl mb-6">
                    Your AI-powered study companion is ready to help you excel. Upload materials, create flashcards, or continue where you left off.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90"
                    onClick={() => setUploadDialogOpen(true)}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload New Material
                  </Button>
                </div>
                <div className="hidden lg:block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full" />
                    <div className="relative w-32 h-32 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <Brain className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Card className="p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Day Streak 🔥</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Documents</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </Card>

          <Card className="p-4 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">48</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Cards Studied</p>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <h3 className="mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className="p-6 hover:shadow-lg transition-all cursor-pointer group bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
              onClick={() => setUploadDialogOpen(true)}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="mb-1">Upload Document</h4>
                  <p className="text-sm text-muted-foreground">Add new study material</p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 hover:shadow-lg transition-all cursor-pointer group bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="mb-1">AI Summary</h4>
                  <p className="text-sm text-muted-foreground">Generate smart notes</p>
                </div>
              </div>
            </Card>

            <Card 
              className="p-6 hover:shadow-lg transition-all cursor-pointer group bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="mb-1">Practice Quiz</h4>
                  <p className="text-sm text-muted-foreground">Test your knowledge</p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mb-1">Continue Learning</h2>
              <p className="text-sm text-muted-foreground">Pick up where you left off</p>
            </div>
            <Button variant="ghost" className="text-primary">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
              >
                <Card 
                  className="group hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer overflow-hidden"
                  onClick={() => onNavigateToStudy(doc.id)}
                >
                  {/* Thumbnail/Icon Area */}
                  <div className="h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                    <FileText className="w-12 h-12 text-primary/40 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    {doc.progress > 0 && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-primary">
                        {doc.progress}%
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4 className="mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Clock className="w-3 h-3" />
                      <span>{doc.lastAccessed}</span>
                    </div>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                      <Progress value={doc.progress} className="h-1.5" />
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingUp className="w-3 h-3 text-secondary-foreground" />
                        <span className="text-muted-foreground">Keep going!</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <FileUploadDialog open={isUploadDialogOpen} onClose={() => setUploadDialogOpen(false)} fileName="Biology Notes.pdf" />
    </div>
  );
}