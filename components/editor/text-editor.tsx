'use client';

import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';

interface TextEditorProps {
  content: string;
  onChange: (val: string) => void;
}

export function TextEditor({ content, onChange }: TextEditorProps) {
  const handleCopy = () => navigator.clipboard.writeText(content);

  const handleDownload = () => {
    const el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    el.setAttribute('download', 'content.txt');
    el.click();
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-secondary p-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Content Editor</h3>
          <p className="text-xs text-muted-foreground">{wordCount} words · {content.length} characters</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCopy} variant="outline" size="sm" className="border-secondary text-foreground hover:bg-secondary gap-2">
            <Copy className="w-4 h-4" />Copy
          </Button>
          <Button onClick={handleDownload} variant="outline" size="sm" className="border-secondary text-foreground hover:bg-secondary gap-2">
            <Download className="w-4 h-4" />Download
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your generated content will appear here. You can also type directly."
          className="w-full h-full p-4 bg-card border border-secondary rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm leading-relaxed"
        />
      </div>
    </div>
  );
}
