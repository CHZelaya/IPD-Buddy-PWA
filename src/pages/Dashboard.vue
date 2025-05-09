<template>
  <div>
    <h1>Welcome back, {{ contractorStore.profile.firstName }}!</h1>
    <p>Phone: {{ contractorStore.profile.phoneNumber }}</p>
    <p>Email: {{ contractorStore.profile.email }}</p>
    <p>Tax Rate: {{ contractorStore.profile.taxRate * 100 }}%</p>
    <p>Savings Rate: {{ contractorStore.profile.savingsRate * 100 }}%</p>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useContractorStore } from '@/stores/contractorStore';

  const contractorStore = useContractorStore();

  onMounted(() => {
    contractorStore.fetchProfile();
  });
</script>
