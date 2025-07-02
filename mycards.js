// mycards.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Back button
  document.querySelector('.back-btn')?.addEventListener('click', () => {
    window.history.back();
  });

  // 2) Tab switching
  const tabs  = document.querySelectorAll('.segmented-control .tab');
  const panes = document.querySelectorAll('.card-pane');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panes.forEach(p =>
        p.id === tab.dataset.tab
          ? p.classList.remove('hidden')
          : p.classList.add('hidden')
      );
    });
  });

  // 3) View/Hide toggle
  document.querySelectorAll('.preview-card').forEach(card => {
    const btn = card.querySelector('.btn.view');
    btn.addEventListener('click', () => {
      const revealed = card.classList.toggle('revealed');
      btn.textContent = revealed ? 'Hide' : 'View';
    });
  });

  // 4) Copy full PAN
  document.querySelectorAll('.preview-card').forEach(card => {
    const copyBtn = card.querySelector('.btn.copy');
    copyBtn.addEventListener('click', () => {
      const spans = card.querySelectorAll('.card-number .unmasked');
      const full = Array.from(spans)
        .map(s => s.textContent.trim())
        .join('');
      navigator.clipboard.writeText(full).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 2000);
      });
    });
  });

  // 5) Freeze‐logo swap
// 5) Freeze‐logo swap, per‐card image
document
  .querySelectorAll('.switch input[type="checkbox"]')
  .forEach(chk => {
    chk.addEventListener('change', () => {
      const pane = chk.closest('.card-pane');
      const card = pane.querySelector('.preview-card');
      const logo = card.querySelector('.card-logo');

      if (chk.checked) {
        // use a different freeze image for physical vs virtual
        if (card.classList.contains('physical')) {
          logo.src = 'images/freeze-p.jpg';
        } else {
          logo.src = 'images/freeze.jpg';
        }
      } else {
        // restore original logo
        logo.src = logo.dataset.originalSrc;
      }
    });
  });

});
