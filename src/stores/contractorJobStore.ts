// stores/contractorJobsStore.js
import { defineStore } from 'pinia';
import type { JobSummary } from '@/types/JobSummary';
import axios from 'axios';

// This store manages the state for contractor past jobs
// It fetches past jobs from the API and provides actions to access them
// The state includes an array of past jobs, a loading flag, and an error object
export const useContractorJobsStore = defineStore('contractorJobs', {
  state: () => ({
    jobSummaries: [] as JobSummary[],
    loading: false,
    error: null as null | Error,
  }),
  actions: {
    async fetchPastJobs() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get('/api/v1/past-jobs');
        this.jobSummaries = res.data;
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          this.error = err as Error;
        } else {
          this.error = new Error('An unknown error occurred while fetching past jobs.');
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
