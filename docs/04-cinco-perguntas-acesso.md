# Acesso ao método das 5 perguntas — comparação de propostas

> Complementa `01-arquitetura-informacao.md §3.1` e o componente
> `RaciocinioFAB` em `03-biblioteca-componentes.md`. Este documento existe
> porque a decisão de layout do FAB foi tomada junto com o restante da
> arquitetura, sem uma comparação lado a lado registrada — este é o
> registro dessa comparação, feita a pedido, contra duas alternativas.

Protótipo interativo: [`prototype/cinco-perguntas-opcoes.html`](../prototype/cinco-perguntas-opcoes.html)
(abrir direto no navegador — 3 abas, mesma tela de Tema, cada uma com o
mecanismo de acesso funcional).

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
