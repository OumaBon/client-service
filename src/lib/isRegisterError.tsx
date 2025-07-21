

export default function isRegisterError(error: unknown): error is { message?: string; errors?: Record<string, string[]> } {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('message' in error || 'errors' in error)
  );
}
