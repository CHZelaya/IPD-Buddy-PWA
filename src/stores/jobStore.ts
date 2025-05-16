import { defineStore } from 'pinia';
import type { JobSubmissionPayload } from '../types/JobSubmissionPayload';
import { submitJobToApi } from '@/services/apiService.ts';


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
    },

    submittedJob: null as JobSubmissionPayload | null,
  }),
  actions: {
    async submitJob (payload: JobSubmissionPayload) {
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
