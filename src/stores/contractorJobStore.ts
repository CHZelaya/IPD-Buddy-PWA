// stores/contractorJobsStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useContractorJobsStore = defineStore('contractorJobs', {
  state: () => ({
    pastJobs: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPastJobs () {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('/api/v1/past-jobs')
        this.pastJobs = res.data
      } catch (err) {
        console.error(err)
        this.error = err
      } finally {
        this.loading = false
      }
    },
  },
})
