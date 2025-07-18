import { ref, computed } from 'vue';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

/**
 * Composable to manage Firebase authentication session.
 * It provides reactive user state and readiness status.
 */

// * This variable is a reactive reference to the current user, either they are logged in or not (null).
// * It is initialized to null, meaning no user is logged in by default.
const user = ref<User | null>(null);

//* isReady is a reactive reference that indicates whether the firebase auth s state has been initialized, and is "ready" to be used.
// * It is initialized to false, meaning the auth state is not ready by default.
const isReady = ref(false);

export function useFirebaseSession() {
  const auth = getAuth();

  //* Ensuring this only runs once, when the composable is first used.
  if (!isReady.value) {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser; // Update the user reference with the current Firebase user
      isReady.value = true; // Set isReady to true once the auth state is initialized
    });
  }

  const isLoggedIn = computed(() => !!user.value); // Computed property to check if the user is logged in

  return {
    user, // Reactive reference to the current user
    isReady, // Reactive reference indicating if the auth state is ready
    isLoggedIn, // Computed property to check if the user is logged in
  };
}
