export interface EmptyFetchResponse {
  ok: boolean;
  status: number;
  error?: {
    message: string;
  };
}

export interface FetchResponse<T> extends EmptyFetchResponse {
  data: T;
}
