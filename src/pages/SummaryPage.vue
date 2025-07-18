<template>
  <v-container class="py-6 px-4" fluid>
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="8">
        <!-- <v-img class="mx-auto mb-4" max-width="200" src="@/assets/IPD-Buddy.png" /> -->
        <v-card class="pa-6 elevation-2 rounded-xl text-center">
          <div class="text-subtitle-2 text-grey-darken-1 mb-1">Job Submitted Successfully</div>
          <h2 class="text-h4 font-weight-bold mb-6">Here’s What You Logged</h2>

          <!-- Job Details -->
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-icon start class="mr-1">mdi-calendar</v-icon>
              <strong>Job Date:</strong> {{ date }}
            </v-col>
            <v-col cols="12" sm="6">
              <v-icon start class="mr-1">mdi-map-marker</v-icon>
              <strong>Address:</strong> {{ address }}
            </v-col>
            <v-col cols="12">
              <v-icon start class="mr-1">mdi-note-text</v-icon>
              <strong>Notes:</strong> {{ notes }}
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <!-- Items -->
          <div class="text-left mb-3">
            <v-icon class="mr-1" start>mdi-package-variant</v-icon>
            <strong>Items:</strong>
          </div>
          <v-list class="rounded-lg elevation-1">
            <v-list-item v-for="(item, index) in displayedItems" :key="index" class="mb-2">
              <template #prepend>
                <v-icon color="orange-darken-2">mdi-tools</v-icon>
              </template>
              <v-list-item-title>{{ formatBillableLabel(item.name) }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.quantity }} × ${{ item.rate.toFixed(2) }} = ${{ item.total.toFixed(2) }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-divider class="my-4" />

          <!-- Buttons -->
          <v-row dense class="mt-2 mb-4">
            <v-col cols="12" sm="6">
              <v-btn block color="orange-darken-2" class="text-white" @click="generateEmployerPdf">
                📝 Generate Employer PDF
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn block color="orange-darken-2" class="text-white" @click="generatePersonalPdf">
                🧾 Generate Personal PDF
              </v-btn>
            </v-col>
          </v-row>

          <v-btn block color="green-darken-2" class="text-white" @click="goToJobPage">
            ➕ Log Another Job
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useJobStore } from '@/stores/jobStore';
import { useContractorStore } from '@/stores/contractorStore';
import { computed } from 'vue';
import { BILLABLE_RATES } from '@/utils/BillableRates.ts';
import { generatePdfForPersonalRecord, generatePdfForSubmission } from '@/utils/pdfGenerator.ts';
import type { BillableItemSummary } from '@/types';
import {
  formatBillableLabel,
  getFormattedBillableItemsForPDF,
} from '@/utils/billableLabelFormatter.ts';
import { useRouter } from 'vue-router';

const router = useRouter();
const jobStore = useJobStore();
const contractorStore = useContractorStore();
const submittedJob = jobStore.submittedJob;

function goToJobPage() {
  jobStore.resetJob();
  router.push('/NewJob');
}

const displayedItems = computed(() => {
  return (
    submittedJob?.billableItemsSummary?.map((item: BillableItemSummary) => {
      const rate = BILLABLE_RATES[item.name]?.rate || 0;
      const total = item.quantity * rate;
      return {
        name: item.name,
        quantity: item.quantity,
        rate,
        total,
      };
    }) || []
  );
});

// Grabbing date, address and notes from the first item in the submitted job
const firstItem = submittedJob?.billableItemsSummary?.[0];

const date = firstItem?.jobDate || 'Unknown';
const address = firstItem?.jobAddress || 'Unknown';
const notes = submittedJob?.notes || 'No additional notes.';

const rawBillables = submittedJob?.billableItemsSummary.map((item) => ({
  type: item.name,
  quantity: item.quantity,
  rate: item.rate,
  total: item.total,
}));

console.log('rawBillables', rawBillables);

const formatedBillables = rawBillables?.map((item) => ({
  type: formatBillableLabel(item.type),
  quantity: item.quantity,
  rate: item.rate,
  total: item.total,
}));

console.log('formatedBillables', formatedBillables);

function generateEmployerPdf() {
  if (!submittedJob) return;

  //const formattedItems = getFormattedBillableItemsForPDF(submittedJob.billableItemsSummary);

  generatePdfForSubmission(
    {
      job: {
        date: firstItem?.jobDate || 'Unknown',
        address: firstItem?.jobAddress || 'Unknown',
        notes: submittedJob.notes || 'No additional notes.',
      },
      contractor: {
        firstName: contractorStore.profile.firstName || 'No First name provided.',
        lastName: contractorStore.profile.lastName || 'No Last name provided.',
      },
      billableItemsSummary: formatedBillables,
      // billableItemsSummary: submittedJob.billableItemsSummary.map(item => ({
      //   type: formatBillableLabel(item.name),
      //   quantity: item.quantity,
      //   rate: item.rate,
      //   total: item.total,
      // })),
    },
    {
      grandTotalAmount: submittedJob.grandTotalAmount,
    }
  );
}

function generatePersonalPdf() {
  if (!submittedJob) return;

  const formattedItems = getFormattedBillableItemsForPDF(submittedJob.billableItemsSummary);

  generatePdfForPersonalRecord(
    {
      job: {
        date: firstItem?.jobDate || 'Unknown',
        address: firstItem?.jobAddress || 'Unknown',
        notes: submittedJob.notes || 'No additional notes.',
      },
      contractor: {
        firstName: contractorStore.profile.firstName || 'No First name provided.',
        lastName: contractorStore.profile.lastName || 'No Last name provided.',
      },
      billableItemsSummary: formatedBillables,
      // billableItemsSummary: submittedJob.billableItemsSummary.map(item => ({
      //   type: formatBillableLabel(item.name),
      //   quantity: item.quantity,
      //   rate: item.rate,
      //   total: item.total,
      // })),
    },
    {
      grandTotalAmount: submittedJob.grandTotalAmount,
      taxAmount: submittedJob.taxAmount,
      savingsAmount: submittedJob.savingsAmount,
    }
  );
}
</script>

<style scoped lang="sass"></style>
