import type { EarningsSummary } from '@/types/EarningsSummary.ts';

export interface ContractorProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  taxRate: number;
  savingsRate: number;
  earningsSummary: EarningsSummary; // Updated to use EarningsSummary type
}
