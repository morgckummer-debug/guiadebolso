// Lógica de renderização/navegação do app — portada quase verbatim de
// prototype/index.html. Os dados (MODULOS/TEMAS) chegam como parâmetros,
// buscados de /api/temas após confirmar login. Quem não tem trial válido
// nem compra ativa recebe o índice inteiro, mas os temas fora da amostra
// gratuita vêm redigidos pela API (só id/título/módulo/tags + `bloqueado:
// true`, sem o conteúdo clínico) — este arquivo só decide como mostrar
// isso: ícone de cadeado no lugar da estrela e uma tela de prévia com CTA
// de compra, em vez do conteúdo completo.
import { KIWIFY_CHECKOUT_URL } from '@/lib/kiwifyCheckoutUrl';

export function initApp(MODULOS, TEMAS, ACESSO) {
document.querySelectorAll('.tabbar-item[data-target]').forEach(btn=>{
  btn.addEventListener('click', ()=> activateTab(btn.dataset.target));
});

function temaById(id){ return TEMAS.find(t=>t.id===id); }
function moduloById(id){ return MODULOS.find(m=>m.id===id); }
function stripAccents(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g,''); }
function norm(s){ return stripAccents(s.toLowerCase()); }

// Primeiro tema não-bloqueado — evita abrir o painel oculto de tema (que
// fica pronto por trás do índice, pra troca instantânea) num tema sem
// conteúdo clínico carregado.
let currentTemaId = (TEMAS.find(t=>!t.bloqueado) || TEMAS[0]).id;
let currentTemaAnchors = null;

const TEMA_ANCHORS = [
  ['blk-essencial','Essencial'],
  ['blk-erro','Erro comum'],
  ['blk-explicar','Explicar'],
  ['blk-passo','Próximo passo'],
  ['blk-confianca','Confiança'],
  ['blk-aula','Aula'],
  ['blk-ref','Referências'],
  ['blk-eagora','E agora?'],
];

