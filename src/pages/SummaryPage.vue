<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center" fluid>
    <v-img class="mb-4" max-height="200" src="@/assets/IPD-Buddy.png" />

    <!--    <div class="mb-8 text-center">-->
    <v-card class="pa-4 mb-6 elevation-2 rounded-xl">
      <div class="text-body-2 font-weight-light mb-n1">Job Submitted Successfully</div>
      <h1 class="text-h2 font-weight-bold mb-4">Here’s What You Logged</h1>

      <!-- Job Details Section -->
      <v-card-text>
        <v-row dense>
          <v-col cols="12" sm="6">
            <v-icon class="mr-1" start>mdi-calendar</v-icon>
            <p><strong>Job Date:</strong> {{ date }}</p>
          </v-col>

          <v-col cols="12" sm="6">
            <v-icon class="mr-1" start>mdi-map-marker</v-icon>
            <p><strong>Address:</strong> {{ address }}</p>
          </v-col>

          <v-col cols="auto" sm="6">
            <v-icon class="mr-1" start>mdi-note-text</v-icon>
            <p><strong>Notes:</strong> {{ notes }}</p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="my-3" />

      <!-- Billables Section -->

      <p class="mb-2">
        <v-icon class="mr-1" start>mdi-package-variant</v-icon>
        <strong>Items:</strong>
      </p>

      <v-list class="rounded-lg" density="compact">
        <v-list-item
          v-for="(item, index) in displayedItems"
          :key="index"
          class="bg-grey-lighten-4 mb-2 rounded"
        >
          <template #prepend>
            <v-icon>mdi-tools</v-icon>
          </template>
          <v-list-item-title class="text-body-2">
            {{ formatBillableLabel(item.name) }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
    <!--    </div>-->

    <v-btn
      class="text-white text-h6 px-10 py-4 mb-4"
      color="orange-darken-2"
      size="large"
      @click="generateEmployerPdf"
    >
      📝 Generate Employer PDF
    </v-btn>
    <v-btn
      class="text-white text-h6 px-10 py-4 mb-4"
      color="orange-darken-2"
      size="large"
      @click="generatePersonalPdf"
    >
      🧾 Generate Personal PDF
    </v-btn>
    <v-btn block class="mt-4" color="green-darken-2" @click="goToJobPage"> Log Another Job </v-btn>
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
