// load.js

// Constants you control here:
const accountNumber = '0307 1234567';
const ibanNumber    = `PK40 SADA 0000 00 ${accountNumber}`;

document.addEventListener('DOMContentLoaded', () => {
  // 1) Grab the shared data:
  const { transactions = [], monthlyLimit = 400000 } = window.appData || {};

  // 2) Figure out “this month” as a number 0–11
  const now        = new Date();
  const thisMonth  = now.getMonth();
  const thisYear   = now.getFullYear();

  // 3) Sum only positive amounts from this month
  const receivedThisMonth = transactions
    .filter(tx => {
      if (tx.amount <= 0) return false;       // ignore outgoing
      // parse e.g. "Jun 28" into a Date in this year
      const parsed = new Date(`${tx.date} ${thisYear}`);
      return parsed.getMonth() === thisMonth;
    })
    .reduce((sum, tx) => sum + tx.amount, 0);

  // 4) Compute & display the remaining limit
  const left = monthlyLimit - receivedThisMonth;
  document.getElementById('limit-left').textContent = 
    left.toLocaleString();

  // 5) Render your account & IBAN
  document.getElementById('acct-number').textContent = accountNumber;
  document.getElementById('iban-number').textContent = ibanNumber;

  // 6) Copy handlers
  document.querySelector('.copy-local').addEventListener('click', () => {
    navigator.clipboard.writeText(accountNumber)
      .then(() => alert('Account number copied!'));
  });
  document.querySelector('.copy-iban').addEventListener('click', () => {
    navigator.clipboard.writeText(ibanNumber)
      .then(() => alert('IBAN copied!'));
  });

  // 7) Back button
  document.querySelector('.back-btn')
    .addEventListener('click', () => window.history.back());
});