function renderTemaScreen(id){
  const t = temaById(id);
  const modulo = moduloById(t.modulo);
  currentTemaId = id;

  const temaAnchors = TEMA_ANCHORS.filter(([aid])=>{
    if(aid==='blk-explicar') return !!t.explicar;
    if(aid==='blk-confianca') return !!t.confianca;
    if(aid==='blk-eagora') return !!(t.eAgora && t.eAgora.length);
    return true;
  });
  currentTemaAnchors = temaAnchors;

  const anchorRailHTML = `<div class="anchor-rail" id="anchor-rail">${
    temaAnchors.map(([aid,label],i)=>`<button class="anchor-chip${i===0?' current':''}" data-target="${aid}">${label}</button>`).join('')
  }</div>`;

  const encaminharHTML = t.encaminhar ? `
<div class="block b-alerta" id="blk-encaminhar"><div class="block-head"><div class="chip">🚩</div><div class="eyebrow">Quando encaminhar</div></div>
<div class="block-body">${t.encaminhar}</div></div>` : '';

  const perolasHTML = (t.perolas && t.perolas.length) ? `
<div class="block b-perola"><div class="block-head"><div class="chip">🔑</div><div class="eyebrow">Pérola clínica</div></div>
<div class="block-body"><ul>${t.perolas.map(p=>`<li>${p}</li>`).join('')}</ul></div></div>` : '';

  const pensandoHTML = t.pensando ? `
<div class="block b-pensando"><div class="block-head"><div class="chip">❤️</div><div class="eyebrow">O que a paciente pensa</div></div>
<div class="block-body">${t.pensando}</div></div>` : '';

  const explicarHTML = t.explicar ? `
<div class="block b-explicar" id="blk-explicar"><div class="block-head"><div class="chip">💬</div><div class="eyebrow">Como explicar</div></div>
<div class="block-body">${t.explicar}</div></div>` : '';

  const confiancaHTML = t.confianca ? `
<div class="block b-confianca" id="blk-confianca"><div class="block-head"><div class="chip">🤝</div><div class="eyebrow">Fortalece confiança</div></div>
<div class="block-body">${t.confianca}</div></div>` : '';

  const historiaHTML = t.historia ? `
<div class="block b-historia"><div class="block-head"><div class="chip">📖</div><div class="eyebrow">${t.historia.titulo}</div></div>
<div class="block-body">${t.historia.texto}</div></div>` : '';

  const passoList = t.passo.tipo==='checklist'
    ? `<ol>${t.passo.itens.map(i=>`<li>${i}</li>`).join('')}</ol>`
    : `<p>${t.passo.texto}</p>`;

  const critCount = (t.criterios||[]).reduce((n,g)=>n+(g.itens?g.itens.length:1), 0);
  const critHTML = t.criterios ? `
<div class="crit-toggle" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
  <span>Ver critérios completos (${critCount})</span><span class="crit-chevron">⌄</span>
</div>
<div class="crit-panel">
  ${t.criterios.map(g=>`
  <div class="crit-group">
    <div class="crit-group-title">${g.titulo}</div>
    ${g.itens ? g.itens.map(([label,valor])=>`<div class="crit-row"><span class="crit-label">${label}</span><span class="crit-value">${valor}</span></div>`).join('') : g.html}
  </div>`).join('')}
</div>` : '';

  const passoBody = passoList + critHTML;

  const aulaMeta = t.aula.pendente
    ? `<div class="aula-meta">Gravação pendente</div><button class="aula-btn" disabled style="opacity:.5;cursor:default">Em breve</button>`
    : `<div class="aula-meta">${t.aula.duracao} · protegido por login</div><button class="aula-btn">Assistir</button>`;

  const refsHTML = t.referencias.map((r,i)=>{
    const [texto, url] = Array.isArray(r) ? r : [r, null];
    return url ? `${i+1}. <a href="${url}" target="_blank" rel="noopener noreferrer">${texto}</a>` : `${i+1}. ${texto}`;
  }).join('<br>');

  const eAgoraHTML = (t.eAgora && t.eAgora.length) ? `
<div class="block b-eagora" id="blk-eagora"><div class="block-head"><div class="chip">🧭</div><div class="eyebrow">E agora?</div></div>
<div class="block-body"><ul>${t.eAgora.map(i=>`<li>${i}</li>`).join('')}</ul></div></div>` : '';

  const vejaHTML = t.vejaTambem.length ? `
<div class="block b-veja" id="blk-veja"><div class="block-head"><div class="chip">➜</div><div class="eyebrow">Veja também</div></div>
${t.vejaTambem.map(vid=>`<div class="veja-item" data-goto="${vid}" style="cursor:pointer">${temaById(vid).titulo} <span>›</span></div>`).join('')}
</div>` : '';

  const siblings = TEMAS.filter(x=>x.modulo===t.modulo && x.id!==t.id);
  const footerHTML = `
<div class="art-footer">
${siblings.length ? `<div class="nav-btn" data-goto="${siblings[0].id}" style="cursor:pointer"><span>◀ Tema anterior<br><small>${siblings[0].titulo}</small></span></div>` : ''}
<div class="nav-btn" id="btn-voltar-indice" style="cursor:pointer"><span>Voltar ao índice</span></div>
</div>`;

  document.getElementById('panel-tema').innerHTML = `
<div class="art-header">
  <div class="art-back" id="tema-back" style="cursor:pointer">‹</div>
  <div><div class="art-crumb">${modulo.icon} ${modulo.nome}</div><div class="progress"><i id="progress-fill"></i></div></div>
</div>
${anchorRailHTML}
<h1 class="art-title">${t.titulo}</h1>

<div class="block b-essencial" id="blk-essencial"><div class="block-head"><div class="chip">🎯</div><div class="eyebrow">O Essencial</div></div>
<div class="block-body">${t.essencial}</div></div>

${(t.vocesabia||[]).map(v=>`<div class="chip-fact"><span class="chip-fact-icon">💡</span><div class="chip-fact-text">${v}</div></div>`).join('')}
${historiaHTML}

${perolasHTML}

<div class="block b-erro" id="blk-erro"><div class="block-head"><div class="chip">⚠️</div><div class="eyebrow">Erro comum</div></div>
<div class="block-body">${t.erro}</div></div>

${pensandoHTML}

${explicarHTML}

<div class="block b-passo" id="blk-passo"><div class="block-head"><div class="chip">✅</div><div class="eyebrow">Qual é o próximo passo?</div></div>
<div class="block-body">${passoBody}</div></div>
${encaminharHTML}

${confiancaHTML}

<div class="block b-aprendi"><div class="block-head"><div class="chip">💜</div><div class="eyebrow">Com o tempo, aprendi que…</div></div>
<div class="block-body">"${t.aprendi}"</div>
<div class="aprendi-assinatura">— Dra. Morgana Kummer</div></div>

<div class="block b-aula" id="blk-aula"><div class="block-head"><div class="chip">🎥</div><div class="eyebrow">Aula Express</div></div>
<div class="block-body">${t.aula.titulo}</div>
<div class="aula-media"><div class="aula-play">▶</div>${aulaMeta}</div></div>

<div class="block b-ref" id="blk-ref"><div class="ref-toggle" onclick="this.parentElement.querySelector('.ref-list').classList.toggle('open')"><div class="block-head" style="margin-bottom:0"><div class="chip">📚</div><div class="eyebrow">Referências</div></div><span style="font-size:12px;color:var(--ink-500)">Ver (${t.referencias.length}) ⌄</span></div>
<div class="ref-list">${refsHTML}</div></div>

${eAgoraHTML}
${vejaHTML}
${footerHTML}
`;

  bindTemaScreenInteractions();
}

