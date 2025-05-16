<script setup lang="ts">

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
          <p><strong>Job Date:</strong> {{ submittedJob.date }}</p>
          <p><strong>Address:</strong> {{ submittedJob.address }}</p>
          <p><strong>Notes:</strong> {{ submittedJob.notes || 'No additional notes.' }}</p>

          <p><strong>Items:</strong></p>
          <ul>
            <li v-for="item in submittedJob.billables" :key="item.billableType">
              {{ item.billableType }} - Quantity: {{ item.quantity }}
            </li>
          </ul>
        </div>

        <!-- ✅ Action Buttons -->
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

        <v-btn
          class="text-white text-h6 px-10 py-4"
          color="orange-darken-2"
          size="large"
          @click="goToDashboard"
        >
          🚀 Submit Another Job
        </v-btn>
      </div>
    </div>

    <!-- ✅ Fallback if submittedJob is null (user landed here without submitting) -->
    <div v-else>
      <h2 class="text-h4 font-weight-bold mb-4">No Job Submission Found</h2>
      <v-btn
        class="text-white text-h6 px-10 py-4"
        color="orange-darken-2"
        size="large"
        @click="goToDashboard"
      >
        Go Back to Dashboard
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped lang="sass">

</style>
