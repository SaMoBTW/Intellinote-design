import { FileText, Clock, MoreVertical, Grid3x3, List, FolderOpen, Plus, Edit, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { useState } from 'react';
import { AddContentDialog } from './AddContentDialog';
import { LibrarySkeleton } from './Skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface LibraryProps {
  onSelectDocument: (documentId: string) => void;
  isLoading?: boolean;
}

interface Document {
  id: string;
  title: string;
  type: string;
  dateAdded: string;
  processed: boolean;
  thumbnail?: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Biology 101 Notes',
    type: 'PDF',
    dateAdded: 'Jan 8, 2026',
    processed: true,
  },
  {
    id: '2',
    title: 'World History Chapter 5',
    type: 'PDF',
    dateAdded: 'Jan 7, 2026',
    processed: true,
  },
  {
    id: '3',
    title: 'Physics Lecture Slides',
    type: 'PDF',
    dateAdded: 'Jan 5, 2026',
    processed: true,
  },
  {
    id: '4',
    title: 'Chemistry Lab Report',
    type: 'PDF',
    dateAdded: 'Jan 3, 2026',
    processed: true,
  },
  {
    id: '5',
    title: 'Math Calculus Notes',
    type: 'PDF',
    dateAdded: 'Jan 1, 2026',
    processed: true,
  },
  {
    id: '6',
    title: 'English Literature Essay',
    type: 'PDF',
    dateAdded: 'Dec 30, 2025',
    processed: false,
  },
];

export function Library({ onSelectDocument, isLoading }: LibraryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-7xl mx-auto p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">My Library</h1>
            <p className="text-muted-foreground">
              All your documents in one place
            </p>
          </div>

          {/* View Toggle and Add Button */}
          <div className="flex items-center gap-2">
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
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Document</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Documents Grid/List */}
        {isLoading ? (
          <LibrarySkeleton />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="group hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                  onClick={() => onSelectDocument(doc.id)}
                >
                  {/* Thumbnail */}
                  <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                    <FileText className="w-16 h-16 text-primary/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    {doc.processed && (
                      <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                        Processed
                      </Badge>
                    )}
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
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h4 className="mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{doc.dateAdded}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {mockDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="group hover:shadow-md transition-all cursor-pointer p-4"
                  onClick={() => onSelectDocument(doc.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary/50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1 group-hover:text-primary transition-colors truncate">
                        {doc.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{doc.dateAdded}</span>
                      </div>
                    </div>
                    {doc.processed && (
                      <Badge className="bg-secondary text-secondary-foreground flex-shrink-0">
                        Processed
                      </Badge>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State (show if no documents) */}
        {mockDocuments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <FolderOpen className="w-20 h-20 text-muted-foreground/50 mb-4" />
            <h3 className="mb-2">No documents yet</h3>
            <p className="text-muted-foreground mb-6">
              Upload your first document to get started
            </p>
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
        )}
      </div>

      <AddContentDialog 
        open={isAddDialogOpen} 
        onClose={() => setAddDialogOpen(false)} 
        mode="library" 
      />
    </div>
  );
}