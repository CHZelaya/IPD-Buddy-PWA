<script setup lang="ts">
  import { useJobStore } from '@/stores/jobStore';
  import { useRouter } from 'vue-router';
  // import { generatePdfForPersonalRecord, generatePdfForSubmission } from '@/utils/pdfGenerator.ts';

  const jobStore = useJobStore();
  const router = useRouter();

  const submittedJob = jobStore.submittedJob;

  // 📝 Placeholder PDF Generators
  function generateEmployerPdf () {
    console.log('Generating Employer PDF with data:', submittedJob);
    alert(' PDF is not yet implemented. Demo version only.')
    // generatePdfForSubmission(
    //   {
    //     job: {
    //       date: submittedJob.date,
    //       address: submittedJob.address,
    //       notes: submittedJob.notes,
    //     },
    //     contractor: {
    //       firstName: 'YourBuddyFirstName',
    //       lastName: 'YourBuddyLastName',
    //     },
    //     billableItemsSummary: submittedJob.billables.map(item => ({
    //       type: item.billableType,
    //       quantity: item.quantity,
    //       rate: 0, // Optional: Inject real rates if you have them
    //       total: 0, // Optional: Inject real totals if you have them
    //     })),
    //   },
    //   {
    //     grandTotalAmount: submittedJob.grandTotalAmount || 0,
    //   }
    // );
  }

  function generatePersonalPdf () {
    console.log('Generating Personal PDF with data:', submittedJob);
    alert(' PDF is not yet implemented. Demo version only.')

    // generatePdfForPersonalRecord(
    //   {
    //     job: {
    //       date: submittedJob.date,
    //       address: submittedJob.address,
    //       notes: submittedJob.notes,
    //     },
    //     contractor: {
    //       firstName: 'YourBuddyFirstName',
    //       lastName: 'YourBuddyLastName',
    //     },
    //     billableItemsSummary: submittedJob.billables.map(item => ({
    //       type: item.billableType,
    //       quantity: item.quantity,
    //       rate: 0, // Optional: Inject real rates if you have them
    //       total: 0, // Optional: Inject real totals if you have them
    //     })),
    //   },
    //   {
    //     grandTotalAmount: submittedJob.grandTotalAmount || 0,
    //     taxAmount: submittedJob.taxAmount || 0,
    //     savingsAmount: submittedJob.savingsAmount || 0,
    //   }
    // );
  }

  function goToDashboard () {
    router.push('/');
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
          <p><strong>Job Date:</strong> {{ submittedJob.date || 'Unknown' }}</p>
          <p><strong>Address:</strong> {{ submittedJob.address || 'Unknown' }}</p>
          <p><strong>Notes:</strong> {{ submittedJob.notes || 'No additional notes.' }}</p>

          <p><strong>Items:</strong></p>
          <ul>
            <li v-for="item in submittedJob.billableItemsSummary || submittedJob.billables" :key="item.billableType || item.name">
              {{ item.billableType || item.name }} - Quantity: {{ item.quantity }}
            </li>
          </ul>
        </div>

        <!-- ✅ Action Buttons -->
        <v-btn class="text-white text-h6 px-10 py-4 mb-4" color="orange-darken-2" size="large" @click="generateEmployerPdf">
          📝 Generate Employer PDF
        </v-btn>
        <v-btn class="text-white text-h6 px-10 py-4 mb-4" color="orange-darken-2" size="large" @click="generatePersonalPdf">
          🧾 Generate Personal PDF
        </v-btn>
      </div>
    </div>

    <!-- Fallback for if no job was ever submitted -->
    <div v-else>
      <h2 class="text-h4 font-weight-bold mb-4">No Job Submission Found</h2>
      <v-btn class="text-white text-h6 px-10 py-4" color="orange-darken-2" size="large" @click="goToDashboard">
        Go Back to Dashboard
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped lang="sass">

</style>
