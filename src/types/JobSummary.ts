// Todo: Align the type definition with the API response structure
export interface JobSummary {
  jobId: number
  taxAmount: string
  savingsAmount: string
  grandTotalAmount: string
  date: string // ISO date string
  address: string
}
