// Lê content/theme.json e aplica no site
(async () => {
  try {
    const res = await fetch('/content/theme.json', { cache: 'no-store' });
    const t = await res.json();
    const root = document.documentElement;

    const setVar = (name, val) => {
      if (val) root.style.setProperty(name, val);
    };

    // Variáveis CSS (se seu CSS usar)
    setVar('--color-primary',   t.primaryColor || t.primary);
    setVar('--color-secondary', t.secondary);
    setVar('--color-bg',        t.bg || t.backgroundColor);
    setVar('--color-text',      t.text);
    setVar('--color-card',      t.card);
    setVar('--color-button',    t.buttonColor);

    // Aplicação direta (funciona mesmo sem CSS com variáveis)
    if (document.body) {
      if (t.bg || t.backgroundColor) document.body.style.backgroundColor = t.bg || t.backgroundColor;
      if (t.text) document.body.style.color = t.text;
    }

    // Botões comuns
    document.querySelectorAll('.btn').forEach(el => {
      if (t.buttonColor) el.style.backgroundColor = t.buttonColor;
    });

    // Texto da marca (tenta achar por id ou classe comum)
    const brandEl =
      document.getElementById('brandText') ||
      document.querySelector('#brandText, .brand-text, .brandText');
    if (brandEl && t.brandText) brandEl.textContent = t.brandText;

    // Botão do topo (CTA)
    const headerCta =
      document.getElementById('headerCta') ||
      document.querySelector('#headerCta, .header-cta, .headerCta a, nav a#headerCta');
    if (headerCta && t.headerCta) {
      if (t.headerCta.label) headerCta.textContent = t.headerCta.label;
      if (t.headerCta.href)  headerCta.setAttribute('href', t.headerCta.href);
    }
  } catch (e) {
    console.error('Falha ao carregar tema:', e);
  }
})();
