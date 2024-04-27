import useMergeState from './useMergeState.ts';

interface Props {
  endpoint: string;
  method?: 'POST' | 'GET';
}

interface State<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

const useFetch = <T>({ endpoint, method = 'GET' }: Props) => {
  const [state, setState] = useMergeState<State<T>>({
    loading: method !== 'POST',
    error: null,
    data: null,
  });

  const fetchData = async (body?: T) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method,
          body: JSON.stringify(body),
        },
      );
      const json = (await res.json()) as T;
      setState({ loading: false, data: json });
      return json;
    } catch (e) {
      setState({ loading: false, error: e as string });
    }
  };

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
    fetchData,
  };
};

export default useFetch;
