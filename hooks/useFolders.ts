import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useFolders() {
  const { data, error, isLoading, mutate } = useSWR('/api/folders', fetcher);
  return { folders: data ?? [], error, isLoading, mutate };
}
