import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Composable to manage network status.
 * It provides reactive properties to check if the network is online or offline.
 */
export function useNetworkStatus() {
  const isOnline = ref(navigator.onLine);

  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine;
  };

  onMounted(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });

  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
  });

  return { isOnline };
}