function bindTemaScreenInteractions(){
  const temaScroll = document.getElementById('panel-tema');

  temaScroll.querySelectorAll('.anchor-chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      const el = document.getElementById(chip.dataset.target);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  temaScroll.querySelectorAll('[data-goto]').forEach(el=>{
    el.addEventListener('click', ()=> goToTema(el.dataset.goto));
  });

  const backBtn = document.getElementById('btn-voltar-indice');
  if(backBtn) backBtn.addEventListener('click', ()=> activateTab('panel-indice'));

  const backArrow = document.getElementById('tema-back');
  if(backArrow) backArrow.addEventListener('click', ()=> activateTab('panel-indice'));

  // scroll-spy + progresso de leitura
  temaScroll.onscroll = ()=>{
    const top = temaScroll.getBoundingClientRect().top + 56;
    const anchors = currentTemaAnchors || TEMA_ANCHORS;
    let current = anchors[0][0];
    for(const [aid] of anchors){
      const el = document.getElementById(aid);
      if(el && el.getBoundingClientRect().top - top < 40) current = aid;
    }
    temaScroll.querySelectorAll('.anchor-chip').forEach(c=>c.classList.toggle('current', c.dataset.target===current));

    const max = temaScroll.scrollHeight - temaScroll.clientHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (temaScroll.scrollTop / max) * 100)) : 0;
    const fill = document.getElementById('progress-fill');
    if(fill) fill.style.width = pct + '%';
  };
  temaScroll.scrollTop = 0;
  temaScroll.onscroll();
}

function renderBloqueadoScreen(t){
  const modulo = moduloById(t.modulo);
  currentTemaId = t.id;
  currentTemaAnchors = null;

  document.getElementById('panel-tema').innerHTML = `
<div class="art-header">
  <div class="art-back" id="premium-back">‹</div>
  <div><div class="art-crumb">${modulo.icon} ${modulo.nome}</div></div>
</div>
<div class="premium-lock">
  <div class="premium-lock-icon">🔒</div>
  <h1 class="art-title">${t.titulo}</h1>
  <p class="premium-lock-text">Esse tema faz parte do conteúdo completo do Guia Digital do Obstetra. Garanta seu acesso pra desbloquear esse e todos os outros temas clínicos.</p>
  <a class="premium-lock-cta" href="${KIWIFY_CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">Desbloquear conteúdo completo</a>
  <div class="nav-btn" id="premium-voltar-indice" style="cursor:pointer;margin-top:10px"><span>Voltar ao índice</span></div>
</div>`;

  document.getElementById('premium-back').addEventListener('click', ()=> activateTab('panel-indice'));
  document.getElementById('premium-voltar-indice').addEventListener('click', ()=> activateTab('panel-indice'));
}

