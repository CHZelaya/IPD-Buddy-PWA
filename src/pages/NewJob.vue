<script setup lang="ts">
  import { ref } from 'vue'
  // import type { Ref } from 'vue'
  import { useJobStore } from '@/stores/jobStore';
  import { useRouter } from 'vue-router';
  import type { BillableItem } from '@/types/BillableItems.ts';

  const jobStore = useJobStore();
  const router = useRouter();

  //
  // interface BillableItem {
  //   id: string;
  //   label: string;
  //   description?: string;
  //   model: number | boolean;
  //   type: 'quantity' | 'toggle';
  //   max?: number;
  // }


  const address = computed({
    get: () => jobStore.address,
    set: (value: string) => jobStore.address = value,
  })

  const notes = computed({
    get: () => jobStore.notes,
    set: (value: string) => jobStore.notes = value,
  })

  //Date picker
  const today = new Date().toISOString().split('T')[0];
  const jobDate = computed({
    get: () => jobStore.date,
    set: (value: string) => jobStore.date = value,
  })
  //Setting the default date for the job as "today" in case date isnt picked.
  jobStore.date = today;


  // Validation rules for Job Address
  const rules = [
    (value: string) => {
      if (value) return true
      return 'You must enter an address before submitting the job.'
    },
  ]

  // Building the billable items and their components
  const billableItems = ref<BillableItem[]>([
    { id: 'INSULATION', label: 'Insulation', description: '$30.00 per bag', model: ref(0), type: 'quantity' },
    { id: 'DRYWALL', label: 'Drywall', description: '$20.00 per sheet', model: ref(0), type: 'quantity' },
    { id: 'FIRE_CAULKING', label: 'Fire Caulking', description: '$5.00 each (max 15 units)', model: ref(0), type: 'quantity', max: 15 },
    { id: 'FIRE_CAULKING_MATTAMY_HOUSE', label: 'Fire Caulking', description: '$25.00 per floor (Mattamy)', model: ref(0), type: 'quantity' },
    { id: 'SCAFFOLDING', label: 'Scaffolding', description: '$25.00 per section', model: ref(0), type: 'quantity' },
    { id: 'HIGH_GARAGE_BULKHEAD', label: 'Garage Bulkhead', description: '$35.00 per bulkhead', model: ref(0), type: 'quantity' },
    { id: 'SCRAP_OUT', label: 'Scrap Out', description: '$25.00', model: ref(false), type: 'toggle' },
    { id: 'PINCH_POINT_STRIPS_SINGLE_FAMILY_HOME', label: 'Pinch Point Strips', description: '$40.00 (Single family home)', model: ref(false), type: 'toggle' },
    { id: 'PINCH_POINT_STRIPS_DUPLEX', label: 'Pinch Point Strips', description: '$50.00 (Duplex)', model: ref(false), type: 'toggle' },
    { id: 'POLY_ONLY_SMALL', label: 'Poly Only', description: '$25.00 (small)', model: ref(false), type: 'toggle' },
    { id: 'POLY_ONLY_LARGE', label: 'Poly Only', description: '$50.00 (large)', model: ref(false), type: 'toggle' },
    { id: 'SUITED_MECH_ROOM_RES_BAR', label: 'Mech Room and Res-bar', description: '$65.00 per install', model: ref(false), type: 'toggle' },
    { id: 'STEEL_FRAMING_AND_BOARD', label: 'Steel Framing and Board', description: '$500.00', model: ref(false), type: 'toggle' },
    { id: 'BOARD_ONLY', label: 'Board Only', description: '$300.00', model: ref(false), type: 'toggle' },
    { id: 'SECOND_MECH_ROOM', label: 'Second Mech Room', description: '$150.00', model: ref(false), type: 'toggle' },
    { id: 'FIRE_TAPING_MECH_ROOM_CEILING', label: 'Fire Taping Mech Room Ceiling', description: '$225.00', model: ref(false), type: 'toggle' },
    { id: 'FIRE_TAPING_SECOND_MECH_ROOM', label: 'Fire Taping Second Mech Room', description: '$100.00', model: ref(false), type: 'toggle' },
  ])

  //Job submission
  function submitJob () {
    //Blank address check
    if (!address.value.trim()) {
      console.warn('Submission blocked: address is empty')
      return
    }

    console.log('Submitting Job')

    // const payload = {
    //   address:address.value,
    //   date: jobDate.value,
    //   notes: notes.value,
    //   billables: prepareBillables(),
    // }

    console.log('Submitting job`s billables')
    jobStore.syncBillablesFromComponentStore(billableItems.value as BillableItem[])
    jobStore.submitJob()
      .then(response => {
        console.log('✅ Job Submission Response:', response);
        router.push('/job/success');
      })
      .catch(error => {
        console.error('❌ Failed to submit job:', error.response?.data || error.message);

        // 🟢 Proceed anyway, because you have fallback data
        router.push('/job/success');
      });


  }

</script>


<template>
  <v-container class="pa-2 pa-md-6">


    <v-form @submit.prevent="submitJob">
      <v-card
        class="mx-auto my-2 pa-2 pa-md-4"
        max-width="600"
      >
        <v-card-text>

          <p class="text-h4 font-weight-black">Log Today's Work</p>

          <div class="text-medium-emphasis">
            Log it. Bill it. Bank it.
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mx-auto my-2 pa-2 pa-md-4" max-width="600">
        <v-text-field
          v-model="address"
          label="Job Address"
          :rules="rules"
        />
        <v-container>
          <v-row justify="center">
            <v-date-picker v-model="jobDate" width="400" />
          </v-row>
        </v-container>
      </v-card>

      <!-- Quantity-Based Item -->
      <v-card class="mx-auto my-2 pa-2 pa-md-4" max-width="600">
        <v-row
          v-for="(item, index) in billableItems"
          :key="index"
          class="align-center mb-4"
          justify="space-between"
        >
          <v-col cols="8">
            <v-col cols="12" md="8">
              <p class="text-h6">{{ item.label }} </p>
              <p class="text-caption"> {{ item.description }} </p>
            </v-col>
          </v-col>
          <v-col class="d-flex justify-center" cols="4">
            <v-number-input
              v-if="item.type === 'quantity'"
              v-model="item.model"
              control-variant="split"
              :max="item.max || undefined"
              :min="0"
              style="min-width: 120px; margin-left: -40px;"
            />
            <!--            Toggle based items-->
            <v-switch
              v-else
              v-model="item.model"
              color="orange-darken-3"
              false-value="false"
              inset
              :label="`${item.model}`"
              true-value="true"
              value="orange"
            />
          </v-col>
        </v-row>
      </v-card>
      <v-textarea
        v-model="notes"
        auto-grow
        clearable
        label="Additional Notes (Optional)"
        rows="3"
      />
      <v-btn
        block
        class="mx-auto my-2 pa-2 pa-md-4"
        color="primary"
        type="submit"
      > Submit Work Order</v-btn>
    </v-form>
  </v-container>
</template>

<style scoped lang="sass">

</style>
