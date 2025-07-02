export function extractErrorMessage(error: unknown, fallback = 'An error occurred'): string {
  if (
    error &&
    typeof error === 'object' &&
    'response' in error &&
    error.response &&
    typeof error.response === 'object' &&
    'data' in error.response &&
    error.response.data &&
    typeof error.response.data === 'object' &&
    'message' in error.response.data
  ) {
    return (error.response.data as any).message;
  } else if (error instanceof Error) {
    return error.message;
  }
  return fallback;
} 