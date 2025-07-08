<template>
  <div>
    <h2 class="text-xl font-bold mb-6">Past Jobs</h2>

    <!-- Loading, error, empty states -->
    <v-alert v-if="loading" border="start" color="primary" type="info" variant="tonal">
      Loading jobs...
    </v-alert>

    <v-alert v-else-if="error" border="start" color="error" type="error" variant="tonal">
      Something went wrong. Please try again.
    </v-alert>

    <v-alert
      v-else-if="!jobSummaries.length"
      border="start"
      color="warning"
      type="warning"
      variant="tonal"
    >
      No jobs found.
    </v-alert>
    <v-row v-else dense>
      <v-col v-for="job in jobSummaries" :key="job.jobId" cols="12" lg="4" md="6">
        <v-card class="elevation-2">
          <v-card-title class="text-lg font-semibold">
            {{ job.address }}
          </v-card-title>

          <v-card-subtitle class="text-sm text-gray-500">
            {{ formatDate(job.date) }}
          </v-card-subtitle>

          <v-card-text class="mt-2">
            <div><strong>Total:</strong> {{ formatCurrency(job.grandTotalAmount) }}</div>
            <div class="text-sm text-gray-600">
              Tax: {{ formatCurrency(job.taxAmount) }} <br />
              Savings: {{ formatCurrency(job.savingsAmount) }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" variant="text" @click="viewDetails(job)">View Details</v-btn>
            <v-btn color="success" variant="text" @click="generatePDF(job)">Download PDF</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useContractorJobsStore } from '@/stores/contractorJobStore'

const jobsStore = useContractorJobsStore()
const { fetchPastJobs, jobSummaries, loading, error } = jobsStore

onMounted(() => {
  fetchPastJobs()
})

// Formatting helpers
const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(Number(value))

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })

// Button handlers (to be implemented)
const viewDetails = (job: any) => {
  console.log('TODO: open job details modal or route', job)
}

const generatePDF = (job: any) => {
  console.log('TODO: call PDF generator with job data', job)
}
</script>
