// Lê /content/theme.json e aplica no site (cores, marca e CTA do topo)
(async () => {
  try {
    const res  = await fetch('/content/theme.json', { cache: 'no-store' });
    const t    = await res.json();
    const root = document.documentElement;

    const set = (name, val) => { if (val) root.style.setProperty(name, val); };

    // Variáveis (se usar CSS variables)
    set('--color-primary',  t.primaryColor || t.primary);
    set('--color-secondary',t.secondary);
    set('--color-bg',       t.bg || t.backgroundColor);
    set('--color-text',     t.text);
    set('--color-card',     t.card);
    set('--color-button',   t.buttonColor);

    // Aplicação direta (funciona mesmo sem CSS variables)
    if (t.bg || t.backgroundColor) document.body.style.backgroundColor = t.bg || t.backgroundColor;
    if (t.text) document.body.style.color = t.text;

    // Botões comuns
    document.querySelectorAll('.btn, .button, .hero-cta, .product-cta, .custom-cta').forEach(el => {
      if (t.buttonColor) el.style.backgroundColor = t.buttonColor;
    });

    // Marca (texto)
    const brandEl =
      document.getElementById('brandText') ||
      document.querySelector('#brandText, .brand-text, .brandText');
    if (brandEl && t.brandText) brandEl.textContent = t.brandText;

    // Botão do topo (CTA)
    const headerCta =
      document.getElementById('headerCta') ||
      document.querySelector('#headerCta, .header-cta, .headerCta, nav a#headerCta');
    if (headerCta && t.headerCta) {
      if (t.headerCta.label) headerCta.textContent = t.headerCta.label;
      if (t.headerCta.href)  headerCta.setAttribute('href', t.headerCta.href);
    }
  } catch (e) {
    console.error('Falha ao carregar tema:', e);
  }
})();
