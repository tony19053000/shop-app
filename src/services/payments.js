import { nextChargeId } from '../store/counters.js';

export async function charge(amountCents) {
  // Real awaited gateway delay between 15-25 ms
  await new Promise((resolve) => setTimeout(resolve, 20));

  return {
    id: nextChargeId(),
    amount: amountCents,
    currency: 'USD',
    status: 'succeeded',
    createdAt: new Date().toISOString()
  };
}

export default {
  charge
};
