<script setup lang="ts">
  import { useJobStore } from '@/stores/jobStore';
  import { useContractorStore } from '@/stores/contractorStore';
  import { computed } from 'vue';
  import { BILLABLE_RATES } from '@/utils/BillableRates.ts';
  import { generatePdfForPersonalRecord, generatePdfForSubmission } from '@/utils/pdfGenerator.ts';
  import type { BillableItemSummary } from '@/types/JobSubmissionResponseDTO.ts';

  const jobStore = useJobStore();
  const contractorStore = useContractorStore();
  const submittedJob = jobStore.submittedJob;

  const displayedItems = computed(() => {
    return submittedJob?.billableItemsSummary?.map((item: BillableItemSummary) => {
      const rate = BILLABLE_RATES[item.name]?.rate || 0;
      const total = item.quantity * rate;
      return {
        name: item.name,
        quantity: item.quantity,
        rate,
        total,
      };
    }) || [];
  });

  // Grabbing date, address and notes from the first item in the submitted job
  const firstItem = submittedJob?.billableItemsSummary?.[0];

  const date = firstItem?.jobDate || 'Unknown';
  const address = firstItem?.jobAddress || 'Unknown';
  const notes = submittedJob?.notes || 'No additional notes.';

  //Todo: Continue refactoring the SummaryPage.vue file to use the new JobSubmissionResponseDTO.ts file and work with the response to display the correct information.

  function generateEmployerPdf () {
    if (!submittedJob) return;

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
        billableItemsSummary: submittedJob.billableItemsSummary.map(item => ({
          type: item.name,
          quantity: item.quantity,
          rate: item.rate,
          total: item.total,
        })),
      },
      {
        grandTotalAmount: submittedJob.grandTotalAmount,
      }
    );
  }

  function generatePersonalPdf () {
    if (!submittedJob) return;

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
        billableItemsSummary: submittedJob.billableItemsSummary.map(item => ({
          type: item.name,
          quantity: item.quantity,
          rate: item.rate,
          total: item.total,
        })),
      },
      {
        grandTotalAmount: submittedJob.grandTotalAmount,
        taxAmount: submittedJob.taxAmount,
        savingsAmount: submittedJob.savingsAmount,
      }
    );
  }


</script>

<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center" fluid>
    <v-img class="mb-4" max-height="200" src="@/assets/IPD-Buddy.png" />

    <div class="mb-8 text-center">
      <div class="text-body-2 font-weight-light mb-n1">Job Submitted Successfully</div>
      <h1 class="text-h2 font-weight-bold mb-4">Here’s What You Logged</h1>

      <div class="text-subtitle-1 font-weight-light mb-4">
        <p><strong>Job Date:</strong> {{ date }}</p>
        <p><strong>Address:</strong> {{ address }}</p>
        <p><strong>Notes:</strong> {{ notes }}</p>

        <p><strong>Items:</strong></p>
        <ul>
          <li v-for="(item, index) in displayedItems" :key="index">
            {{ item.name }} - Qty: {{ item.quantity }} @ ${{ item.rate }} - Total: ${{ item.total }}
          </li>
        </ul>
      </div>
    </div>

    <v-btn class="text-white text-h6 px-10 py-4 mb-4" color="orange-darken-2" size="large" @click="generateEmployerPdf">
      📝 Generate Employer PDF
    </v-btn>
    <v-btn class="text-white text-h6 px-10 py-4 mb-4" color="orange-darken-2" size="large" @click="generatePersonalPdf">
      🧾 Generate Personal PDF
    </v-btn>
  </v-container>
</template>

<style scoped lang="sass">
</style>
