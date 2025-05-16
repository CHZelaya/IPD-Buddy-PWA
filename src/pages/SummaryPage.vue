<script setup lang="ts">
  import { useJobStore } from '@/stores/jobStore';
  import { computed } from 'vue';
  import type { JobSubmissionPayload } from '@/types/JobSubmissionPayload.ts';
  import type { JobSubmissionResponseDTO } from '@/types/JobSubmissionResponseDTO.ts';
  import { generatePdfForPersonalRecord, generatePdfForSubmission } from '@/utils/pdfGenerator.ts';
  import { BILLABLE_RATES } from '@/utils/BillableRates.ts';
  import { useContractorStore } from '@/stores/contractorStore';

  const contractorStore = useContractorStore();

  const jobStore = useJobStore();

  const submittedJob = jobStore.submittedJob;

  const displayedItems = computed(() => {
    if (submittedJob && 'billableItemsSummary' in submittedJob && Array.isArray(submittedJob.billableItemsSummary)) {
      return submittedJob.billableItemsSummary.map(item => ({
        name: item.name,
        quantity: item.quantity,
        rate: item.rate,
        total: item.total,
      }));
    }

    if (submittedJob && 'billables' in submittedJob && Array.isArray(submittedJob.billables)) {
      return submittedJob.billables.map(item => ({
        name: item.billableType,
        quantity: item.quantity,
        rate: null,
        total: null,
      }));
    }

    return [];
  });

  // 📝 Employer PDF
  function generateEmployerPdf () {
    const jobData = submittedJob as any;

    const items = (jobData.billableItemsSummary || jobData.billables || []).map((item: any) => {
      const type = item.billableType || item.name;
      const quantity = item.quantity;
      const rate = BILLABLE_RATES[type]?.rate || 0;
      const total = quantity * rate;
      return { type, quantity, rate, total };
    });

    generatePdfForSubmission(
      {
        job: {
          date: jobData.date || jobData.billableItemsSummary?.[0]?.jobDate || 'Unknown',
          address: jobData.address || jobData.billableItemsSummary?.[0]?.jobAddress || 'Unknown',
          notes: jobData.notes || 'No additional notes.',
        },
        contractor: {
          firstName: contractorStore.profile.firstName || 'No First name provided.',
          lastName: contractorStore.profile.lastName || 'No Last name provided.',
        },
        billableItemsSummary: items,
      },
      {
        grandTotalAmount: items.reduce((sum: number, i: any) => sum + i.total, 0),
      }
    );
  }

  function generatePersonalPdf () {
    const jobData = submittedJob as any;
    const contractorStore = useContractorStore();

    const items = (jobData.billableItemsSummary || jobData.billables || []).map((item: any) => {
      const type = item.billableType || item.name;
      const quantity = item.quantity;
      const rate = BILLABLE_RATES[type]?.rate || 0;
      const total = quantity * rate;
      return { type, quantity, rate, total };
    });

    const grandTotal = items.reduce((sum: number, i: any) => sum + i.total, 0);
    const taxRate = contractorStore.profile.taxRate || 0;
    const savingsRate = contractorStore.profile.savingsRate || 0;
    const calculatedTax = grandTotal * taxRate;
    const calculatedSavings = grandTotal * savingsRate;

    generatePdfForPersonalRecord(
      {
        job: {
          date: jobData.date || jobData.billableItemsSummary?.[0]?.jobDate || 'Unknown',
          address: jobData.address || jobData.billableItemsSummary?.[0]?.jobAddress || 'Unknown',
          notes: jobData.notes || 'No additional notes.',
        },
        contractor: {
          firstName: contractorStore.profile.firstName || 'No First name provided.',
          lastName: contractorStore.profile.lastName || 'No Last name provided.',
        },
        billableItemsSummary: items,
      },
      {
        grandTotalAmount: grandTotal,
        taxAmount: calculatedTax,
        savingsAmount: calculatedSavings,
      }
    );
  }


  function isResponseFormat (
    job: JobSubmissionPayload | JobSubmissionResponseDTO | null
  ): job is JobSubmissionResponseDTO {
    return job !== null && 'billableItemsSummary' in job;
  }
</script>


<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center" fluid>
    <div v-if="submittedJob">
      <v-img
        class="mb-4"
        max-height="200"
        src="@/assets/IPD-Buddy.png"
      />

      <div class="mb-8 text-center">
        <div class="text-body-2 font-weight-light mb-n1">Job Submitted Successfully</div>
        <h1 class="text-h2 font-weight-bold mb-4">Here’s What You Logged</h1>

        <!-- ✅ Display Job Details -->
        <div class="text-subtitle-1 font-weight-light mb-4">
          <p><strong>Job Date:</strong>
            {{ isResponseFormat(submittedJob)
              ? (submittedJob.billableItemsSummary[0]?.jobDate || 'Unknown')
              : (submittedJob?.date || 'Unknown')
            }}
          </p>

          <p><strong>Address:</strong>
            {{ isResponseFormat(submittedJob)
              ? (submittedJob.billableItemsSummary[0]?.jobAddress || 'Unknown')
              : (submittedJob?.address || 'Unknown')
            }}
          </p>

          <p><strong>Notes:</strong>
            {{
              isResponseFormat(submittedJob)
                ? 'No notes available in response.'
                : (submittedJob?.notes || 'No additional notes.')
            }}
          </p>

          <p><strong>Items:</strong></p>
          <!-- ✅ Handle API Response Format -->
          <ul v-if="submittedJob">
            <li v-for="(item, index) in displayedItems" :key="index">
              {{ item.name }} - Qty: {{ item.quantity }}
              <span v-if="item.rate !== null"> @ ${{ item.rate }} </span>
              <span v-if="item.total !== null"> - Total: ${{ item.total }} </span>
            </li>
          </ul>

          <!-- ✅ Handle Local Payload Format -->
          <ul v-else>
            <li v-for="item in submittedJob" :key="item">
              {{ item }} - Quantity: {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- ✅ Action Buttons -->
      <v-btn class="text-white text-h6 px-10 py-4 mb-4" color="orange-darken-2" size="large" @click="generateEmployerPdf">
        📝 Generate Employer PDF
      </v-btn>
      <v-btn class="text-white text-h6 px-10 py-4 mb-4" color="orange-darken-2" size="large" @click="generatePersonalPdf">
        🧾 Generate Personal PDF
      </v-btn>
    </div>

    <!-- Fallback for if no job was ever submitted -->
    <div v-else>
      <h2 class="text-h4 font-weight-bold mb-4">No Job Submission Found</h2>
      <p class="text-h4 font-weight-bold mb-4">
        Please navigate back to the dashboard using the bottom menu
      </p>


    </div>
  </v-container>
</template>

<style scoped lang="sass">

</style>
