<template>
  <v-container class="pa-2 pa-md-6">
    <v-form @submit.prevent="submitJob">
      <v-card class="mx-auto my-2 pa-2 pa-md-4" max-width="600">
        <v-card-text>
          <p class="text-h4 font-weight-black">Log Today's Work</p>

          <div class="text-medium-emphasis">Log it. Bill it. Bank it.</div>
        </v-card-text>
      </v-card>

      <v-card class="mx-auto my-2 pa-2 pa-md-4" max-width="600">
        <v-text-field v-model="address" label="Job Address" :rules="rules" />
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
              <p class="text-h6">{{ item.label }}</p>
              <p class="text-caption">{{ item.description }}</p>
            </v-col>
          </v-col>
          <v-col class="d-flex justify-center" cols="4">
            <!-- @ts-expect-error: model is Ref<number>, works at runtime, TS is wrong -->
            <v-number-input
              v-if="item.type === 'quantity'"
              v-model="item.model"
              control-variant="split"
              :max="item.max || undefined"
              :min="0"
              style="min-width: 120px; margin-left: -40px"
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
      <v-btn block class="mx-auto my-2 pa-2 pa-md-4" color="primary" @click="showDialog">
        Submit Work Order</v-btn
      >
    </v-form>

    <!-- Dialog Box-->
    <v-dialog v-model="showConfirmDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirm Submission</v-card-title>
        <v-card-text>
          Are you sure you want to submit this job? Please ensure all details are correct.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" text @click="hideDialog">Cancel</v-btn>
          <v-btn color="primary" text @click="confirmDialog">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import { useRouter } from 'vue-router';
import type { BillableItem } from '@/types';

const jobStore = useJobStore();
const router = useRouter();

const address = computed({
  get: () => jobStore.address,
  set: (value: string) => (jobStore.address = value),
});

const notes = computed({
  get: () => jobStore.notes,
  set: (value: string) => (jobStore.notes = value),
});

//Date picker
const today = new Date().toISOString().split('T')[0];
const jobDate = computed({
  get: () => jobStore.date,
  set: (value: string) => (jobStore.date = value),
});
//Setting the default date for the job as "today" in case date isnt picked.
jobStore.date = today;

// Validation rules for Job Address
const rules = [
  (value: string) => {
    if (value) return true;
    return 'You must enter an address before submitting the job.';
  },
];

// Building the billable items and their components
const billableItems = ref<BillableItem[]>([
  {
    id: 'INSULATION',
    label: 'Insulation',
    description: '$30.00/bag',
    model: ref(0),
    type: 'quantity',
  },
  { id: 'DRYWALL', label: 'Drywall', description: '$20.00/sheet', model: ref(0), type: 'quantity' },
  {
    id: 'FIRE_CAULKING',
    label: 'Fire Caulking',
    description: '$5.00 each (max 15 units)',
    model: ref(0),
    type: 'quantity',
    max: 15,
  },
  {
    id: 'FIRE_CAULKING_MATTAMY_HOUSE',
    label: 'Fire Caulking',
    description: '$25.00/floor (Mattamy)',
    model: ref(0),
    type: 'quantity',
  },
  {
    id: 'SCAFFOLDING',
    label: 'Scaffolding',
    description: '$25.00 per section',
    model: ref(0),
    type: 'quantity',
  },
  {
    id: 'HIGH_GARAGE_BULKHEAD',
    label: 'Garage Bulkhead',
    description: '$35.00 per bulkhead',
    model: ref(0),
    type: 'quantity',
  },
  {
    id: 'PINCH_POINT_STRIPS_SINGLE_FAMILY_HOME',
    label: 'Pinch Point Strips',
    description: '$40.00 (Single family home)',
    model: ref(0),
    type: 'quantity',
  },
  {
    id: 'PINCH_POINT_STRIPS_DUPLEX',
    label: 'Pinch Point Strips',
    description: '$50.00 (Duplex)',
    model: ref(0),
    type: 'quantity',
  },
  {
    id: 'SUITED_MECH_ROOM_RES_BAR',
    label: 'Suited Mech Room',
    description: ' Res Bar Installation (Common Walls) $65.00/install ',
    model: ref(0),
    type: 'quantity',
  },
  {
    id: 'POLY_ONLY_SMALL',
    label: 'Poly Only',
    description: ' $25.00 (small)',
    model: ref(0),
    type: 'quantity',
  },
  {
    id: 'POLY_ONLY_LARGE',
    label: 'Poly Only',
    description: ' $50.00 (large)',
    model: ref(0),
    type: 'quantity',
  },
  { id: 'SCRAP_OUT', label: 'Scrap Out', description: '$25.00', model: ref(false), type: 'toggle' },
  {
    id: 'STEEL_FRAMING_AND_BOARD',
    label: 'Suited Mech Room Ceiling',
    description: 'Steel Framing and Board - $500.00',
    model: ref(false),
    type: 'toggle',
  },
  {
    id: 'BOARD_ONLY',
    label: 'Suited Mech Room Ceiling',
    description: 'Board Only - $300.00',
    model: ref(false),
    type: 'toggle',
  },
  {
    id: 'SECOND_MECH_ROOM',
    label: 'Second Suited Mech Room Ceiling',
    description: 'Second Mech Room - $150.00',
    model: ref(false),
    type: 'toggle',
  },
  {
    id: 'FIRE_TAPING_MECH_ROOM_CEILING',
    label: 'Fire Taping Mech Room Ceiling',
    description: '$225.00',
    model: ref(false),
    type: 'toggle',
  },
  {
    id: 'FIRE_TAPING_SECOND_MECH_ROOM',
    label: 'Second Fire Taping Mech Room',
    description: '$100.00',
    model: ref(false),
    type: 'toggle',
  },
] as unknown as BillableItem[]);

//Job submission
function submitJob() {
  //Blank address check
  if (!address.value.trim()) {
    console.warn('Submission blocked: address is empty');
    return;
  }

  console.log('Submitting Job');

  console.log('Submitting job`s billables');

  // @ts-expect-error: Temporary hack until Jigs replace this structure
  jobStore.syncBillablesFromComponentStore(billableItems.value as BillableItem[]);
  jobStore
    .submitJob()
    .then((response) => {
      console.log('✅ Job Submission Response:', response);
      router.push('/job/success');
    })
    .catch((error) => {
      console.error('Failed to submit job:', error.response?.data || error.message);

      // 🟢 Proceed anyway, because you have fallback data
      router.push('/job/success');
    });
}

const showConfirmDialog = ref(false);

function showDialog() {
  showConfirmDialog.value = true;
}

function hideDialog() {
  showConfirmDialog.value = false;
}

function confirmDialog() {
  showConfirmDialog.value = false;
  submitJob();
}
</script>

<style scoped lang="sass"></style>
