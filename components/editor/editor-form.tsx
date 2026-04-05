'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2 } from 'lucide-react';
import { useState } from 'react';

interface EditorFormProps {
  contentId: string;
  contentType?: string;
  onGenerated: (text: string) => void;
}

export function EditorForm({ contentId, contentType, onGenerated }: EditorFormProps) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [keywords, setKeywords] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId, topic, tone, length, keywords, contentType }),
      });
      const data = await res.json();
      if (data.text) onGenerated(data.text);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-6">Generate with AI</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground">Topic</Label>
            <Textarea
              placeholder="What should this content be about?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-card border-secondary text-foreground placeholder:text-muted-foreground resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="bg-card border-secondary text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="funny">Funny</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger className="bg-card border-secondary text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="long">Long</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Keywords</Label>
            <Input
              placeholder="keyword1, keyword2"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="bg-card border-secondary text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-secondary">
        <Button
          onClick={handleGenerate}
          disabled={!topic.trim() || generating}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
          size="lg"
        >
          <Wand2 className="w-5 h-5" />
          {generating ? 'Generating...' : 'Generate'}
        </Button>
      </div>
    </div>
  );
}
