// assets/js/theme.js
// Lê /content/theme.json e aplica as cores/CTA no site
(async () => {
  try {
    const res = await fetch('content/theme.json', { cache: 'no-store' });
    const t   = await res.json();
    const root = document.documentElement;
    const set = (name, val) => { if (val) root.style.setProperty(name, val); };

    // Define as duas convenções de variáveis (para nada quebrar)
    set('--primary',          t.primaryColor || t.primary);
    set('--color-primary',    t.primaryColor || t.primary);
    set('--secondary',        t.secondary);
    set('--color-secondary',  t.secondary);
    set('--bg',               t.bg || t.backgroundColor);
    set('--color-bg',         t.bg || t.backgroundColor);
    set('--text',             t.text);
    set('--color-text',       t.text);
    set('--card',             t.card);
    set('--color-card',       t.card);
    set('--button',           t.buttonColor);
    set('--color-button',     t.buttonColor);

    // Aplicação direta (garante mesmo se o CSS tiver outra regra)
    if (t.bg || t.backgroundColor) document.body.style.backgroundColor = t.bg || t.backgroundColor;
    if (t.text) document.body.style.color = t.text;

    // Pinta botões/CTAs/chips ativos com a cor do botão (rosê)
    const paint = sel => document.querySelectorAll(sel).forEach(el => {
      if (t.buttonColor) el.style.backgroundColor = t.buttonColor;
    });
    paint('.btn, .button, .hero-cta, .product-cta, .custom-cta, .category-button.active, .size-button.active');

    // Marca
    const brandEl = document.getElementById('brandText') || document.querySelector('#brandText,.brand-text,.brandText');
    if (brandEl && t.brandText) brandEl.textContent = t.brandText;

    // CTA do topo
    const headerCta = document.getElementById('headerCta') || document.querySelector('#headerCta,.header-cta,.headerCta,nav a#headerCta');
    if (headerCta && t.headerCta) {
      if (t.headerCta.label) headerCta.textContent = t.headerCta.label;
      if (t.headerCta.href)  headerCta.setAttribute('href', t.headerCta.href);
      if (t.buttonColor)     headerCta.style.backgroundColor = t.buttonColor;
    }
  } catch (e) {
    console.error('Falha ao carregar tema:', e);
  }
})();
