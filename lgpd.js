/* ===== Aviso de cookies e privacidade (LGPD) — usado em todas as páginas ===== */
(function () {
  var KEY = 'gardiase-cookies';

  function lerEscolha() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function salvarEscolha(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  // ano atual no rodapé
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Fontes do Google: liga/desliga conforme a escolha ---------- */
  function ligarFontes() {
    if (document.querySelector('link[data-gfont]')) return;
    (window.__gfonts || []).forEach(function (href) {
      var l = document.createElement('link');
      l.rel = 'stylesheet'; l.href = href; l.setAttribute('data-gfont', '');
      document.head.appendChild(l);
    });
  }
  function desligarFontes() {
    document.querySelectorAll('link[data-gfont]').forEach(function (l) { l.remove(); });
  }

  /* ---------- Aviso (banner) ---------- */
  var icone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-5-5 4 4 0 0 1-4-4z"/><circle cx="8.5" cy="10.5" r=".9" fill="currentColor"/><circle cx="12" cy="15.5" r=".9" fill="currentColor"/><circle cx="15.5" cy="13" r=".9" fill="currentColor"/><circle cx="8" cy="15" r=".6" fill="currentColor"/></svg>';

  document.body.insertAdjacentHTML('beforeend',
    '<div class="lgpd-banner" id="lgpdBanner" role="region" aria-label="Aviso de cookies" hidden>' +
      '<span class="lgpd-ico" aria-hidden="true">' + icone + '</span>' +
      '<div class="lgpd-text">' +
        '<b>Sua privacidade importa</b>' +
        '<p>Este site não usa cookies de rastreamento nem de publicidade. Usamos só o essencial para funcionar e fontes do Google Fonts, que recebem o seu endereço IP. ' +
        '<button type="button" class="lgpd-link" data-lgpd="mais">Saiba mais</button></p>' +
      '</div>' +
      '<div class="lgpd-btns">' +
        '<button type="button" class="lgpd-btn ghost" data-lgpd="recusar">Recusar</button>' +
        '<button type="button" class="lgpd-btn solid" data-lgpd="aceitar">Aceitar</button>' +
      '</div>' +
    '</div>' +

    '<dialog class="lgpd-modal" id="lgpdModal" aria-labelledby="lgpdTitulo">' +
      '<div class="lgpd-modal-in">' +
        '<button type="button" class="lgpd-x" data-lgpd="fechar" aria-label="Fechar">✕</button>' +
        '<span class="lgpd-ico big" aria-hidden="true">' + icone + '</span>' +
        '<h2 id="lgpdTitulo">Privacidade e cookies</h2>' +
        '<p class="lgpd-sub">Em respeito à Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018), explicamos o que acontece quando você visita este site.</p>' +
        '<ul>' +
          '<li><b>Nenhum dado pedido.</b> O site é informativo: não tem cadastro, formulário nem login.</li>' +
          '<li><b>Sem rastreamento.</b> Não usamos cookies de publicidade, de estatísticas ou de rastreamento.</li>' +
          '<li><b>Só o essencial no seu navegador.</b> Guardamos apenas a sua resposta a este aviso, para não perguntar de novo.</li>' +
          '<li><b>Fontes do Google.</b> Os textos usam fontes do Google Fonts. Para entregá-las, o Google recebe o endereço IP do seu aparelho. Se você recusar, o site passa a usar as fontes do próprio aparelho.</li>' +
          '<li><b>Hospedagem.</b> O site fica na Vercel, que pode registrar dados técnicos de acesso (como IP e navegador) por segurança.</li>' +
          '<li><b>Links externos.</b> Ao abrir o site da AATAN, o WhatsApp ou o Google Maps, valem as políticas de privacidade desses serviços.</li>' +
        '</ul>' +
        '<p class="lgpd-sub">Você pode mudar sua escolha quando quiser pelo link <b>Privacidade e cookies</b>, no rodapé. Dúvidas: fale com o desenvolvedor pelo GitHub <a href="https://github.com/thalyssxn" target="_blank" rel="noopener">thalyssxn</a>.</p>' +
        '<p class="lgpd-status" id="lgpdStatus"></p>' +
        '<div class="lgpd-btns">' +
          '<button type="button" class="lgpd-btn ghost" data-lgpd="recusar">Recusar</button>' +
          '<button type="button" class="lgpd-btn solid" data-lgpd="aceitar">Aceitar</button>' +
        '</div>' +
      '</div>' +
    '</dialog>'
  );

  var banner = document.getElementById('lgpdBanner');
  var modal = document.getElementById('lgpdModal');
  var status = document.getElementById('lgpdStatus');

  function mostrarBanner() {
    banner.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { banner.classList.add('show'); }); });
  }
  function esconderBanner() {
    banner.classList.remove('show');
    setTimeout(function () { banner.hidden = true; }, 400);
  }
  function atualizarStatus() {
    var e = lerEscolha();
    status.textContent = e === 'aceito' ? 'Sua escolha atual: aceito.'
      : e === 'recusado' ? 'Sua escolha atual: recusado (sem fontes do Google).'
      : 'Você ainda não escolheu.';
  }
  function abrirModal() {
    atualizarStatus();
    if (modal.showModal) { if (!modal.open) modal.showModal(); } else { modal.setAttribute('open', ''); }
  }
  function fecharModal() {
    if (modal.close) modal.close(); else modal.removeAttribute('open');
  }

  function escolher(v) {
    salvarEscolha(v);
    if (v === 'aceito') ligarFontes(); else desligarFontes();
    esconderBanner();
    fecharModal();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lgpd], .lgpd-open');
    if (!b) return;
    if (b.classList.contains('lgpd-open')) return abrirModal();
    var acao = b.getAttribute('data-lgpd');
    if (acao === 'aceitar') escolher('aceito');
    else if (acao === 'recusar') escolher('recusado');
    else if (acao === 'mais') abrirModal();
    else if (acao === 'fechar') fecharModal();
  });
  // clicar fora da caixa fecha
  modal.addEventListener('click', function (e) { if (e.target === modal) fecharModal(); });

  if (!lerEscolha()) setTimeout(mostrarBanner, 700);
})();
