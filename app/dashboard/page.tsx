'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, MoreVertical, FileText, Linkedin, Twitter, Mail, Package, Zap } from 'lucide-react';
import { useContents } from '@/hooks/useContents';
import { useFolders } from '@/hooks/useFolders';
import { createContent, deleteContent } from '@/lib/api';

const CONTENT_TYPES = [
  { value: 'BLOG_POST', label: 'Blog Post', icon: FileText, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'LINKEDIN', label: 'LinkedIn', icon: Linkedin, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { value: 'TWITTER_THREAD', label: 'Twitter', icon: Twitter, color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
  { value: 'EMAIL', label: 'Email', icon: Mail, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { value: 'PRODUCT_DESC', label: 'Product', icon: Package, color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
];
function getTypeStyle(type: string) {
  return CONTENT_TYPES.find(t => t.value === type)?.color ?? 'bg-secondary text-foreground';
}

export default function DashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Blog');
  const [newFolder, setNewFolder] = useState('');
  const [creating, setCreating] = useState(false);

  const { contents, isLoading, mutate } = useContents({
    search: search || undefined,
    
    contentType: typeFilter === 'all' ? undefined : typeFilter || undefined,
  });
  const { folders } = useFolders();

  async function handleCreate() {
    if (!newTitle.trim()) return;
    setCreating(true);
    try {
      const content = await createContent({
        title: newTitle,
        contentType: newType,
        folderId: newFolder || undefined,
      });
      setModalOpen(false);
      setNewTitle('');
      setNewType('Blog');
      setNewFolder('');
      router.push(`/dashboard/editor/${content.id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    await deleteContent(id);
    mutate();
  }

  return (
    <div className="p-6 space-y-6">
      {/* Top bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 border-secondary bg-card/50"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-44 border-secondary bg-card/50">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {CONTENT_TYPES.map(t => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
        >
          <Plus className="w-4 h-4" />
          New content
        </Button>
      </div>

      {/* Content grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-lg bg-secondary/30 animate-pulse" />
          ))}
        </div>
      ) : contents.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center py-24 space-y-6">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
            <Zap className="w-10 h-10 text-accent" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">No content yet</h2>
            <p className="text-muted-foreground">Create your first piece of content to get started.</p>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
          >
            <Plus className="w-4 h-4" />
            Create your first content
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((content: any) => (
            <div
              key={content.id}
              className="bg-card/50 border border-secondary rounded-lg p-5 space-y-3 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <Badge className={`text-xs border ${getTypeStyle(content.contentType)}`}>
                  {content.contentType}
                </Badge>
                <div className="flex items-center gap-2">
                  <Badge variant={content.isPublished ? 'default' : 'secondary'} className="text-xs">
                    {content.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-7 h-7 text-muted-foreground hover:text-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/editor/${content.id}`)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDelete(content.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <h3
                className="font-semibold text-foreground cursor-pointer hover:text-accent transition-colors line-clamp-2"
                onClick={() => router.push(`/dashboard/editor/${content.id}`)}
              >
                {content.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {new Date(content.createdAt).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* New content modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-2">
              {CONTENT_TYPES.map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    onClick={() => setNewType(t.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      newType === t.value
                        ? `${t.color} border-current`
                        : 'border-secondary text-muted-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
            <Input
              placeholder="Content title..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              className="border-secondary"
            />
            {folders.length > 0 && (
              <Select value={newFolder} onValueChange={setNewFolder}>
                <SelectTrigger className="border-secondary">
                  <SelectValue placeholder="Select folder (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {folders.map((f: any) => (
                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button
              onClick={handleCreate}
              disabled={!newTitle.trim() || creating}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {creating ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