function goToTema(id){
  const t = temaById(id);
  activateTab('panel-tema');
  if(t && t.bloqueado){
    renderBloqueadoScreen(t);
    // sem "Próximo passo" nessa tela pra rolar até — o FAB de raciocínio não se aplica aqui.
    const fab = document.getElementById('raciocinio-fab');
    if(fab) fab.style.display = 'none';
  } else {
    renderTemaScreen(id);
  }
}

let currentPanel = 'panel-indice';

function activateTab(panelId){
  document.querySelectorAll('.tabbar-item[data-target]').forEach(b=>b.classList.toggle('active', b.dataset.target===panelId));
  document.querySelectorAll('.app-panel').forEach(p=>p.classList.toggle('active', p.id===panelId));
  currentPanel = panelId;
  const fab = document.getElementById('raciocinio-fab');
  if(fab) fab.style.display = 'flex';
  triggerFabPulse(panelId);
}

renderTemaScreen(currentTemaId); // currentTemaId nunca é bloqueado, ver acima

/* ================= RaciocinioFAB (FAB + busca + raciocínio) =================
   Único ponto de busca do app (substitui o antigo ícone de busca do
   cabeçalho e a aba Busca — ver docs/01 §3.1 e docs/03) e o método de
   raciocínio do Guia. Nó 1 do fluxo ("Recebi um laudo") sempre abre o
   seletor de achados; os demais só são clicáveis dentro de um Tema. */
const RACIOCINIO_FLOW = [
  ['📄','Recebi um laudo'],
  ['📅','O exame foi realizado no momento certo?'],
  ['⚠️','Isso muda minha conduta?'],
  ['💬','Como vou explicar isso para a paciente?'],
  ['🤝','Preciso compartilhar o cuidado?'],
];
// Índice 0 ("Recebi um laudo") não tem bloco fixo — abre o seletor de achados.
const FLOW_BLOCK_TARGETS = [null, 'blk-essencial', 'blk-passo', 'blk-explicar', 'blk-encaminhar'];

// "Recebi um laudo" → "o que você encontrou?" — cada achado leva direto para
// o Tema certo, já rolado até "Qual é o próximo passo?" (blk-passo).
const LAUDO_ACHADOS = [
  {icon:'📈', label:'Percentil baixo', goto:'pig-x-rcf'},
  {icon:'🟣', label:'Placenta baixa', goto:'placenta-baixa'},
  {icon:'📡', label:'Doppler alterado', goto:'doppler-introducao'},
  {icon:'🔐', label:'Colo curto', goto:'colo-curto'},
  {icon:'💧', label:'Dilatação renal', goto:'dilatacao-pelves-renais'},
  {icon:'✨', label:'Marcador de aneuploidia', sub:[
    {icon:'✨', label:'Foco ecogênico intracardíaco', goto:'foco-ecogenico-intracardiaco'},
    {icon:'✨', label:'Intestino hiperecogênico', goto:'intestino-hiperecogenico'},
    {icon:'➕', label:'Artéria umbilical única', goto:'arteria-umbilical-unica'},
  ]},
];

const BUSCAS_RECENTES = ['percentil baixo', 'placenta prévia', 'sem embrião'];

function highlightMatch(text, query){
  if(!query) return text;
  const idx = norm(text).indexOf(norm(query));
  if(idx === -1) return text;
  return text.slice(0,idx) + '<mark>' + text.slice(idx, idx+query.length) + '</mark>' + text.slice(idx+query.length);
}

function fabEmptyStateHTML(insideTema){
  return `
  <div class="search-label">Buscas recentes</div>
  <div class="anchor-rail" style="border-bottom:none;padding-bottom:2px">
    ${BUSCAS_RECENTES.map(term=>`<button class="anchor-chip" data-recent="${term}">${term}</button>`).join('')}
  </div>
  <div class="flow">
    ${RACIOCINIO_FLOW.map(([icon,text],i)=>{
      const clickable = i===0 || insideTema;
      const cls = `flow-node${i===0?' flow-start':''}${clickable?' flow-node-clickable':''}`;
      const arrow = i>0 ? '<div class="flow-arrow"></div>' : '';
      const chevron = clickable ? '<span class="flow-node-chevron">›</span>' : '';
      return `${arrow}<button type="button" class="${cls}" data-flow-idx="${i}"><span class="flow-node-text">${icon} ${text}</span>${chevron}</button>`;
    }).join('')}
  </div>`;
}

