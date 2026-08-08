# Acesso ao método das 5 perguntas — comparação de propostas

> Complementa `01-arquitetura-informacao.md §3.1` e o componente
> `RaciocinioFAB` em `03-biblioteca-componentes.md`. Este documento existe
> porque a decisão de layout do FAB foi tomada junto com o restante da
> arquitetura, sem uma comparação lado a lado registrada — este é o
> registro dessa comparação, feita a pedido, contra duas alternativas.

Protótipo interativo (arquivado, só como registro — não é mais atualizado):
[`prototype/archive/cinco-perguntas-opcoes.html`](../prototype/archive/cinco-perguntas-opcoes.html)
(abrir direto no navegador — 3 abas, mesma tela de Tema, cada uma com o
mecanismo de acesso funcional). A implementação viva da opção escolhida
(FAB) está em [`prototype/index.html`](../prototype/index.html).

## As três propostas avaliadas

- **A — Botão flutuante (FAB)**, canto inferior direito, fixo durante toda
  a leitura de um Tema. É a proposta já especificada como `RaciocinioFAB`.
- **B — Card recolhido** logo abaixo do título da página, expande inline
  ao toque (accordion).
- **C — Ícone no cabeçalho** que abre um Bottom Sheet.

## Critério de avaliação

A métrica única do produto é *tempo até a resposta certa < 10 segundos*
(`01-arquitetura-informacao.md §1`). Qualquer proposta de acesso ao método
das 5 perguntas é julgada por essa régua antes de qualquer preferência
estética.

## Comparação

| Critério | A · FAB | B · Card recolhido | C · Ícone no cabeçalho |
|---|---|---|---|
| **Rapidez de acesso** | Alta — 1 toque, em qualquer ponto do scroll. | Baixa — só existe no topo; dúvida no meio da leitura exige rolar de volta. | Média — 1 toque, mas o cabeçalho hoje **não é sticky** (só o trilho de âncoras é), então o ícone some ao rolar, igual ao problema do B. |
| **Poluição visual** | Média — overlay permanente, mitigado pelo tamanho (56px) e por sumir nas telas de lista. | Média — não sobrepõe nada, mas disputa atenção com 🎯 Essencial logo no topo. | Baixa — ícone de 32px no cabeçalho, mesmo padrão do botão de busca já usado no Índice. |
| **Experiência no iPhone** | Alta — padrão nativo reconhecível, thumb-friendly, respeita safe-area, não conflita com a tab bar. | Média — accordion é nativo, mas não resolve o caso de uso real (dúvida no meio da consulta). | Média — abrir sheet por ícone de cabeçalho é nativo, mas só funciona bem com cabeçalho sticky. |
| **Consistência com design premium** | Alta — já usa ícone outline (não emoji), sombra suave, acento único, seguindo a própria regra do design system (§8 Iconografia). | Alta — tom "quiet", combina com a referência Stripe Docs/Notion do design system. | Baixa — o emoji 🧠 pedido para o cabeçalho contraria a própria regra do design system: interface = ícone outline fino, emoji = só identidade de bloco de conteúdo. |
| **Frequência de uso esperada** | Alta — desenhado como camada global para uso repetido a qualquer momento da leitura. | Baixa — a fricção de rolar para cima desestimula reabrir o fluxo de raciocínio mais de uma vez na mesma leitura. | Média — aceitável no início da leitura, menos confiável para reconsultar no meio, sem header sticky. |

## Recomendação: Opção A — Botão flutuante (FAB)

É a única das três que garante acesso em 1 toque **independentemente do
ponto de rolagem** — a condição que o próprio produto define como critério
de sucesso da arquitetura: *"se a resposta exigir dois toques a mais que o
necessário, a tela está errada"* (`01-arquitetura-informacao.md §8`). O
método das 5 perguntas não é conteúdo de um Tema específico — é uma
ferramenta de raciocínio que precisa estar disponível no exato momento da
dúvida, que pode surgir em qualquer linha da página, não só no topo.

