import { defineStore } from 'pinia'

export interface ContractorProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  taxRate: number;
  savingsRate: number;
}

export const useContractorStore = defineStore('contractor', {
  state: (): { profile: ContractorProfile } => ({
    profile: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      taxRate: 0,
      savingsRate: 0,
    },
  }),
  actions: {
    async fetchProfile (){
      const response = await fetch('https://ipdbuddy-backend-91d5cec4f8a8.herokuapp.com/api/v1/contractor/me', { credentials: 'include' });
      if (response.ok) {
        const data: ContractorProfile = await response.json();
        this.profile = data;
      } else {
        console.error('Failed to fetch contractor profile')
      }
    },
  },
});
