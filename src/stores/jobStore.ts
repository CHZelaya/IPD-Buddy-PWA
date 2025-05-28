import { defineStore } from 'pinia';
import type { JobSubmissionPayload } from '../types/JobSubmissionPayload';
import type { JobSubmissionResponseDTO } from '@/types/JobSubmissionResponseDTO'

import { submitJobToApi } from '@/services/apiService.ts';
// import type { Ref } from 'vue';
import type { BillableItem } from '@/types/BillableItems.ts';


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

    submittedJob: null as JobSubmissionResponseDTO | null,
  }),


  actions: {
    syncBillablesFromComponentStore (billableArray: BillableItem[]) {
      billableArray.forEach((item: BillableItem) => {
        const rawValue = unref(item.model);

        if (item.type === 'toggle') {
          this.billables[item.id] = Boolean(rawValue);
        } else {
          const parsed = Number(rawValue);
          this.billables[item.id] = isNaN(parsed) ? 0 : parsed;
        }
      });

      console.log('Synced billables:', this.billables);
    },


    prepareBillables () {
      return Object.entries(this.billables).map(([key, value]) => {
        if (typeof value === 'boolean'){
          return { billableType: key, quantity: value ? 1 : 0 };
        } else {
          const parsed = Number(value);
          return { billableType: key, quantity: isNaN(parsed)? 0 : parsed };
        }
      })
    },

    async submitJob () {
      const billableItemsSummary = this.prepareBillables();

      const payload: JobSubmissionPayload = {
        address: this.address,
        date: this.date,
        notes: this.notes,
        billables: billableItemsSummary,
      };


      try {
        const result = await submitJobToApi(payload); // Backend call
        console.log('Job submitted successfully', result);
        this.submittedJob = result; //  Store server's processed response (includes totals, IDs, etc.)
        localStorage.setItem('submittedJob', JSON.stringify(result));
        return result;

      } catch (error) {

        console.error('Failed to submit job', error)
        // Clearing any data on an error. This is a temporary fix until I have a better error handling system.
        localStorage.removeItem('submittedJob');
        this.submittedJob = null;

      }
    },

  },
})
