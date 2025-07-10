import { defineStore } from 'pinia';
import type { ContractorProfile } from '@/types/Contractor.ts';
import { fallbackProfiles } from '@/constants/fallbackProfiles';
import { fetchContractorProfile, updateContractorProfile } from '@/services/contractorService';

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
    /**========================================================================
     * *                                INFO
     * *  Fetches the contractor profile from the backend.
     * *  currentEmail is used to apply a fallback profile if the fetch fails.
     * *  If the profile is successfully fetched, it is stored in the state
     *
     *========================================================================**/
    async fetchProfile(currentEmail: string) {
      const token = localStorage.getItem('jwt');
      if (!token) {
        console.error('Failed to fetch contractor profile, token is missing');
        return;
      }

      try {
        const profile = await fetchContractorProfile(token);
        if (profile) {
          this.profile = profile;
          localStorage.setItem('contractorProfile', JSON.stringify(profile));
        } else {
          console.warn('Using cached profile due to fetch failure');
          this.loadCachedProfile();
        }
      } catch (error) {
        console.error('Error fetching contractor profile:', error);
        this.loadCachedProfile(); // Fallback to cached profile
      }
    },

    /**========================================================================
     * *                                INFO
     * *  Loads the cached profile from local storage.
     * *  If no cached profile is found, it applies a fallback profile based
     * *  on the email.
     *
     *========================================================================**/
    async saveProfile(email: string) {
      // Grabbing auth token and url
      const token = localStorage.getItem('jwt');
      if (!token) {
        console.error('Failed to save contractor profile, token is missing');
        return;
      }

      //Building the payload based on current state
      const payload = {
        ...this.profile,
        email,
      };

      try {
        const updated = await updateContractorProfile(token, payload);
        if (updated) {
          this.profile = updated;
          localStorage.setItem('contractorProfile', JSON.stringify(updated));
          console.log('Profile saved successfully:', updated);
        } else {
          console.warn('Failed to update profile, applying fallback');
        }
      } catch (error) {
        console.error('Error saving contractor profile:', error);
      }
    },

    /**========================================================================
     * *                                INFO
     * *  Loads the cached profile from local storage.
     * *  If no cached profile is found, it applies a fallback profile based
     * *  on the email.
     *
     *========================================================================**/
    loadCachedProfile() {
      const cachedProfile = localStorage.getItem('contractorProfile');
      if (cachedProfile) {
        this.profile = JSON.parse(cachedProfile);
        console.log('Loaded cached profile:', this.profile);
      } else {
        console.warn('No cached profile found, applying fallback');
      }
    },
  },
});

// const url = `http://localhost:8080/api/v1/contractor/me` //! Dev mode
