let orderCounter = 100000;
let chargeCounter = 0;
let refundCounter = 0;

export function nextOrderNumber() {
  orderCounter += 1;
  return `KC-${orderCounter}`;
}

export function nextChargeId() {
  chargeCounter += 1;
  return `ch_${String(chargeCounter).padStart(6, '0')}`;
}

export function nextRefundId() {
  refundCounter += 1;
  return `rf_${String(refundCounter).padStart(6, '0')}`;
}

export function setCounters({ orders = 100000, charges = 0, refunds = 0 } = {}) {
  orderCounter = orders;
  chargeCounter = charges;
  refundCounter = refunds;
}

export function getCounters() {
  return {
    orderCounter,
    chargeCounter,
    refundCounter
  };
}
