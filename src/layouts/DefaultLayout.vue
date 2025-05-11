<template>

  <TopAppBar />
  <!--  ? Anything inside the v-main below is the main content area-->
  <v-main>
    <transition mode="out-in" :name="transitionName">
      <router-view />
    </transition>
  </v-main>

  <BottomNav :acvite-tab="activeTab" :navigate-to="navigateTo" />
</template>

<script lang="ts" setup>
  //
  import TopAppBar from '@/components/TopAppBar.vue';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const activeTab = ref('dashboard');
  const transitionDirection = ref('forward');

  function navigateTo (tab: string) {
    transitionDirection.value = (tab === 'dashboard') ? 'backward' : 'forward';
    activeTab.value = tab;
    router.push('/' + tab);
  }

  const transitionName = computed(() =>
    transitionDirection.value === 'forward' ? 'slide-left' : 'slide-right'
  );
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

/* Slide Left */
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Slide Right */
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
