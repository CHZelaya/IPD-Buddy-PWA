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
    // GET contractor profile using FireBase-auth token
    async fetchProfile (currentEmail: string){
      console.log('Base URL:', `https://ipdbuddy-backend-v2-68c569e58877.herokuapp.com/api/v1`);
      const token = localStorage.getItem('jwt');
      const url = `https://ipdbuddy-backend-v2-68c569e58877.herokuapp.com/api/v1/contractor/me`
      try{
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });


        if (response.ok) {
          this.profile = await response.json();
        } else {
          console.error('Failed to fetch contractor profile');
        }
      } catch (error) {
        console.error('Networking error, applying fallback', error)
        this.applyFallback(currentEmail);
      }
    },

    // SAVE contractor profile to the backend/db
    async saveProfile (email: string) {

      // Grabbing auth token and url
      const token = localStorage.getItem('jwt');
      const url = `https://ipdbuddy-backend-v2-68c569e58877.herokuapp.com/api/v1/contractor/update`

      //Building the payload based on current state
      const payload = {
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        email,
        phoneNumber: this.profile.phoneNumber,
        taxRate: this.profile.taxRate,
        savingsRate: this.profile.savingsRate,
      };

      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok){
          const updated = await response.json();

          //Save the updated profile to the store, to reflect real time data
          this.profile = updated;

          //Persisting to local storage for potential offline use
          // still needs to be explored
          localStorage.setItem('contractorProfile', JSON.stringify(updated));

          console.log('Profile saved successfully:', updated);
          return updated;
        }
      } catch (error){
        console.error('Error updateding contractor profile:', error);
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

// const url = `http://localhost:8080/api/v1/contractor/me` //! Dev mode
