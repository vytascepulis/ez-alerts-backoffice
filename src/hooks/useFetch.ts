import useMergeState from './useMergeState.ts';

interface Props {
  endpoint: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
}

interface State<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

const useFetch = <T>({ endpoint, method = 'GET' }: Props) => {
  const [state, setState] = useMergeState<State<T>>({
    loading: false,
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

      if (!res.ok) {
        const json = (await res.json()) as { message: string };
        setState({
          loading: false,
          error: json.message ?? 'Something went wrong',
        });
        return;
      }

      const json = (await res.json()) as T;
      setState({ loading: false, data: json });
      return json;
    } catch (e) {
      if (e instanceof Error) {
        setState({ loading: false, error: e.message });
      }
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
