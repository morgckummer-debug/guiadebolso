// Lógica de renderização/navegação do app — portada quase verbatim de
// prototype/index.html. Os dados (MODULOS/TEMAS) chegam como parâmetros,
// buscados de /api/temas após confirmar login + licença ativa.

export function initApp(MODULOS, TEMAS) {
document.querySelectorAll('.tabbar-item[data-target]').forEach(btn=>{
  btn.addEventListener('click', ()=> activateTab(btn.dataset.target));
});

function temaById(id){ return TEMAS.find(t=>t.id===id); }
function moduloById(id){ return MODULOS.find(m=>m.id===id); }
function stripAccents(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g,''); }
function norm(s){ return stripAccents(s.toLowerCase()); }

let currentTemaId = TEMAS[0].id;
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

  const refsHTML = t.referencias.map((r,i)=>`${i+1}. ${r}`).join('<br>');

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
  <div class="art-back">‹</div>
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

function goToTema(id){
  renderTemaScreen(id);
  activateTab('panel-tema');
}

function activateTab(panelId){
  document.querySelectorAll('.tabbar-item[data-target]').forEach(b=>b.classList.toggle('active', b.dataset.target===panelId));
  document.querySelectorAll('.app-panel').forEach(p=>p.classList.toggle('active', p.id===panelId));
  const fab = document.getElementById('raciocinio-fab');
  if(fab) fab.style.display = panelId==='panel-tema' ? 'flex' : 'none';
}

renderTemaScreen(currentTemaId);

/* ================= RaciocinioFAB (FAB + Bottom Sheet) ================= */
(function(){
  const fab = document.getElementById('raciocinio-fab');
  const sheet = document.getElementById('raciocinio-sheet');
  const backdrop = document.getElementById('sheet-backdrop');
  const grabber = document.getElementById('sheet-grabber');
  const closeBtn = document.getElementById('sheet-close-btn');
  const sheetHeight = () => sheet.getBoundingClientRect().height;

  function openSheet(){
    sheet.classList.add('open');
    backdrop.classList.add('open');
  }
  function closeSheet(){
    sheet.classList.remove('open');
    backdrop.classList.remove('open');
    sheet.style.transform = '';
  }

  fab.addEventListener('click', openSheet);
  backdrop.addEventListener('click', closeSheet);
  closeBtn.addEventListener('click', closeSheet);

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

  // CTA final do fluxo: fecha o sheet e leva de volta ao bloco
  // ✅ Próximo passo do próprio Tema — fecha o ciclo entre "raciocinar"
  // e "agir", sem repetir a resposta dentro do sheet.
  const flowCta = document.getElementById('flow-cta');
  flowCta.addEventListener('click', ()=>{
    closeSheet();
    const target = document.getElementById('blk-passo');
    if(target){
      setTimeout(()=>{
        target.scrollIntoView({behavior:'smooth', block:'start'});
        target.classList.add('flow-target-pulse');
        setTimeout(()=> target.classList.remove('flow-target-pulse'), 2300);
      }, 280);
    }
  });
})();

/* ================= ÍNDICE ================= */
function renderIndice(){
  const idxRailHTML = `<div class="anchor-rail">
    <button class="anchor-chip current" data-target="mod-todos">Todos</button>
    ${MODULOS.map(m=>`<button class="anchor-chip" data-target="mod-${m.id}">${m.nome}</button>`).join('')}
  </div>`;
  document.getElementById('panel-indice').innerHTML = `
  <div class="idx-header"><div class="idx-title">Índice</div><div class="idx-search-btn" id="idx-search-btn">⌕</div></div>
  ${idxRailHTML}
  <div id="mod-todos"></div>
  ${MODULOS.map(m=>{
    const temasDoModulo = TEMAS.filter(t=>t.modulo===m.id);
    return `
    <div class="mod-section" id="mod-${m.id}">
      <div class="mod-head">
        <div class="mod-icon">${m.icon}</div>
        <div class="mod-headtext"><div class="mod-eyebrow">Módulo</div><div class="mod-name">${m.nome}</div></div>
        <div class="mod-count">${temasDoModulo.length}</div>
      </div>
      <div class="mod-temas">
      ${temasDoModulo.map(t=>`<div class="tema-row" data-goto="${t.id}"><span class="tema-star">☆</span><span class="q">${t.titulo}</span><span class="tema-chev">›</span></div>`).join('')}
      </div>
    </div>
  `;}).join('')}
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
  document.getElementById('idx-search-btn').addEventListener('click', ()=> activateTab('panel-busca'));
}
renderIndice();

/* ================= BUSCA ================= */
const BUSCAS_RECENTES = ['percentil baixo', 'placenta prévia', 'sem embrião'];

function highlightMatch(text, query){
  if(!query) return text;
  const idx = norm(text).indexOf(norm(query));
  if(idx === -1) return text;
  return text.slice(0,idx) + '<mark>' + text.slice(idx, idx+query.length) + '</mark>' + text.slice(idx+query.length);
}

function searchResultsHTML(query){
  const q = query.trim();
  if(q.length < 2){
    return `
    <div class="search-label">Buscas recentes</div>
    <div class="anchor-rail" style="border-bottom:none;padding-bottom:2px">
      ${BUSCAS_RECENTES.map(term=>`<button class="anchor-chip" data-recent="${term}">${term}</button>`).join('')}
    </div>`;
  }
  const nq = norm(q);
  const matches = TEMAS.filter(t => norm(t.titulo).includes(nq) || t.tags.some(tag=>norm(tag).includes(nq)));
  if(!matches.length){
    return `<div class="search-label">Resultados</div><div class="result-row"><span class="q" style="color:var(--ink-500);font-weight:500">Nada encontrado para "${q}" — tente outro termo.</span></div>`;
  }
  return `
  <div class="search-label">Resultados (${matches.length})</div>
  ${matches.map(t=>`
    <div class="result-row" data-goto="${t.id}" style="cursor:pointer">
      <span class="tag">${moduloById(t.modulo).nome}</span>
      <span class="q">${highlightMatch(t.titulo, q)}</span>
    </div>
  `).join('')}
  `;
}

function renderBusca(query){
  const box = document.getElementById('panel-busca');
  box.innerHTML = `
  <div class="search-box"><span>⌕</span><input id="busca-input" placeholder="Buscar dúvida, tema ou módulo" value="${query||''}"><span class="search-cancel" id="busca-cancel">Cancelar</span></div>
  <div id="busca-results">${searchResultsHTML(query||'')}</div>
  `;
  const input = document.getElementById('busca-input');
  input.addEventListener('input', ()=>{
    document.getElementById('busca-results').innerHTML = searchResultsHTML(input.value);
    bindBuscaResultInteractions();
  });
  document.getElementById('busca-cancel').addEventListener('click', ()=>{
    input.value = '';
    document.getElementById('busca-results').innerHTML = searchResultsHTML('');
    bindBuscaResultInteractions();
    input.focus();
  });
  bindBuscaResultInteractions();
}

function bindBuscaResultInteractions(){
  document.querySelectorAll('#busca-results [data-goto]').forEach(row=>{
    row.addEventListener('click', ()=> goToTema(row.dataset.goto));
  });
  document.querySelectorAll('#busca-results [data-recent]').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      const term = chip.dataset.recent;
      document.getElementById('busca-input').value = term;
      document.getElementById('busca-results').innerHTML = searchResultsHTML(term);
      bindBuscaResultInteractions();
    });
  });
}

renderBusca('');

activateTab('panel-indice');
}
