import { defineStore } from 'pinia';
import type { JobSubmissionPayload } from '../types/JobSubmissionPayload';
import { submitJobToApi } from '@/services/apiService.ts';
import type { Ref } from 'vue';

interface BillableItem {
  id: string;
  label: string;
  description?: string;
  model: Ref<number | boolean>;
  type: 'quantity' | 'toggle';
  max?: number;
}

export const useJobStore = defineStore('job', {
  state: () => ({
    address: '',
    date: '',
    notes: '',
    billables: {
      INSULATION: 0,
      DRYWALL: 0,
      FIRE_CAULKING: 0,
      SCAFFOLDING: 0,
      HIGH_GARAGE_BULKHEAD: 0,
      PINCH_POINT_STRIPS_SINGLE_FAMILY_HOME: false,
      PINCH_POINT_STRIPS_DUPLEX: false,
      POLY_ONLY_SMALL: false,
      POLY_ONLY_LARGE: false,
      FIRE_CAULKING_MATTAMY_HOUSE: 0,
      SCRAP_OUT: false,
      SUITED_MECH_ROOM_RES_BAR: false,
      STEEL_FRAMING_AND_BOARD: false,
      BOARD_ONLY: false,
      SECOND_MECH_ROOM: false,
      FIRE_TAPING_MECH_ROOM_CEILING: false,
      FIRE_TAPING_SECOND_MECH_ROOM: false,
    } as Record<string, number | boolean>,

    submittedJob: null as JobSubmissionPayload | null,
  }),
  actions: {
    syncBillablesFromComponentStore (billableArray: BillableItem[]){
      billableArray.forEach((item: BillableItem) => {
        this.billables[item.id] = item.model.value
      })
    },


    prepareBillables () {
      return Object.entries(this.billables).map(([key, value]) => ({
        billableType: key,
        quantity: Number(value),
      }))
    },

    async submitJob () {
      const payload: JobSubmissionPayload = {
        address: this.address,
        date: this.date,
        notes: this.notes,
        billables: this.prepareBillables(),
      }

      console.log(`Submitting job with data:`, payload);

      try {
        const result = await submitJobToApi(payload) //back end call
        this.submittedJob = payload // Store locally for next page
        return result
      } catch (error) {
        console.error('Failed to submit job', error)
        throw error
      }
    },
  },
})
