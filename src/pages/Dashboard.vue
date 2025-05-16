<template>
  <v-container class="d-flex flex-column justify-start align-center fill-height py-5">
    <!-- Full-width Profile Section -->
    <v-sheet class="pa-4 mb-4" color="surface" width="100%">
      <h1 class="text-h4 mb-2">Welcome back, {{ contractorStore.profile.firstName }}!</h1>
      <v-alert
        v-if="contractorStore.profile.id === -1"
        class="mb-4"
        type="warning"
        variant="tonal"
      >
        ⚠️ Showing fallback profile due to server error. Live data may be unavailable.
      </v-alert>
      <p>📱: {{ contractorStore.profile.phoneNumber }}</p>
      <p>📧: {{ contractorStore.profile.email }}</p>
      <p>🗓️: {{ today }}</p>
    </v-sheet>

    <!-- Recent Activity Section -->
    <v-sheet class="pa-4 mb-4" color="surface" width="100%">
      <h2 class="text-h5 mb-2">Recent Activity</h2>
      <p>🚧🚜🔧 Under Construction 🚧🚜🔧</p>
    </v-sheet>

    <!-- Primary Actions -->
    <div class="text-center mb-4">
      <h2 class="text-h5 mb-4">You ready to make that bread?</h2>
      <v-btn
        block
        class="my-2"
        color="primary"
        size="large"
        @click="navigateTo('newJob')"
      >
        START NEW JOB
      </v-btn>
      <v-btn
        block
        class="my-2"
        color="secondary"
        size="large"
        @click="navigateTo('pastJobs')"
      >
        VIEW PAST JOBS
      </v-btn>
    </div>
  </v-container>

</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useContractorStore } from '@/stores/contractorStore';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  import { getAuth } from 'firebase/auth';

  const activeTab = ref('dashboard');

  function getCurrentUserEmail () {
    const auth = getAuth();
    const user = auth.currentUser;
    return user?.email || '';
  }


  function navigateTo (tab: string) {
    if (tab === 'newJob') router.push('/newJob');
    else if (tab === 'pastJobs') router.push('/pastJobs');
  }

  const contractorStore = useContractorStore();

  onMounted(() => {
    const email = getCurrentUserEmail();
    contractorStore.fetchProfile(email);
  });


  const today = new Date().toLocaleDateString();
</script>
