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
  message?: string | null;
}
