import { useState, useEffect } from 'react';
import { AppSidebar } from './components/AppSidebar';
import { Dashboard } from './components/Dashboard';
import { Library } from './components/Library';
import { Summary } from './components/Summary';
import { StudyView } from './components/StudyView';
import { FlashcardMode } from './components/FlashcardMode';
import { FlashcardLibrary } from './components/FlashcardLibrary';
import { Quizzes } from './components/Quizzes';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { TopBar } from './components/TopBar';
import { Home, Library as LibraryIcon, FileText, Brain, ClipboardList } from 'lucide-react';
import { AddContentDialog } from './components/AddContentDialog';

type View = 'dashboard' | 'library' | 'summary' | 'flashcards' | 'flashcard-study' | 'quizzes' | 'study' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [selectedFlashcardDeckId, setSelectedFlashcardDeckId] = useState<string | null>(null);
  const [isAddContentDialogOpen, setAddContentDialogOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('Student');

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('Student');
    setCurrentView('dashboard');
    setSelectedDocumentId(null);
  };

  const handleNavigateToStudy = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setCurrentView('study');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedDocumentId(null);
  };

  const handleGenerateQuiz = () => {
    setCurrentView('flashcards');
  };

  const handleBackToStudy = () => {
    setCurrentView('study');
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Generate breadcrumbs based on current view
  const getBreadcrumbs = () => {
    if (currentView === 'dashboard') {
      return [{ label: 'Home' }];
    } else if (currentView === 'library') {
      return [{ label: 'My Library' }];
    } else if (currentView === 'summary') {
      return [{ label: 'Summaries' }];
    } else if (currentView === 'quizzes') {
      return [{ label: 'Quizzes' }];
    } else if (currentView === 'study') {
      return [
        { label: 'Library', href: '#' },
        { label: 'Biology 101 Notes' },
      ];
    } else if (currentView === 'flashcards') {
      return [{ label: 'Flashcards' }];
    } else if (currentView === 'settings') {
      return [{ label: 'Settings' }];
    }
    return [{ label: 'Home' }];
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="size-full flex bg-background text-foreground">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block">
        <AppSidebar
          activeView={currentView}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar 
          breadcrumbs={getBreadcrumbs()} 
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenSettings={() => setCurrentView('settings')}
        />
        
        {currentView === 'dashboard' && (
          <Dashboard onNavigateToStudy={handleNavigateToStudy} userName={userName} />
        )}

        {currentView === 'library' && (
          <Library onSelectDocument={handleNavigateToStudy} />
        )}

        {currentView === 'summary' && (
          <Summary />
        )}

        {currentView === 'quizzes' && (
          <Quizzes />
        )}
        
        {currentView === 'study' && selectedDocumentId && (
          <StudyView
            documentId={selectedDocumentId}
            onBack={handleBackToDashboard}
            onGenerateQuiz={handleGenerateQuiz}
          />
        )}

        {currentView === 'flashcards' && (
          <FlashcardLibrary 
            onSelectDeck={(deckId) => {
              setSelectedFlashcardDeckId(deckId);
              setCurrentView('flashcard-study');
            }} 
            onCreateNew={() => setAddContentDialogOpen(true)}
          />
        )}

        {currentView === 'flashcard-study' && selectedFlashcardDeckId && (
          <FlashcardMode onBack={() => setCurrentView('flashcards')} />
        )}

        {currentView === 'settings' && (
          <Settings userName={userName} onClose={() => setCurrentView('dashboard')} />
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-2 flex justify-around items-center z-50 shadow-lg">
        <button
          onClick={() => setCurrentView('library')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 min-w-0 ${
            currentView === 'library' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <LibraryIcon className="w-5 h-5" />
          <span className="text-[10px]">Library</span>
        </button>
        <button
          onClick={() => setCurrentView('summary')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 min-w-0 ${
            currentView === 'summary' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="text-[10px]">Summary</span>
        </button>
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 min-w-0 ${
            currentView === 'dashboard' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>
        <button
          onClick={() => setCurrentView('flashcards')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 min-w-0 ${
            currentView === 'flashcards' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Brain className="w-5 h-5" />
          <span className="text-[10px]">Cards</span>
        </button>
        <button
          onClick={() => setCurrentView('quizzes')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 min-w-0 ${
            currentView === 'quizzes' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <ClipboardList className="w-5 h-5" />
          <span className="text-[10px]">Quizzes</span>
        </button>
      </div>

      {/* Add Content Dialog */}
      <AddContentDialog 
        open={isAddContentDialogOpen} 
        onClose={() => setAddContentDialogOpen(false)} 
        mode="flashcards" 
      />
    </div>
  );
}