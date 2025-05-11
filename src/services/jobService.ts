import axios from 'axios';
import { useJobStore } from '../stores/jobStore';
import { useContractorStore } from '../stores/contractorStore';
import { generatePdfForPersonalRecord, generatePdfForSubmission } from '../utils/pdfGenerator';

export async function submitJobToBackend () {
  const jobStore = useJobStore();
  const contractorStore = useContractorStore();

  const payload = {
    contractorId: contractorStore.profile.id,
    address: jobStore.address,
    date: jobStore.date,
    notes: jobStore.notes,
    billables: jobStore.billables,

  }

  try{
    const response = await axios.post('https://ipdbuddy-backend-91d5cec4f8a8.herokuapp.com/api/v1/jobs/submit', payload)

    console.log('Job submitted to backend:', response.data);

    const { details, summary } = response.data;

    generatePdfForSubmission(details, summary);
    generatePdfForPersonalRecord(details, summary);

  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error submitting job to backend:', error.response.data);
    } else {
      console.error('Error submitting job to backend:', error);
    }
  }
}
