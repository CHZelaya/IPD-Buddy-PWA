import axios from 'axios';
import type { JobSubmissionPayload } from '@/types/JobSubmissionPayload';

export async function submitJobToApi (payload: JobSubmissionPayload) {

  const token = localStorage.getItem('jwt')
  if (!token) {
    console.error('Failed to submit job, user might not be authenticated')
    return
  }

  try {
    const response = await axios.post(
      'https://ipdbuddy-backend-v2-68c569e58877.herokuapp.com/api/v1/job/submit',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    console.log('Job submitted successfully RAW axios response:', response);
    console.log('Job submitted successfully .data:', response.data);
    return response.data
  } catch (error) {
    console.error('Failed to submit job', error)
    throw error
  }
}
// 'http://localhost:8080/api/v1/job/submit',
