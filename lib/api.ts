export async function createContent(data: { title: string; contentType: string; folderId?: string }) {
  const res = await fetch('/api/contents', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create content');
  return res.json();
}

export async function updateContent(id: string, data: Record<string, unknown>) {
  const res = await fetch(`/api/contents/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update content');
  return res.json();
}

export async function deleteContent(id: string) {
  const res = await fetch(`/api/contents/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete content');
}

export async function publishContent(id: string) {
  const res = await fetch(`/api/contents/${id}/publish`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to publish content');
  return res.json();
}
