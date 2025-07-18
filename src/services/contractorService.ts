import type { ContractorProfile, UpdateContractorProfilePayload } from '@/types/Contractor';
import { getApiUrl } from '@/config/apiConfig';
import { getFirebaseToken } from './authService';
import { log } from '@/utils/logger';
import apiClient from './apiClient';

/**
 * Fetches the contractor profile from the API.
 * @returns {Promise<ContractorProfile | null>} - The contractor profile or null if not found.
 */

export async function fetchContractorProfile(): Promise<ContractorProfile | null> {
  try {
    const { data } = await apiClient.get<ContractorProfile>('contractor/me');

    const parsedProfile: ContractorProfile = {
      id: data.id ?? 0,
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      email: data.email ?? '',
      phoneNumber: data.phoneNumber ?? '',
      taxRate: data.taxRate ?? 0,
      savingsRate: data.savingsRate ?? 0,
      earningsSummary: {
        totalEarnings: data.earningsSummary?.totalEarnings ?? 0,
        earnedThisWeek: data.earningsSummary?.earnedThisWeek ?? 0,
        earnedThisMonth: data.earningsSummary?.earnedThisMonth ?? 0,
        earnedThisYear: data.earningsSummary?.earnedThisYear ?? 0,
        averageJobValue: data.earningsSummary?.averageJobValue ?? 0,
        highestJobValue: data.earningsSummary?.highestJobValue ?? 0,
      },
    };

    return parsedProfile;
  } catch (error) {
    console.error('Error fetching contractor profile:', error);
    return null;
  }
}

/**
 * Updates the contractor profile in the API.

 * @param {ContractorProfile} payload - The contractor profile data to update.
 * @returns {Promise<ContractorProfile | null>} - The updated contractor profile or null if the update failed.
 */
export async function updateContractorProfile(
  payload: UpdateContractorProfilePayload
): Promise<ContractorProfile | null> {
  try {
    const { data } = await apiClient.put<ContractorProfile>('contractor/update-profile', payload);
    return data;
  } catch (error) {
    console.error('Error updating contractor profile:', error);
    return null;
  }
}
