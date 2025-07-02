// index.js

// 1) Your app‐wide data
const transactions = [
  { date: 'Jun 28', name: 'Shaheen Grocery',       time: '11:45 PM', amount: +200485,  type: 'card'     },
  { date: 'Jun 28', name: 'Anviro',                time: '4:42 PM',  amount: +5000,  type: 'incoming' },
  { date: 'Jun 28', name: 'Abdullah Qayyum',       time: '1:06 AM',  amount: -15000, type: 'outgoing' },
  { date: 'Jun 28', name: 'Rai Muhammad Tabish',   time: '1:02 AM',  amount: +15000, type: 'incoming', message: 'Salary June' },
    { date: 'May 28', name: 'Shaheen Grocery',       time: '11:45 PM', amount: +2480005,  type: 'card'     }

  // …more…
];

const monthlyLimit = 400_000;

// Export to other pages
window.appData = { transactions, monthlyLimit };

const iconSrc = {
  outgoing: 'images/out.jpg',
  incoming: 'images/in.jpg',
  card:     'images/card.jpg'
};

document.addEventListener('DOMContentLoaded', () => {
  // —— Render Transactions & Balance —— //
  // 1) Compute & display current balance
  const balance = transactions.reduce((s, tx) => s + tx.amount, 0);
  document.getElementById('current-balance').innerText = 
    'Rs. ' + balance.toLocaleString();

  // 2) Group by date & render the list
  const groups = transactions.reduce((acc, tx) => {
    (acc[tx.date] ||= []).push(tx);
    return acc;
  }, {});
  const txList = document.querySelector('.tx-list');
  txList.innerHTML = '';
  Object.keys(groups).forEach((date, idx) => {
    const group = groups[date];
    const dayTotal = group.reduce((sum, tx) => sum + tx.amount, 0);

    // Date header
    const dg = document.createElement('div');
    dg.className = `date-group${idx===0?' latest':''}`;
    dg.innerHTML = `
      <h2>${date}</h2>
      <span class="day-total ${dayTotal<0?'negative':'positive'}">
        ${dayTotal<0?'– ':'+ '}Rs. ${Math.abs(dayTotal).toLocaleString()}
      </span>
    `;
    txList.appendChild(dg);

    // Transactions
    group.forEach(tx => {
      const li = document.createElement('li');
      li.className = 'tx-item';
      li.innerHTML = `
        <div class="tx-icon ${tx.type}">
          <img src="${iconSrc[tx.type]}" alt="${tx.type}">
        </div>
        <div class="tx-details">
          <p class="tx-name">${tx.name}</p>
          ${tx.message?`<small class="tx-message">${tx.message}</small>`:''}
          <small class="tx-time">${tx.time}</small>
        </div>
        <p class="tx-amount ${tx.amount<0?'negative':'positive'}">
          Rs. ${Math.abs(tx.amount).toLocaleString()}
        </p>
      `;
      txList.appendChild(li);
    });
  });

  // —— Card & Nav Handlers —— //
  // Navigate to Load page
  document.querySelector('.load-card')
    .addEventListener('click', () => window.location.href = 'load.html');

  // Send & Request stub
  document.querySelector('.send-card')
    .addEventListener('click', () => alert('Send & Request…'));

  // Balance‐card → My Cards
  document.querySelector('.balance-card')
    .addEventListener('click', () => window.location.href = 'mycards.html');

  // Bottom nav
  document.querySelectorAll('.nav-item.home, .nav-item.more').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item.home, .nav-item.more')
        .forEach(i => i.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.querySelector('.nav-item.payments')
    .addEventListener('click', () => window.location.href = 'payments.html');
  document.querySelector('.nav-item.scan')
    .addEventListener('click', () => window.location.href = 'scan.html');
});
