import { getAuth } from 'firebase/auth';
import { warn, error, log } from '@/utils/logger';

/**
 * Retrieves a valid Firebase authentication token.
 * Firebase handles refreshing tokens automatically,
 */

export async function getFirebaseToken(): Promise<string | null> {
  const user = getAuth().currentUser;
  if (!user) {
    return null;
  }

  try {
    return await user.getIdToken(); // This will automatically refresh the token if needed
  } catch (err) {
    if (err instanceof Error) {
      error('authService', 'Error getting Firebase token:', err.message);
    } else {
      error('authService', 'Unexpected error getting Firebase token:', err);
    }
    return null;
  }
}
