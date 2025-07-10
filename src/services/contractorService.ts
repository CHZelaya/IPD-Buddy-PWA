import type { ContractorProfile } from '@/types/Contractor';
import { getApiUrl } from '@/config/apiConfig';

/**
 * Fetches the contractor profile from the API.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<ContractorProfile | null>} - The contractor profile or null if not found.
 */
export async function fetchContractorProfile(token: string): Promise<ContractorProfile | null> {
  if (!token) {
    console.error('Failed to fetch contractor profile, token is missing');
    return null;
  }

  try {
    const response = await fetch(getApiUrl('contractor/me'), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch contractor profile', response.statusText);
      return null;
    }

    const data: ContractorProfile = await response.json();
    console.log('Contractor profile fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching contractor profile:', error);
    return null;
  }
}

/**
 * Updates the contractor profile in the API.
 * @param {string} token - The JWT token for authentication.
 * @param {ContractorProfile} payload - The contractor profile data to update.
 * @returns {Promise<ContractorProfile | null>} - The updated contractor profile or null if the update failed.
 */
export async function updateContractorProfile(
  token: string,
  payload: ContractorProfile
): Promise<ContractorProfile | null> {
  if (!token) {
    console.error('Failed to update contractor profile, token is missing');
    return null;
  }

  try {
    const response = await fetch(getApiUrl('contractor/update-profile'), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Failed to update contractor profile', response.statusText);
      return null;
    }

    const data: ContractorProfile = await response.json();
    console.log('Contractor profile updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating contractor profile:', error);
    return null;
  }
}
