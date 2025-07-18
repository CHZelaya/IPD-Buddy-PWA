export interface JobSubmissionPayload {
  address: string;
  date: string;
  notes: string;
  billables: {
    billableType: string;
    quantity: number;
  }[];
}

export interface BillableItemSummary {
  name: string;
  type: string | null;
  description: string;
  quantity: number;
  rate: number;
  total: number;
  jobAddress: string;
  jobDate: string;
}

export interface JobSubmissionResponseDTO {
  jobId: number | null;
  billableItemsSummary: BillableItemSummary[];
  grandTotalAmount: number;
  taxAmount: number;
  savingsAmount: number;
  notes?: string | null;
}

// Todo: Align the type definition with the API response structure
export interface JobSummary {
  jobId: number;
  taxAmount: number;
  savingsAmount: number;
  grandTotalAmount: number;
  date: string; // ISO date string
  address: string;
}
