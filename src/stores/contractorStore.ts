import { defineStore } from 'pinia';
import type { ContractorProfile } from '@/types/Contractor.ts';
import { fetchContractorProfile, updateContractorProfile } from '@/services/contractorService';
import { getFirebaseToken } from '@/services/authService';
import type { EarningsSummary } from '@/types/EarningsSummary.ts';

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
      earningsSummary: {
        totalEarnings: 0,
        earnedThisWeek: 0,
        earnedThisMonth: 0,
        earnedThisYear: 0,
        averageJobValue: 0,
        highestJobValue: 0,
      },
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
      try {
        const profile = await fetchContractorProfile();
        if (profile) {
          this.profile = profile;
          localStorage.setItem('contractorProfile', JSON.stringify(profile));
          console.log('Contractor profile fetched successfully:', profile);
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
      //Building the payload based on current state
      const payload = {
        ...this.profile,
        email,
      };

      try {
        const updated = await updateContractorProfile(payload);
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
