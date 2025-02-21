import { useState } from 'react';
import { ApiData, ApiResponse } from '@type/Response';

/**
 * Props for the useAsyncResponse hook.
 * @template T - The response from the api function
 * @template A - The the arguments for the API function.
 */
export interface UseAsyncResponseProps<T extends ApiData, A extends any[]> {
  /**
   * The API to call
   * @param {...A} args - The arguments for the API function.
   * @returns {Promise<T>} - The promise returned by the API function.
   */
  api: (...args: A) => Promise<ApiResponse<T>>;

  /**
   * The success handler function, calls when api resolves
   * @param {T} response - The response from the API function.
   */
  onSuccess: (response: T) => void;

  /**
   * The error handler function.
   * @param {any} error - The error from the API function.
   */
  onError: (error: any) => void;

  /**
   * The initial loading state.
   * @default false
   */
  initialLoadingState?: boolean;
}

/**
 * A hook that uses provided handlers to automatically handle a finished promise.
 * Used for api calls, will handle error flows.
 * @param {any[]} deps - The dependencies for the api fetch history. If any change, the hasFetchedOnce will reset to false.
 */
const useAsyncResponse = <T extends ApiData, A extends any[]>(
  {
    api,
    onSuccess,
    onError,
    initialLoadingState = false,
  }: UseAsyncResponseProps<T, A>,
  deps: any[] = [],
) => {
  const [isLoading, setIsLoading] = useState(initialLoadingState);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [depsState, setDepsState] = useState(deps);
  const compareArrays = (arr1: any[], arr2: any[]) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  };

  // reset hasFetchedOnce if deps change
  if (!compareArrays(deps, depsState)) {
    setDepsState(deps);
    setHasFetchedOnce(false);
  }

  /**
   * Call api associated through this function.
   * @param {A} args
   */
  const callAsyncFunction = async (...args: A) => {
    setIsLoading(true);
    await api(...args)
      .then((response) => {
        setIsLoading(false);
        if (!hasFetchedOnce) setHasFetchedOnce(true);
        resolveAsyncResponse(response);
      })
      .catch((error) => {
        setIsLoading(false);
        if (!hasFetchedOnce) setHasFetchedOnce(true);
        onError(error);
      });
  };

  const resolveAsyncResponse = (response: ApiResponse<T>) => {
    if ((response as any)?.status === 200) {
      onSuccess(response.data);
      return;
    }
    onError(response);
  };

  return { callAsyncFunction, isLoading, hasFetchedOnce };
};

export default useAsyncResponse;