function achadosPickerHTML(list, title){
  return `
  <button type="button" class="sheet-back-btn" id="achados-back">‹ Voltar</button>
  <div class="search-label">${title}</div>
  <div class="achados-grid">
    ${list.map((a,i)=>`<button type="button" class="achado-card" data-achado-idx="${i}"><span class="achado-icon">${a.icon}</span><span>${a.label}</span></button>`).join('')}
  </div>
  <button type="button" class="sheet-fallback-link" id="achados-search-fallback">Não encontrou? Buscar manualmente</button>`;
}

function fabResultsHTML(query){
  const nq = norm(query.trim());
  const matches = TEMAS.filter(t => norm(t.titulo).includes(nq) || t.tags.some(tag=>norm(tag).includes(nq)));
  if(!matches.length){
    return `
    <div class="sheet-fallback">
      <div class="sheet-fallback-icon">⌕</div>
      <div class="sheet-fallback-title">Ainda não escrevemos sobre isso</div>
      <div class="sheet-fallback-sub">Sua pergunta foi guardada — pode virar o próximo Tema do Guia.</div>
    </div>`;
  }
  return `
  <div class="search-label">Resultados (${matches.length})</div>
  ${matches.map(t=>`
    <div class="result-row" data-goto="${t.id}" style="cursor:pointer">
      <span class="tag">${moduloById(t.modulo).nome}</span>
      <span class="q">${t.bloqueado ? '🔒 ' : ''}${highlightMatch(t.titulo, query)}</span>
    </div>
  `).join('')}
  `;
}

const pulsedPanels = new Set();
let triggerFabPulse = function(){}; // substituída depois que o FAB é montado

