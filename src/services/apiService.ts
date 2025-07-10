import axios from 'axios';
import type { JobSubmissionPayload } from '@/types/JobSubmissionPayload';
import { getApiUrl } from '@/config/apiConfig';
import { log, warn, error } from '@/utils/logger';

/**
 * Submits a job to the API.
 * @param payload - The job submission payload containing job details.
 * @returns {Promise<any>} - The response data from the API.
 */
export async function submitJobToApi(payload: JobSubmissionPayload): Promise<any> {
  const token = localStorage.getItem('jwt');
  if (!token) {
    warn('apiService', 'Failed to submit job, token is missing');
    return;
  }

  try {
    const response = await axios.post(getApiUrl('job/submit'), payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    log('[submitJobToApi]: Job submitted successfully .data:', response.data);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      warn('apiService', 'Error submitting job:', err.message);
    } else {
      error('apiService', 'Unexpected error submitting job:', err);
      throw err;
    }
  }
}
