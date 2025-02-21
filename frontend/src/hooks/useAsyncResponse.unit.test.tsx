import { renderHook, act, waitFor } from '@testing-library/react';
import useAsyncResponse from './useAsyncResponse';

const mockApi = jest.fn();
const mockOnSuccess = jest.fn();
const mockOnError = jest.fn();

const setup = (initialLoadingState: boolean = false, deps: any[] = []) => {
  const hook = renderHook(
    ({ loadingState, depsArg }) =>
      useAsyncResponse(
        {
          api: mockApi,
          onSuccess: mockOnSuccess,
          onError: mockOnError,
          initialLoadingState: loadingState,
        },
        depsArg,
      ),
    { initialProps: { loadingState: initialLoadingState, depsArg: deps } },
  );
  return hook;
};

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

const getResolveAfter = (data: any, time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(data), time));

describe('useAsyncResponse', () => {
  it('should set isLoading to true when callAsyncFunction is called', async () => {
    const { result } = setup();
    mockApi.mockImplementationOnce(
      () => getResolveAfter({ status: 200 }, 1000) as Promise<any>,
    );

    await act(async () => {
      result.current.callAsyncFunction();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasFetchedOnce).toBe(false);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasFetchedOnce).toBe(true);
  });

  it('should call onSuccess when API resolves with status 200', async () => {
    const { result } = setup();
    const data = { value: 'string' };
    const response = { status: 200, data };
    mockApi.mockResolvedValueOnce(response);

    await act(async () => {
      await result.current.callAsyncFunction();
    });

    expect(mockOnSuccess).toHaveBeenCalledWith(data);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasFetchedOnce).toBe(true);
  });

  it('should call onError when API resolves with non-zero status', async () => {
    const { result } = setup();
    const data = { value: 'string' };
    const response = { status: 1, data };
    mockApi.mockResolvedValueOnce(response);
    expect(result.current.hasFetchedOnce).toBe(false);

    await act(async () => {
      await result.current.callAsyncFunction();
    });

    expect(mockOnError).toHaveBeenCalledWith(response);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasFetchedOnce).toBe(true);
  });

  it('should call onError when API rejects', async () => {
    const { result } = setup();
    const error = new Error('API Error');
    mockApi.mockRejectedValueOnce(error);
    expect(result.current.hasFetchedOnce).toBe(false);

    await act(async () => {
      await result.current.callAsyncFunction();
    });

    expect(mockOnError).toHaveBeenCalledWith(error);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasFetchedOnce).toBe(true);
  });

  it('should use initialLoadingState if provided', () => {
    const { result } = setup(true);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasFetchedOnce).toBe(false);
  });

  it('should reset hasFetchedOnce if deps change', async () => {
    const { result, rerender } = setup(false, [1]);
    mockApi.mockResolvedValueOnce({ status: 200 });

    await act(async () => {
      await result.current.callAsyncFunction();
    });

    expect(result.current.hasFetchedOnce).toBe(true);
    await act(async () => {
      rerender({ loadingState: false, depsArg: [2] });
    });
    await waitFor(() => {
      expect(result.current.hasFetchedOnce).toBe(false);
    });
  });
});
