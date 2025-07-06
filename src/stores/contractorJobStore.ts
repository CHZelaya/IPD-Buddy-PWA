// stores/contractorJobsStore.js
import { defineStore } from 'pinia'
import type { PastJob } from '@/types/PastJob'
import axios from 'axios'


// type PastJob = {
//   id: number
//   title: string
//   description: string
//   date: string
//   address: string
// }


export const useContractorJobsStore = defineStore('contractorJobs', {
  state: () => ({
    pastJobs: [] as PastJob[],
    loading: false,
    error: null as null | Error,
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
        if (err instanceof Error) {
        this.error = err as Error}
        else {
          this.error = new Error('An unknown error occurred while fetching past jobs.')
        }
      } finally {
        this.loading = false
      }
    },
  },
})
