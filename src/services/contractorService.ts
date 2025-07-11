import type { ContractorProfile } from '@/types/Contractor';
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
    return data;
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
  payload: ContractorProfile
): Promise<ContractorProfile | null> {
  try {
    const { data } = await apiClient.put<ContractorProfile>('contractor/me', payload);
    return data;
  } catch (error) {
    console.error('Error updating contractor profile:', error);
    return null;
  }
}
