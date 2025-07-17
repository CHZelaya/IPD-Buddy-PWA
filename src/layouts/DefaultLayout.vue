<template>
  <TopAppBar />
  <!--  Main content area-->

  <v-main>
    <router-view> </router-view>
  </v-main>

  <!-- Version Footer (scrolls) -->
  <AppFooter />

  <!-- Bottom Nav Bar (fixed) -->
  <BottomNav :active-tab="activeTab" :navigate-to="navigateTo" />
</template>

<script lang="ts" setup>
//
import TopAppBar from '@/components/TopAppBar.vue';
import AppFooter from '@/components/AppFooter.vue';
import BottomNav from '@/components/BottomNav.vue';

import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const activeTab = computed(() => {
  if (route.path.startsWith('/dashboard')) return 'dashboard';
  if (route.path.startsWith('/profile')) return 'profile';
  if (route.path.startsWith('/newJob')) return 'newJob';
  if (route.path.startsWith('/pastJobs')) return 'pastJobs';
});

function navigateTo(tab: string) {
  const targetPath = '/' + tab;
  if (route.path !== targetPath) {
    router.push(targetPath);
  }
}
</script>

<style scoped></style>
