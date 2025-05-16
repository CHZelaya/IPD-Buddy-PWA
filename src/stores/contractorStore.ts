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
      console.log('Base URL:', import.meta.env.VITE_API_LIVE_URL);
      const token = localStorage.getItem('jwt');
      const url = `${import.meta.env.VITE_API_LIVE_URL}/contractor/me`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });


      if (response.ok) {
        const data: ContractorProfile = await response.json();
        this.profile = data;
      } else {
        console.error('Failed to fetch contractor profile');
      }

    },
  },
});
