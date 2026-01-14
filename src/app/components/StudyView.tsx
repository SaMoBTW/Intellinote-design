import { useState } from 'react';
import { ZoomIn, ZoomOut, Search, Highlighter, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Skeleton } from './ui/skeleton';
import { motion } from 'motion/react';

interface StudyViewProps {
  documentId: string;
  onBack: () => void;
  onGenerateQuiz: () => void;
}

export function StudyView({ documentId, onBack, onGenerateQuiz }: StudyViewProps) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);

  // Mock document data
  const documentTitle = 'Biology 101 Notes';

  // Mock AI-generated summary
  const summary = [
    {
      title: 'Cell Structure',
      content: 'Cells are the basic building blocks of all living organisms. They contain various organelles that perform specific functions.',
      expanded: true,
    },
    {
      title: 'Photosynthesis',
      content: 'The process by which plants convert light energy into chemical energy stored in glucose.',
      expanded: false,
    },
    {
      title: 'DNA Replication',
      content: 'The biological process of producing two identical replicas of DNA from one original DNA molecule.',
      expanded: false,
    },
  ];

  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'ve analyzed your document. Feel free to ask me anything about the content!' },
    { role: 'user', content: 'What is the main topic of this chapter?' },
    { role: 'assistant', content: 'This chapter focuses on cellular biology, specifically covering cell structure, photosynthesis, and DNA replication. Would you like me to explain any of these topics in more detail?' },
  ]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h3>{documentTitle}</h3>
            <p className="text-sm text-muted-foreground">PDF • 24 pages</p>
          </div>
        </div>
        <Button onClick={onGenerateQuiz} className="gap-2">
          <Sparkles className="w-4 h-4" />
          Generate Quiz
        </Button>
      </div>

      {/* Split Screen Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Document Viewer (60% on desktop, full width on mobile) */}
        <div className="flex-1 flex flex-col border-r border-border bg-muted/30">
          {/* Toolbar */}
          <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-2 lg:gap-4 overflow-x-auto">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm min-w-12 lg:min-w-16 text-center">{zoomLevel}%</span>
              <Button variant="ghost" size="sm" onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10" />
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Highlighter className="w-4 h-4" />
            </Button>
          </div>

          {/* Document Content */}
          <ScrollArea className="flex-1">
            <div className="p-4 lg:p-8 max-w-3xl mx-auto">
              <Card className="p-4 lg:p-8 shadow-lg">
                <div className="prose prose-slate max-w-none prose-sm lg:prose-base">
                  <h1 className="mb-6">Chapter 3: Cellular Biology</h1>
                  
                  <h2 className="mt-8 mb-4">Cell Structure and Function</h2>
                  <p className="mb-4">
                    Cells are the fundamental units of life. Every living organism is composed of one or more cells, 
                    each containing the hereditary information necessary for regulating cell functions and for 
                    transmitting information to the next generation of cells.
                  </p>
                  
                  <p className="mb-4">
                    The cell membrane, also called the plasma membrane, is found in all cells and separates the 
                    interior of the cell from the outside environment. The cell membrane consists of a lipid bilayer 
                    that is semipermeable, regulating the transport of materials entering and exiting the cell.
                  </p>

                  <h2 className="mt-8 mb-4">Photosynthesis</h2>
                  <p className="mb-4">
                    Photosynthesis is a process used by plants and other organisms to convert light energy into 
                    chemical energy that, through cellular respiration, can later be released to fuel the organism's 
                    activities. This chemical energy is stored in carbohydrate molecules, such as sugars and starches.
                  </p>

                  <h2 className="mt-8 mb-4">DNA and Genetic Information</h2>
                  <p className="mb-4">
                    Deoxyribonucleic acid (DNA) is a molecule composed of two polynucleotide chains that coil around 
                    each other to form a double helix carrying genetic instructions for the development, functioning, 
                    growth and reproduction of all known organisms.
                  </p>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - AI Assistant (40%) */}
        <div className="hidden lg:flex w-2/5 flex-col bg-card">
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="flashcards">Cards</TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="flex-1 flex flex-col mt-0 p-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-4 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-xs text-muted-foreground">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 flex gap-2">
                <Input placeholder="Ask a question..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </TabsContent>

            {/* Summary Tab */}
            <TabsContent value="summary" className="flex-1 mt-0 p-4 overflow-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h4>AI-Generated Summary</h4>
                </div>
                
                {summary.map((item, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="mb-2 flex items-center gap-2">
                      {item.title}
                      <Sparkles className="w-3 h-3 text-secondary" />
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.content}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="flex-1 mt-0 p-4">
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Sparkles className="w-12 h-12 text-secondary mb-4" />
                <h4 className="mb-2">Generate a Quiz</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Test your knowledge with AI-generated questions
                </p>
                <Button onClick={onGenerateQuiz}>Create Quiz</Button>
              </div>
            </TabsContent>

            {/* Flashcards Tab */}
            <TabsContent value="flashcards" className="flex-1 mt-0 p-4">
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Sparkles className="w-12 h-12 text-secondary mb-4" />
                <h4 className="mb-2">Generate Flashcards</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Create flashcards from your document
                </p>
                <Button>Create Flashcards</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Mobile AI Assistant Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-2xl bg-gradient-to-br from-primary to-secondary"
          onClick={() => setShowAIPanel(!showAIPanel)}
        >
          <Sparkles className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile AI Panel Overlay */}
      {showAIPanel && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          className="lg:hidden fixed inset-0 bg-card z-40 flex flex-col"
        >
          <div className="border-b border-border p-4 flex items-center justify-between">
            <h3>AI Assistant</h3>
            <Button variant="ghost" onClick={() => setShowAIPanel(false)}>
              Close
            </Button>
          </div>
          
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="flashcards">Cards</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col mt-0 p-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-4 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-secondary" />
                            <span className="text-xs text-muted-foreground">AI Assistant</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="mt-4 flex gap-2">
                <Input placeholder="Ask a question..." className="flex-1" />
                <Button>Send</Button>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="flex-1 mt-0 p-4 overflow-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h4>AI-Generated Summary</h4>
                </div>
                
                {summary.map((item, index) => (
                  <Card key={index} className="p-4">
                    <h4 className="mb-2 flex items-center gap-2">
                      {item.title}
                      <Sparkles className="w-3 h-3 text-secondary" />
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.content}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="flex-1 mt-0 p-4">
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Sparkles className="w-12 h-12 text-secondary mb-4" />
                <h4 className="mb-2">Generate a Quiz</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Test your knowledge with AI-generated questions
                </p>
                <Button onClick={onGenerateQuiz}>Create Quiz</Button>
              </div>
            </TabsContent>

            <TabsContent value="flashcards" className="flex-1 mt-0 p-4">
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Sparkles className="w-12 h-12 text-secondary mb-4" />
                <h4 className="mb-2">Generate Flashcards</h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Create flashcards from your document
                </p>
                <Button>Create Flashcards</Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
}