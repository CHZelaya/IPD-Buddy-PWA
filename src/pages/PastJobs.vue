<template>
  <v-container fluid class="d-flex flex-column flex-grow-1" style="max-width: 1200px; margin: auto">
    <v-container fluid>
      <v-container class="pt-0 mt-0 mb-6" fluid>
        <!-- Helper Text Section -->
        <v-alert
          border="start"
          icon="mdi-information-outline"
          type="info"
          variant="text"
          elevation="0"
          class="mb-4 text-body-2 pa-2"
        >
          Filter your jobs by date range. Then click the PDF button to generate a summary report
          based on your filtered jobs.
        </v-alert>
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
              <v-date-picker
                v-model="endDate"
                @update:model-value="endMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>

      <!-- Clear Filters Button -->
      <v-row class="mb-4" align="center" justify="center">
        <v-col cols="12" md="3" class="d-flex justify-center">
          <v-btn
            block
            color="secondary"
            variant="outlined"
            @click="
              () => {
                startDate = null;
                endDate = null;
              }
            "
          >
            CLEAR FILTERS
          </v-btn>
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-center">
          <v-btn block color="orange-darken-2" class="text-white" @click="PayPeriodPdf">
            DOWNLOAD PAY PERIOD SUMMARY PDF
          </v-btn>
        </v-col>
      </v-row>

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
            <!-- 
            <v-card-actions>
              <v-btn color="primary" variant="text" @click="viewDetails(job)">View Details</v-btn>
              <v-btn color="success" variant="text" @click="generatePDF(job)">Download PDF</v-btn>
            </v-card-actions> -->
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
import { useContractorStore } from '@/stores/contractorStore';
import { generatePdfForPayPeriod } from '@/utils/pdfGenerator';

const jobsStore = useContractorJobsStore();
const { fetchPastJobs } = jobsStore;
const { jobSummaries, loading, error } = storeToRefs(jobsStore);
const contractorStore = useContractorStore();

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

const summaryTotals = computed(() => {
  return filteredJobs.value.reduce(
    (acc, job) => {
      acc.total += Number(job.grandTotalAmount || 0);
      acc.tax += Number(job.taxAmount || 0);
      acc.savings += Number(job.savingsAmount || 0);
      return acc;
    },
    { total: 0, tax: 0, savings: 0 }
  );
});

const PayPeriodPdf = () => {
  if (!filteredJobs.value.length) return;

  const jobEntries = filteredJobs.value.map((job) => ({
    jobId: job.jobId,
    date: job.date,
    address: job.address,
    grandTotalAmount: job.grandTotalAmount,
    taxAmount: job.taxAmount,
    savingsAmount: job.savingsAmount,
  }));

  generatePdfForPayPeriod({
    contractor: {
      firstName: contractorStore.profile.firstName,
      lastName: contractorStore.profile.lastName,
    },
    jobs: jobEntries,
    totals: summaryTotals.value,
    payPeriod: {
      start: startDate.value,
      end: endDate.value,
    },
  });
};

// //Function to generate the Pay Period PDF
// const generatePayPeriodPdf = () => {
//   if (!filteredJobs.value.length) return;

//   const jobEntries = filteredJobs.value.map((job) => ({
//     date: job.date,
//     address: job.address,
//     total: job.grandTotalAmount,
//     tax: job.taxAmount,
//     savings: job.savingsAmount,
//   }));

//   generatePdfForPayPeriod({
//     contractor: {
//       firstName: contractorStore.profile.firstName,
//       lastName: contractorStore.profile.lastName,
//     },
//     jobs: jobEntries,
//     totals: summaryTotals.value,
//     payPeriod: {
//       start: startDate.value,
//       end: endDate.value,
//     },
//   });
// };

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
