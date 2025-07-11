import axios from 'axios';
import type { JobSubmissionPayload } from '@/types/JobSubmissionPayload';
import { getApiUrl } from '@/config/apiConfig';
import { log, warn, error } from '@/utils/logger';
import { getFirebaseToken } from './authService';
import apiClient from './apiClient';

/**
 * Submits a job to the API.
 * @param payload - The job submission payload containing job details.
 * @returns {Promise<any>} - The response data from the API.
 */
export async function submitJobToApi(payload: JobSubmissionPayload): Promise<any> {
  try {
    const { data } = await apiClient.post('job/submit', payload);
    log('apiService', 'Job submitted successfully:', data);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      warn('apiService', 'Error submitting job:', err.message);
    } else {
      error('apiService', 'Unexpected error submitting job:', err);
      throw err;
    }
  }
}

//Fetching all Past jobs belonging to the contractor
//Todo: Refactor to use a jobs type, and not any.
export async function fetchPastJobsFromApi(): Promise<any[] | null> {
  try {
    const { data } = await apiClient.get('job/job-summaries');
    log('jobService - fetchPastJobsFromApi', 'Fetched past jobs successfully:', data);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      error('apiService', 'Error fetching past jobs:', err.message);
    } else {
      error('apiService', 'Unexpected error fetching past jobs:', err);
    }
    return null;
  }
}
