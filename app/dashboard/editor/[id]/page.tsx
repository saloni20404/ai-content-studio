'use client';

import { use, useEffect, useState, useCallback } from 'react';
import { EditorForm } from '@/components/editor/editor-form';
import { TextEditor } from '@/components/editor/text-editor';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useContent } from '@/hooks/useContents';
import { updateContent, publishContent } from '@/lib/api';

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { content, isLoading } = useContent(id);
  const [body, setBody] = useState('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (content) {
      setBody(content.body || '');
      setIsPublished(content.isPublished || false);
    }
  }, [content]);

  const handleSave = useCallback(async (newBody: string) => {
    setSaveStatus('saving');
    try {
      await updateContent(id, { body: newBody });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (e) {
      console.error(e);
      setSaveStatus('idle');
    }
  }, [id]);

  const handlePublish = async () => {
    try {
      const updated = await publishContent(id);
      setIsPublished(updated.isPublished);
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="border-b border-secondary bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="border-secondary text-foreground hover:bg-secondary gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {content?.title || 'Editor'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved' : content?.contentType}
              </p>
            </div>
          </div>
          <Button
            onClick={handlePublish}
            className={isPublished ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-accent text-accent-foreground hover:bg-accent/90'}
          >
            {isPublished ? 'Published ✓' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex">
        <div className="w-80 border-r border-secondary overflow-y-auto bg-card/30">
          <div className="p-6">
            <EditorForm
              contentId={id}
              contentType={content?.contentType}
              onGenerated={(text) => {
                setBody(text);
                handleSave(text);
              }}
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col">
          <TextEditor
            content={body}
            onChange={(val) => {
              setBody(val);
              handleSave(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}