(function(){
  const fab = document.getElementById('raciocinio-fab');
  const pulsePill = document.getElementById('fab-pulse-pill');
  const sheet = document.getElementById('raciocinio-sheet');
  const backdrop = document.getElementById('sheet-backdrop');
  const grabber = document.getElementById('sheet-grabber');
  const closeBtn = document.getElementById('sheet-close-btn');
  const input = document.getElementById('fab-input');
  const body = document.getElementById('fab-body');
  const sheetHeight = () => sheet.getBoundingClientRect().height;

  // Pilha do seletor de achados ("Recebi um laudo" → achado → sub-achado).
  // Vazia = mostra o fluxograma; com itens = mostra a lista no topo da pilha.
  let achadosStack = [];

  function scrollToBlockAfterClose(blockId){
    const target = document.getElementById(blockId);
    if(!target) return;
    setTimeout(()=>{
      target.scrollIntoView({behavior:'smooth', block:'start'});
      target.classList.add('flow-target-pulse');
      setTimeout(()=> target.classList.remove('flow-target-pulse'), 2300);
    }, 320);
  }

  function openAchados(list, title){
    achadosStack.push({list, title});
    renderBody(input.value);
  }
  function achadosBack(){
    achadosStack.pop();
    renderBody(input.value);
  }

  function bindBodyInteractions(){
    body.querySelectorAll('[data-goto]').forEach(row=>{
      row.addEventListener('click', ()=>{
        closeSheet();
        goToTema(row.dataset.goto);
      });
    });
    body.querySelectorAll('[data-recent]').forEach(chip=>{
      chip.addEventListener('click', ()=>{
        input.value = chip.dataset.recent;
        renderBody(input.value);
        input.focus();
      });
    });

    // Card "Recebi um laudo" abre o seletor de achados; dentro de um Tema,
    // os demais cards saltam direto para o bloco correspondente da leitura.
    body.querySelectorAll('[data-flow-idx]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const idx = Number(btn.dataset.flowIdx);
        if(idx===0){
          openAchados(LAUDO_ACHADOS, 'O que você encontrou?');
          return;
        }
        const blockId = FLOW_BLOCK_TARGETS[idx];
        if(!blockId || currentPanel!=='panel-tema') return;
        closeSheet();
        scrollToBlockAfterClose(blockId);
      });
    });

    // Cards do seletor de achados: sub-lista (marcadores) ou vai direto para
    // o Tema, já rolado até "Qual é o próximo passo?".
    body.querySelectorAll('[data-achado-idx]').forEach(card=>{
      card.addEventListener('click', ()=>{
        const list = achadosStack[achadosStack.length-1].list;
        const item = list[Number(card.dataset.achadoIdx)];
        if(item.sub){
          openAchados(item.sub, item.label);
        } else {
          closeSheet();
          goToTema(item.goto);
          scrollToBlockAfterClose('blk-passo');
        }
      });
    });
    const achadosBackBtn = body.querySelector('#achados-back');
    if(achadosBackBtn) achadosBackBtn.addEventListener('click', achadosBack);

    const achadosFallback = body.querySelector('#achados-search-fallback');
    if(achadosFallback){
      achadosFallback.addEventListener('click', ()=>{
        achadosStack = [];
        renderBody(input.value);
        input.focus();
      });
    }
  }

  // Estado vazio (buscas recentes + fluxograma), seletor de achados (2º nível
  // do card "Recebi um laudo") ou digitando (≥2 caracteres, resultados
  // agrupados) — ver docs/03, anatomia do RaciocinioFAB.
  function renderBody(query){
    if(query && query.trim().length >= 2){
      body.innerHTML = fabResultsHTML(query);
    } else if(achadosStack.length){
      const top = achadosStack[achadosStack.length-1];
      body.innerHTML = achadosPickerHTML(top.list, top.title);
    } else {
      body.innerHTML = fabEmptyStateHTML(currentPanel==='panel-tema');
    }
    bindBodyInteractions();
  }

  function cancelPulse(){
    pulsePill.classList.remove('show');
    fab.classList.remove('pulsing');
  }
  function openSheet(){
    cancelPulse();
    closeBtn.textContent = currentPanel==='panel-tema' ? 'Fechar e voltar ao tema' : 'Fechar';
    renderBody(input.value);
    sheet.classList.add('open');
    backdrop.classList.add('open');
  }
  function closeSheet(){
    sheet.classList.remove('open');
    backdrop.classList.remove('open');
    sheet.style.transform = '';
    achadosStack = [];
  }

  closeBtn.addEventListener('click', closeSheet);
  fab.addEventListener('click', openSheet);
  backdrop.addEventListener('click', closeSheet);
  input.addEventListener('input', ()=> renderBody(input.value));

  // arrastar para fechar, a partir do grabber
  let dragStartY = null;
  grabber.addEventListener('pointerdown', (e)=>{
    dragStartY = e.clientY;
    sheet.classList.add('dragging');
    grabber.setPointerCapture(e.pointerId);
  });
  grabber.addEventListener('pointermove', (e)=>{
    if(dragStartY === null) return;
    const delta = Math.max(0, e.clientY - dragStartY);
    sheet.style.transform = `translateY(${delta}px)`;
  });
  function endDrag(e){
    if(dragStartY === null) return;
    const delta = Math.max(0, e.clientY - dragStartY);
    sheet.classList.remove('dragging');
    dragStartY = null;
    if(delta > sheetHeight() * 0.28){
      closeSheet();
    } else {
      sheet.style.transform = '';
    }
  }
  grabber.addEventListener('pointerup', endDrag);
  grabber.addEventListener('pointercancel', endDrag);

  // Pulso único "tá com dúvida?" — uma vez por tela (Índice/Tema), ~600ms
  // após a tela ativar, some sozinho em ~2,2s. Nunca loop, cancelado na
  // hora por qualquer toque no FAB.
  triggerFabPulse = function(panelId){
    if(panelId!=='panel-indice' && panelId!=='panel-tema') return;
    if(pulsedPanels.has(panelId)) return;
    pulsedPanels.add(panelId);
    setTimeout(()=>{
      if(sheet.classList.contains('open')) return;
      fab.classList.add('pulsing');
      pulsePill.classList.add('show');
      setTimeout(()=> fab.classList.remove('pulsing'), 400);
      setTimeout(()=> pulsePill.classList.remove('show'), 2200);
    }, 600);
  };
})();

