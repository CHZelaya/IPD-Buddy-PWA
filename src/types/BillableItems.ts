import type { Ref } from 'vue';
export interface BillableItem {
  id: string;
  label: string;
  description?: string;
  model: Ref<number | boolean>;
  type: 'quantity' | 'toggle';
  max?: number;
}
