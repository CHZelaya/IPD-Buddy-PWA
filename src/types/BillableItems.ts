export interface BillableItem {
  id: string;
  label: string;
  description?: string;
  model: number | boolean;
  type: 'quantity' | 'toggle';
  max?: number;
}
