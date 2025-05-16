export interface JobSubmissionPayload {
  address: string;
  date: string;
  notes: string;
  billables: {
    billableType: string;
    quantity: number;
  }[]
}
