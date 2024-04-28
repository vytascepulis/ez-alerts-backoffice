import useMergeState from './useMergeState';

interface State<T> {
  loading: boolean;
  error: { message: string } | null;
  data: T | null;
}

interface FetchDataOptions<T> {
  endpoint: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  variables?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  credentials?: RequestCredentials;
  headers?: {
    [key: string]: string;
  };
  error?: (error: { message: string }) => void;
  update?: (result: T) => void;
}

interface FetchDataInterface<T> {
  (all: FetchDataOptions<T>): void;
}

type UseFetchTuple<T> = [FetchDataInterface<T>, State<T>];

export const useFetch = <T>(): UseFetchTuple<T> => {
  const [state, setState] = useMergeState<State<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchData = async (variables: FetchDataOptions<T>) => {
    setState({
      error: null,
      loading: true,
    });

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${variables.endpoint}`,
      {
        method: variables.method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...variables.headers,
        },
        body: variables.variables ? JSON.stringify(variables.variables) : null,
      },
    );

    const result = (await response.json()) as T;

    if (!response.ok) {
      setState({
        data: null,
        loading: false,
        error: {
          message: (result as { message: string }).message,
        },
      });

      if (variables.error)
        variables.error({
          message: (result as { message: string }).message,
        });

      return;
    }

    setState({
      data: result,
      loading: false,
      error: null,
    });

    if (variables.update) {
      variables.update(result);
    }
  };

  return [fetchData, state];
};

export default useFetch;
