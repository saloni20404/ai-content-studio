import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

interface Filters {
  search?: string;
  tag?: string;
  contentType?: string;
  page?: number;
}

export function useContents(filters?: Filters) {
  const params = new URLSearchParams();
  if (filters?.search) params.set('search', filters.search);
  if (filters?.tag) params.set('tag', filters.tag);
  if (filters?.contentType) params.set('contentType', filters.contentType);
  if (filters?.page) params.set('page', String(filters.page));

  const query = params.toString();
  const { data, error, isLoading, mutate } = useSWR(
    `/api/contents${query ? `?${query}` : ''}`,
    fetcher
  );

  return {
    contents: data?.contents ?? [],
    total: data?.total ?? 0,
    pages: data?.pages ?? 0,
    isLoading,
    error,
    mutate,
  };
}

export function useContent(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/contents/${id}` : null,
    fetcher
  );
  return { content: data, error, isLoading, mutate };
}
