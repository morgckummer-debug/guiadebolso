# Guia de Bolso — Guia Digital do Obstetra

PWA mobile-first (iPhone) para obstetras no início de carreira: um guia
digital interativo, não um PDF/e-book/curso. O objetivo é ajudar na tomada
de decisão rápida durante a consulta — qualquer resposta em menos de 10
segundos.

## Etapa 1 (atual): Arquitetura, UX, UI e Design System

Sem conteúdo médico e sem autenticação implementada nesta etapa — apenas
estrutura, navegação e sistema visual, prontos para receber conteúdo e, no
futuro, integração com plataforma de venda/licenciamento (ex.: Kiwify).

1. **Arquitetura da informação** → [`docs/01-arquitetura-informacao.md`](docs/01-arquitetura-informacao.md)
   Modelo de conteúdo (Tema/Módulo), mapa de navegação, template de página,
   modelo de acesso (licença vitalícia + ponto de integração com checkout
   externo), atualização automática, e o que fica reservado para depois
   (favoritos, histórico, comunidade, novos módulos).

2. **Design System** → [`docs/02-design-system.md`](docs/02-design-system.md)
   Cor, tipografia, espaçamento, elevação/sombra, raio, movimento, grid e
   acessibilidade — paleta clara (branco, lavanda, cinzas, dourado discreto).

3. **Biblioteca de componentes** → [`docs/03-biblioteca-componentes.md`](docs/03-biblioteca-componentes.md)
   Anatomia e regras visuais dos 10 blocos fixos da sequência + 2 blocos
   contextuais (💡 Você sabia?, 🚩 Quando encaminhar) + componentes de
   navegação (índice, busca, tab bar, navegação sequencial).

4. **Acesso ao método das 5 perguntas — comparação de propostas** → [`docs/04-cinco-perguntas-acesso.md`](docs/04-cinco-perguntas-acesso.md)
   Comparação lado a lado de 3 propostas de acesso ao checklist "Qual é o
   próximo passo?" (botão flutuante, card recolhido, ícone no cabeçalho),
   contra rapidez de acesso, poluição visual, experiência no iPhone,
   consistência premium e frequência de uso. Decisão: manter o FAB
   (`RaciocinioFAB`), já implementado em `prototype/index.html`. Protótipo
   comparativo arquivado em
   [`prototype/archive/cinco-perguntas-opcoes.html`](prototype/archive/cinco-perguntas-opcoes.html)
   — mantido só como registro histórico da comparação, não é mais atualizado.

5. **Protótipo interativo (estático, sem build)** → [`prototype/index.html`](prototype/index.html)
   Abra o arquivo direto no navegador. Contém: showcase dos tokens do design
   system, showcase dos componentes, e as 3 telas principais do app, dentro
   de uma moldura de iPhone:
   - **Tema** — template de página adotado (avaliamos 3 propostas de layout;
     a de **Índice Fixo**, com um trilho de âncoras que pula direto para
     qualquer bloco sem rolar a página, foi a escolhida — referência Stripe
     Docs).
   - **Índice** — mesmo componente de trilho, agora filtrando por Módulo.
   - **Busca** — mesmo componente de trilho, agora como chips de busca
     recente.

   O trilho de âncoras (`TrilhoDeAncoras`, ver `docs/03-biblioteca-componentes.md`)
   é um único componente reaproveitado nas 3 telas — mesmo visual, mesma
   mecânica de toque, propósito diferente em cada contexto.

   O conteúdo de exemplo usado no protótipo é institucional (explica como
   usar o próprio Guia) — nenhuma linha de conteúdo clínico foi escrita
   nesta etapa, por instrução explícita do escopo.

## Próximos passos sugeridos (fora do escopo desta entrega)

- Escolher stack de implementação real (o protótipo é HTML/CSS/JS puro,
  propositalmente framework-agnóstico nesta fase de validação visual).
- Popular o modelo de conteúdo com os primeiros Temas.
- Especificar a integração de checkout/licenciamento (ex. Kiwify) via webhook
  — sem implementar autenticação nesta fase.
