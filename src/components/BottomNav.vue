<template>
  <v-bottom-navigation app fixed :elevation="24" grow mode="shift" :model-value="activeTab">
    <v-btn value="dashboard" @click="navigateTo('dashboard')">
      <v-icon>mdi-home</v-icon>

      <span>Dashboard</span>
    </v-btn>

    <v-btn value="profile" @click="navigateTo('profile')">
      <v-icon>mdi-account</v-icon>

      <span>Profile</span>
    </v-btn>
    <v-btn value="newJob" @click="navigateTo('newJob')">
      <v-icon>mdi-plus-box</v-icon>
      <span>New Job</span>
    </v-btn>

    <v-btn value="pastJobs" @click="navigateTo('pastJobs')">
      <v-icon>mdi-history</v-icon>
      <span>Past Jobs</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
defineProps<{
  activeTab?: string;
  navigateTo: (tab: string) => void;
}>();
</script>

<style scoped lang="sass"></style>
