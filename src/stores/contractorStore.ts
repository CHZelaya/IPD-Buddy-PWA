import { defineStore } from 'pinia'
import type { ContractorProfile } from '@/types/Contractor.ts'
import { fallbackProfiles } from '@/constants/fallbackProfiles.ts'


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
    async fetchProfile (currentEmail: string){
      console.log('Base URL:', import.meta.env.VITE_API_LIVE_URL);
      const token = localStorage.getItem('jwt');
      const url = `${import.meta.env.VITE_API_LIVE_URL}/contractor/me`
      try{
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
      } catch (error) {
        console.error('Networking error, applying fallback', error)
        this.applyFallback(currentEmail);
      }
    },

    applyFallback (email: string) {
      const fallback = fallbackProfiles[email];
      if (fallback) {
        this.profile = {
          id: -1,
          firstName: fallback.name,
          lastName: fallback.lastName,
          email: fallback.email,
          phoneNumber: fallback.phoneNumber,
          taxRate: 0.2,
          savingsRate: 0.2,
        };
      } else {
        console.warn('No fallback found for this email.');
      }
    },
  },
});
