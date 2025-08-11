// Lê /content/theme.json e aplica no site (cores, marca e CTA do topo)
(async () => {
  try {
    const res  = await fetch('/content/theme.json', { cache: 'no-store' });
    const t    = await res.json();
    const root = document.documentElement;

    const set = (name, val) => { if (val) root.style.setProperty(name, val); };

    // Variáveis (cobrimos todos os nomes usados no CSS)
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
    set('--accent',           t.buttonColor);          // alguns estilos podem usar --accent
    set('--chip-active',      t.buttonColor);
    set('--badge-bg',         t.buttonColor);

    // Aplicação direta (mesmo sem CSS variables)
    if (t.bg || t.backgroundColor) document.body.style.backgroundColor = t.bg || t.backgroundColor;
    if (t.text) document.body.style.color = t.text;

    // Botões comuns
    document.querySelectorAll('.btn, .button, .hero-cta, .product-cta, .custom-cta').forEach(el => {
      if (t.buttonColor) el.style.backgroundColor = t.buttonColor;
    });

    // Chips e botões ativos (filtro/tamanho)
    if (t.buttonColor) {
      document.querySelectorAll('.category-button.active, .size-button.active').forEach(el => {
        el.style.backgroundColor = t.buttonColor;
        el.style.borderColor = t.buttonColor;
      });
      document.querySelectorAll('.product-badge').forEach(el => {
        el.style.backgroundColor = t.buttonColor;
      });
    }

    // Marca (texto)
    const brandEl = document.getElementById('brandText') ||
                    document.querySelector('#brandText, .brand-text, .brandText');
    if (brandEl && t.brandText) brandEl.textContent = t.brandText;

    // Botão do topo (CTA)
    const headerCta = document.getElementById('headerCta') ||
                      document.querySelector('#headerCta, .header-cta, .headerCta, nav a#headerCta');
    if (headerCta && t.headerCta) {
      if (t.headerCta.label) headerCta.textContent = t.headerCta.label;
      if (t.headerCta.href)  headerCta.setAttribute('href', t.headerCta.href);
      if (t.buttonColor)     headerCta.style.backgroundColor = t.buttonColor;
    }
  } catch (e) {
    console.error('Falha ao carregar tema:', e);
  }
})();