/* ================= ÍNDICE ================= */
function acessoBannerHTML(){
  if(!ACESSO || ACESSO.nivel === 'completo') return '';
  if(ACESSO.nivel === 'trial'){
    const dias = Math.max(0, Math.ceil((new Date(ACESSO.trialTerminaEm) - Date.now()) / 86400000));
    const plural = dias === 1 ? 'dia' : 'dias';
    return `<a class="acesso-banner" href="${KIWIFY_CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">
      <span>🎁 Seu teste grátis termina em ${dias} ${plural}</span>
      <span class="acesso-banner-cta">Garantir acesso completo ›</span>
    </a>`;
  }
  return `<a class="acesso-banner" href="${KIWIFY_CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">
    <span>🔒 Você está no plano gratuito</span>
    <span class="acesso-banner-cta">Desbloquear todos os temas ›</span>
  </a>`;
}

const TRILHAS = [
  {id:'achados', titulo:'Achados no exame', subtitulo:'O que esse achado significa e o que fazer com ele'},
  {id:'conducao', titulo:'Condução do pré-natal', subtitulo:'O que pedir e por que, em cada fase da gestação'},
];

function moduloSectionHTML(m){
  const temasDoModulo = TEMAS.filter(t=>t.modulo===m.id);
  return `
    <div class="mod-section" id="mod-${m.id}">
      <div class="mod-head">
        <div class="mod-icon">${m.icon}</div>
        <div class="mod-headtext"><div class="mod-eyebrow">Módulo</div><div class="mod-name">${m.nome}</div></div>
        <div class="mod-count">${temasDoModulo.length}</div>
      </div>
      <div class="mod-temas">
      ${temasDoModulo.map(t=>`<div class="tema-row${t.bloqueado?' tema-row-bloqueado':''}" data-goto="${t.id}"><span class="tema-star">${t.bloqueado?'🔒':'☆'}</span><span class="q">${t.titulo}</span><span class="tema-chev">›</span></div>`).join('')}
      </div>
    </div>
  `;
}

function renderIndice(){
  const idxRailHTML = `<div class="anchor-rail">
    <button class="anchor-chip current" data-target="mod-todos">Todos</button>
    ${MODULOS.map(m=>`<button class="anchor-chip" data-target="mod-${m.id}">${m.nome}</button>`).join('')}
  </div>`;
  document.getElementById('panel-indice').innerHTML = `
  <div class="brand-header">
    <img src="/apple-icon.png" alt="" width="36" height="36"/>
    <div>
      <div class="brand-name">Guia Digital do Obstetra</div>
      <div class="brand-tag">Sua mentoria digital em ultrassom fetal</div>
    </div>
  </div>
  ${acessoBannerHTML()}
  <div class="idx-header"><div class="idx-title">Índice</div></div>
  ${idxRailHTML}
  <div id="mod-todos"></div>
  ${(()=>{
    let trilhasRenderizadas = 0;
    return TRILHAS.map(trilha=>{
      const modulosDaTrilha = MODULOS.filter(m=>m.trilha===trilha.id);
      if(!modulosDaTrilha.length) return '';
      const primeira = trilhasRenderizadas === 0;
      trilhasRenderizadas++;
      return `
      <div class="trilha-heading${primeira?' trilha-heading-primeira':''}"><div class="trilha-titulo">${trilha.titulo}</div><div class="trilha-subtitulo">${trilha.subtitulo}</div></div>
      ${modulosDaTrilha.map(moduloSectionHTML).join('')}
      `;
    }).join('');
  })()}
  `;
  const idxScroll = document.getElementById('panel-indice');
  idxScroll.querySelectorAll('.anchor-chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      idxScroll.querySelectorAll('.anchor-chip').forEach(c=>c.classList.remove('current'));
      chip.classList.add('current');
      document.getElementById(chip.dataset.target).scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
  idxScroll.querySelectorAll('[data-goto]').forEach(row=>{
    row.addEventListener('click', ()=> goToTema(row.dataset.goto));
  });
}
renderIndice();

activateTab('panel-indice');
}
