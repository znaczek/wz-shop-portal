export interface ApiData<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
}