**Por que não B:** o card recolhido é visualmente mais discreto, mas
otimiza a primeira impressão da página, não o momento real de uso. Em
consulta, a dúvida raramente aparece assim que o Tema abre — normalmente
surge depois de ler o Essencial ou o Próximo passo, quando o card já saiu
da tela.

**Por que não C:** é a proposta mais elegante em repouso, mas depende de
uma mudança de arquitetura que ainda não existe (cabeçalho sticky) para
não ter o mesmo problema do B — e o pedido de usar o emoji 🧠 no ícone
contraria a regra que o próprio design system estabeleceu para diferenciar
"conteúdo" (emoji) de "interface" (ícone outline). Se essa opção for
revisitada, header sticky + ícone outline seriam pré-requisitos, não
polimento opcional.

**Ressalva sobre A:** a poluição visual do FAB é real e é o único ponto
onde perde para as outras duas — mas é gerenciável: manter o FAB ausente
nas telas de lista (Índice, Busca, Perfil), como já especificado, e
validar contraste sobre o bloco 🎥 Aula Express (único card de fundo
escuro) antes de finalizar.

## Decisão

Mantém-se a proposta já especificada (`RaciocinioFAB`, Opção A). Nenhuma
mudança de arquitetura é necessária — este documento formaliza a
comparação que sustenta a decisão já registrada em
`01-arquitetura-informacao.md §3.1`.

## Revisão — 2026-08-08: o FAB absorve a busca do app

**Gatilho da revisão:** ao comparar dois percursos de usuária iniciante —
achado "golf ball" (foco ecogênico intracardíaco, sem urgência) × achado
"megabexiga" — ficou claro que o fluxograma fixo do FAB ("📄 Recebi um
laudo → ...") é redundante quando o Tema já tem o bloco contextual 🧭 *E
agora?* bem escrito: no caso do golf ball, o bloco ✅ *Próximo passo*
sozinho já fecha a dúvida, o FAB nunca chega a ser aberto. A lacuna real
do FAB não é "ajudar a decidir dentro de um Tema que já se está lendo" —
é ajudar **quem ainda não sabe qual Tema procurar**.

**Nova decisão:**
- O FAB substitui o ícone de busca do cabeçalho — passa a ser o **único
  ponto de busca do app**, não mais uma ferramenta paralela a ela.
- Fica visível em **toda tela** (Início, Índice, Favoritos, Tema), não
  mais só durante a leitura de um Tema — pré-requisito para virar a
  busca do app inteiro.
- Chamada visual: **pulso único** ao aparecer (não animação em loop),
  com rótulo "tá com dúvida?" — evita repetição chamativa demais para uso
  em consulta real.
- Ao abrir, oferece busca por texto (tolerante a erro de digitação e
  sinônimo, ex. "golf ball" ou "foco intracardíaco" acham o mesmo Tema) ou
  um caminho guiado — ambos **fechados no conteúdo dos Temas já escritos**.
  Sem IA generativa aberta: a resposta continua sendo sempre a palavra da
  autora, nunca uma resposta inventada (ver também discussão que gerou
  esta revisão).
- Dúvida sem Tema correspondente não gera resposta — cai no fluxo do
  backlog (`07-backlog-temas.md`), sinalizando honestamente a lacuna e
  registrando a busca como candidata a virar Tema.

**O que isto revoga da comparação acima:** a Opção A continua vencendo,
mas o escopo do componente muda — de "ferramenta de raciocínio só de
dentro de um Tema" para "busca única do app + raciocínio". Os detalhes de
implementação (anatomia do pulso, campo de busca, tela de fallback do
backlog) ainda **não foram especificados** — `01-arquitetura-informacao.md
§3` e `§3.1`, e a anatomia de `RaciocinioFAB` em
`03-biblioteca-componentes.md`, continuam descrevendo a versão anterior
(Tema-only, sem busca embutida) até uma próxima rodada de design. O
protótipo (`prototype/index.html`) também não foi alterado por esta
revisão.
