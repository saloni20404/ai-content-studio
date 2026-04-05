import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useUsage() {
  const { data, error, isLoading } = useSWR('/api/user/usage', fetcher);
  return { usage: data, error, isLoading };
}
