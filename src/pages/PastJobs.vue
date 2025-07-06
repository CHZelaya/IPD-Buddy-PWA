<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Past Jobs</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Something went wrong. Try again.</div>
    <div v-else-if="!pastJobs.length">No jobs found.</div>
    <ul v-else>
      <li v-for="job in pastJobs" :key="job.id" class="mb-2 border p-2 rounded shadow">
        <div class="font-semibold">{{ job.title }}</div>
        <div>{{ job.date }}</div>
        <div>{{ job.address }}</div>
        <!-- Add more fields as needed -->
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useContractorJobsStore } from '@/stores/contractorJobsStore'

  const jobsStore = useContractorJobsStore()
  const { fetchPastJobs, pastJobs, loading, error } = jobsStore

  onMounted(() => {
    fetchPastJobs()
  })
</script>
