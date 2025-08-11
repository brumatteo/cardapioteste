// assets/js/theme.js
(async function () {
  try {
    const res = await fetch('/content/theme.json', { cache: 'no-store' });
    const t = await res.json();

    // valores (com fallback ao que você já definiu no theme.json)
    const btn   = t.buttonColor || '#97af7d';
    const prim  = t.primaryColor || '#58410d';
    const sec   = t.secondary || '#7a5c4b';
    const bg    = t.bg || '#f8f6f3';
    const text  = t.text || '#5a4b42';
    const card  = t.card || '#ffffff';

    // injeta CSS na página
    const css = `
      :root{
        --btn-color:${btn};
        --primary-color:${prim};
        --secondary-color:${sec};
        --bg-color:${bg};
        --text-color:${text};
        --card-bg:${card};
      }
      body{ background: var(--bg-color) !important; color: var(--text-color) !important; }
      a{ color: var(--primary-color) !important; }
      .btn, .button, button,
      .products .product .cta button,
      .products .product .cta .btn{
        background: var(--btn-color) !important;
        border-color: var(--btn-color) !important;
        color: #fff !important;
      }
      .card, .product, .policy, .faq-item, .about-card{
        background: var(--card-bg) !important;
      }
      h1,h2,h3,h4,h5,h6,.link, .nav a{ color: var(--primary-color) !important; }
    `;
    const styleTag = document.createElement('style');
    styleTag.setAttribute('data-theme', 'injected');
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  } catch (e) {
    console.error('Tema: falhou ao carregar', e);
  }
})();
