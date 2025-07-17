<template>
  <v-container fluid class="d-flex flex-column flex-grow-1" style="max-width: 1200px; margin: auto">
    <v-container fluid>
      <v-row dense class="mb-4">
        <v-col cols="12" md="6">
          <!-- Start Date Picker -->
          <v-menu
            v-model="startMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template #activator="{ props }">
              <v-text-field
                v-bind="props"
                v-model="startDate"
                label="Start Date"
                prepend-icon="mdi-calendar-start"
                readonly
              />
            </template>
            <v-date-picker
              v-model="startDate"
              @update:model-value="startMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="6">
          <!-- End Date Picker -->
          <v-menu
            v-model="endMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template #activator="{ props }">
              <v-text-field
                v-bind="props"
                v-model="endDate"
                label="End Date"
                prepend-icon="mdi-calendar-end"
                readonly
              />
            </template>
            <v-date-picker v-model="endDate" @update:model-value="endMenu = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <!-- Clear Filters Button -->
      <v-btn
        class="mb-4"
        color="secondary"
        variant="outlined"
        @click="
          () => {
            startDate = null;
            endDate = null;
          }
        "
      >
        Clear Filters
      </v-btn>

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
        <v-col v-for="job in filteredJobs" :key="job.jobId" cols="12" lg="4" md="6">
          <v-card class="elevation-2 d-flex flex-column justify-space-between h-100">
            <template v-slot:title>
              <span class="font-weight-black" style="white-space: normal; word-break: break-word">{{
                job.address
              }}</span>
            </template>

            <v-card-subtitle class="text-sm text-gray-500">
              {{ formatDate(job.date) }}
            </v-card-subtitle>

            <v-card-text class="bg-surface-light pt-4 mt-2">
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
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useContractorJobsStore } from '@/stores/contractorJobsStore';

const jobsStore = useContractorJobsStore();
const { fetchPastJobs } = jobsStore;
const { jobSummaries, loading, error } = storeToRefs(jobsStore);

const startDate = ref(null);
const endDate = ref(null);

const startMenu = ref(false);
const endMenu = ref(false);

const filteredJobs = computed(() => {
  if (!startDate.value || !endDate.value) return jobSummaries.value;

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  return jobSummaries.value.filter((job) => {
    const jobDate = new Date(job.date);
    return jobDate >= start && jobDate <= end;
  });
});

onMounted(() => {
  fetchPastJobs();
});

// Formatting helpers
const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(Number(value));

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });

// Button handlers (to be implemented)
const viewDetails = (job: any) => {
  console.log('TODO: open job details modal or route', job);
};

const generatePDF = (job: any) => {
  console.log('TODO: call PDF generator with job data', job);
};
</script>
