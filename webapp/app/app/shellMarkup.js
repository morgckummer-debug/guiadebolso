export const SHELL_HTML = `

<div class="app-screen">

  <!-- ============ TEMA — acessível a partir do Índice/Busca, sem aba própria ============ -->
  <div class="app-panel app-scroll" id="panel-tema"></div>

  <!-- ============ ÍNDICE ============ -->
  <div class="app-panel app-scroll active" id="panel-indice"></div>

  <!-- ============ BUSCA ============ -->
  <div class="app-panel app-scroll" id="panel-busca"></div>

  <button class="raciocinio-fab" id="raciocinio-fab" aria-label="Abrir método de raciocínio rápido">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
      <path d="M9.5 2a3.5 3.5 0 0 0-3.5 3.5c0 .3 0 .6.1.9A3 3 0 0 0 4 9.3 3 3 0 0 0 3 11.5 3 3 0 0 0 4.5 14c-.3.5-.5 1.1-.5 1.8A3.2 3.2 0 0 0 7 19a3 3 0 0 0 2.5 2 3 3 0 0 0 3-2.2V5.5A3.5 3.5 0 0 0 9.5 2Z"/>
      <path d="M14.5 2a3.5 3.5 0 0 1 3.5 3.5c0 .3 0 .6-.1.9A3 3 0 0 1 20 9.3a3 3 0 0 1 1 2.2 3 3 0 0 1-1.5 2.5c.3.5.5 1.1.5 1.8A3.2 3.2 0 0 1 17 19a3 3 0 0 1-2.5 2 3 3 0 0 1-3-2.2V5.5A3.5 3.5 0 0 1 14.5 2Z"/>
    </svg>
  </button>

  <div class="sheet-backdrop" id="sheet-backdrop"></div>
  <div class="raciocinio-sheet" id="raciocinio-sheet">
    <div class="sheet-grabber" id="sheet-grabber"></div>
    <div class="sheet-content">
      <h2 class="sheet-title">Qual é o próximo passo?</h2>
      <p class="sheet-subtitle">Siga o fluxo abaixo antes de decidir qualquer conduta.</p>
      <div class="flow" id="raciocinio-flow">
        <div class="flow-node flow-start">📄 Recebi um laudo</div>
        <div class="flow-arrow"></div>
        <div class="flow-node">📅 O exame foi realizado no momento certo?</div>
        <div class="flow-arrow"></div>
        <div class="flow-node">⚠️ Isso muda minha conduta?</div>
        <div class="flow-arrow"></div>
        <div class="flow-node">💬 Como vou explicar isso para a paciente?</div>
        <div class="flow-arrow"></div>
        <div class="flow-node">🤝 Preciso compartilhar o cuidado?</div>
        <div class="flow-arrow"></div>
        <button class="flow-cta" id="flow-cta">✅ Voltar ao "Próximo passo" desta página</button>
      </div>
      <button class="sheet-close-btn" id="sheet-close-btn">Fechar e voltar ao tema</button>
    </div>
  </div>

  <div class="tabbar">
    <button class="tabbar-item" data-target="panel-indice"><span class="tabbar-icon">☰</span>Índice</button>
    <button class="tabbar-item" data-target="panel-busca"><span class="tabbar-icon">⌕</span>Busca</button>
  </div>
</div>

`;
