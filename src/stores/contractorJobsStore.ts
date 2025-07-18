// stores/contractorJobsStore.js
import { defineStore } from 'pinia';
import type { JobSummary } from '@/types';
import { fetchPastJobsFromApi } from '@/services/jobService';
import { log, warn, error } from '@/utils/logger';

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
        const data = await fetchPastJobsFromApi();
        //* Check for fast failures.
        if (!data) {
          warn('contractorJobsStore', 'No past jobs data received from API');
          this.error = new Error('No past jobs data received');
          return;
        }

        // * Assigning the fetched data to the jobSummaries state
        this.jobSummaries = data;
        log('contractorJobsStore', 'Fetched past jobs successfully:', this.jobSummaries);
      } catch (err) {
        if (err instanceof Error) {
          error('contractorJobsStore', 'Error fetching past jobs:', err.message);
          this.error = err;
        } else {
          error('contractorJobsStore', 'Unexpected error fetching past jobs:', err);
          this.error = new Error('Unexpected error fetching past jobs');
        }
      } finally {
        this.loading = false;
        return;
      }
    },
  },
});
