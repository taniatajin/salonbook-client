export function validatePassword(password: string): string | null {
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter";
  return null;
}