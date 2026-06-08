/* CloudTech360 - Scripts */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.navbar-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  // Tab system
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const panels = tabGroup.closest('.tabs-wrapper')?.querySelectorAll('.tab-panel')
                   || tabGroup.nextElementSibling?.querySelectorAll('.tab-panel')
                   || document.querySelectorAll('.tab-panel');

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  });

  // Sidebar active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

  if (sections.length && sidebarLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  // Animate on scroll
  const animateEls = document.querySelectorAll('.animate-up, .unit-card, .char-item, .principle-card, .deploy-card');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.transition = 'opacity .5s ease, transform .5s ease';
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transitionDelay = `${i * 0.07}s`;
    animObserver.observe(el);
  });

  // ROI Calculator
  const roiCalc = document.getElementById('roi-calc');
  if (roiCalc) {
    const calcBtn = roiCalc.querySelector('#calc-btn');
    const resultBox = roiCalc.querySelector('#calc-result');

    calcBtn?.addEventListener('click', () => {
      const beneficios = parseFloat(document.getElementById('inp-benefits').value) || 0;
      const inversion  = parseFloat(document.getElementById('inp-investment').value) || 1;
      const roi = ((beneficios - inversion) / inversion) * 100;
      const tco = parseFloat(document.getElementById('inp-tco').value) || 0;

      resultBox.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem">
          <div style="background:#fff;border:1px solid #bae6fd;border-radius:10px;padding:1.25rem;text-align:center">
            <div style="font-size:2rem;font-weight:800;color:${roi>=0?'#0369a1':'#dc2626'}">${roi.toFixed(1)}%</div>
            <div style="font-size:.8rem;color:#64748b;margin-top:.3rem">ROI Calculado</div>
          </div>
          <div style="background:#fff;border:1px solid #bbf7d0;border-radius:10px;padding:1.25rem;text-align:center">
            <div style="font-size:2rem;font-weight:800;color:#065f46">$${(inversion+tco).toLocaleString()}</div>
            <div style="font-size:.8rem;color:#64748b;margin-top:.3rem">TCO Total Estimado</div>
          </div>
        </div>
        <p style="font-size:.85rem;color:#64748b;margin-top:1rem;text-align:center">
          ${roi >= 20 ? '✅ ROI positivo y atractivo. La implementación parece viable.' :
            roi >= 0  ? '⚠️ ROI positivo pero modesto. Evalúe factores cualitativos adicionales.' :
                        '❌ ROI negativo. Revise la propuesta de valor o los supuestos de costo.'}
        </p>`;
    });
  }
});
