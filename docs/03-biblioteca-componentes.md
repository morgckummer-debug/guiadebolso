# Biblioteca de Componentes — Guia Digital do Obstetra

Todos os componentes de conteúdo compartilham a mesma anatomia base
(`InfoBlock`), variando apenas cor de acento, ícone e comportamento
específico. Isso é o que garante "mesmo padrão visual" entre os 11 tipos
pedidos no briefing, mesmo com propósitos diferentes.

## Componente global — `RaciocinioFAB` (elemento central da identidade)

Diferente de todo o resto da biblioteca, este componente **não pertence a
uma tela** — ele vive acima da experiência de leitura inteira, como uma
ferramenta sempre à mão. É o componente com maior peso estratégico do
produto: não é navegação, é o método de raciocínio do próprio Guia,
disponível no momento exato da dúvida, sem o médico precisar lembrar dele
de memória.

### Anatomia

**Botão (FAB)**
- Círculo de 56×56, fixo em `position: fixed`, `bottom` e `right` calculados
  a partir da *safe area* do iPhone (`env(safe-area-inset-bottom)`), somados
  à altura da tab bar (74px) + 16px de respiro — o FAB nunca sobrepõe nem
  encosta na navegação inferior.
- Fundo `--lav-500`, ícone outline branco (nunca emoji — ver §8 do design
  system), `shadow-3` para parecer "pousado" acima do conteúdo.
- Ícone: cérebro em linha (estilo Lucide/SF Symbols, `stroke-width` 2,
  pontas arredondadas) — não usar o emoji 🧠, que destoaria do restante da
  iconografia de interface do produto.
- Estado de toque: `scale(.94)` + sombra reduzida para `shadow-2`.
- Visível durante a leitura de qualquer Tema. Não aparece sobre telas de
  lista (Índice, Busca, Perfil) — lá a ferramenta de raciocínio não é o
  problema que o usuário está resolvendo naquele momento.

**Bottom Sheet**
- Altura de 50–60% da tela, cantos superiores em `--radius-xl` (28px),
  fundo `--bg-base`, `shadow-3` intensificado, backdrop escurecido
  (`rgba(28,27,31,.32)`) atrás.
- *Grabber* (pequena barra horizontal, 36×4, `--ink-100`) centralizado no
  topo — sinaliza arrastável mesmo sem instrução textual.
- Título: **"Qual é o próximo passo?"** (Título 22/28·700). Esta é a
  pergunta-âncora do produto inteiro, não um rótulo de tela — por isso o
  título do sheet é sempre este, nunca contextualizado por Tema.
- Subtítulo: "Siga o fluxo abaixo antes de decidir qualquer conduta." (Body,
  `--ink-500`).
- **Fluxograma de raciocínio** (não é lista/checklist nem árvore de decisão
  com ramos — decisão de UX revisada duas vezes: primeiro trocamos o
  checklist plano por um fluxograma com ramificação SIM/NÃO, depois
  simplificamos para uma sequência linear só de leitura, porque quadrados
  de marcação e botões de ramo comunicavam "lista de tarefas a cumprir", e
  o objetivo aqui é comunicar raciocínio clínico, não um checklist disfarçado):
  ```
  📄 Recebi um laudo
        ↓
  📅 O exame foi realizado no momento certo?
        ↓
  ⚠️ Isso muda minha conduta?
        ↓
  💬 Como vou explicar isso para a paciente?
        ↓
  🤝 Preciso compartilhar o cuidado?
        ↓
  ✅ Voltar ao "Próximo passo" desta página
  ```
  - A pergunta sobre o **momento do exame** vem logo após o laudo,
    propositalmente antes de qualquer pergunta que já pressuponha
    interpretar o achado — não faz sentido decidir se algo "muda a
    conduta" antes de validar se o exame em si foi feito na hora certa.
  - Cada nó é apenas texto com um emoji de identidade (sem cor de fundo
    diferenciada, sem borda de ênfase) — nenhum nó é mais ou menos
    "importante" visualmente que outro, todos têm o mesmo peso porque
    fazem parte da mesma linha de raciocínio.
  - **Nenhum nó é marcável.** Não há caixa de seleção, não há estado de
    "concluído" — o médico lê a sequência, não a preenche.
  - **Nó final** (`✅ Voltar ao "Próximo passo" desta página`) é o único
    elemento acionável do fluxo: um botão cheio (`--lav-500`), não um
    texto. Ao tocar, fecha o sheet e rola a página do Tema até o bloco
    ✅ Qual é o próximo passo? (com um pulso breve de destaque no bloco) —
    o fluxo não responde a pergunta por dentro do sheet, ele devolve o
    médico para a resposta que já existe no conteúdo do Tema. Reutiliza o
    mesmo emoji ✅ do bloco de destino, de propósito, para o olho associar
    o CTA ao lugar para onde ele leva antes mesmo de ler o texto.
- Rodapé: botão discreto (texto, sem preenchimento) **"Fechar e voltar ao
  tema"** — deliberadamente não é um botão de ação primária (sem `--lav-500`
  de fundo): fechar o sheet é sempre a saída natural, nunca uma decisão que
  precise de destaque.

### Interação (deve parecer nativa do iPhone)

- Abrir: sheet sobe de baixo com spring leve (`--ease-standard`,
  ~`--dur-slow`), backdrop cresce em opacidade junto.
- Fechar por: (a) toque no backdrop, (b) toque em "Fechar e voltar ao
  tema", (c) arrastar o sheet para baixo a partir do grabber ou do próprio
  conteúdo — abaixo de um limiar de distância/velocidade o sheet volta à
  posição original (rubber-band), acima do limiar ele fecha seguindo o
  gesto.
- Nunca bloqueia com um modal de tela cheia — o Tema por trás continua
  parcialmente visível (dimmed), reforçando que o usuário está "saindo por
  um instante para pensar", não trocando de contexto.

### Por que este componente é diferente de todos os outros

Todo o resto da biblioteca existe para apresentar conteúdo de um Tema
específico. O `RaciocinioFAB` existe para o momento em que o conteúdo do
Tema **não é suficiente sozinho** — quando o médico precisa reorganizar o
próprio raciocínio antes de agir. Por isso ele é global e não fica dentro
do template de página: a dúvida não respeita a estrutura de um Tema.

## Anatomia base — `InfoBlock`

```
┌───────────────────────────────────────┐
│ [ícone 32×32]  RÓTULO EM CAPS          │  ← header: icon chip + eyebrow
│                                         │
│  Corpo do conteúdo em texto corrido     │  ← body: 16/24, ink-900
│  ou lista, conforme o tipo.             │
│                                         │
│  [ação opcional: link / botão / lista] │  ← footer opcional
└───────────────────────────────────────┘
```

- Container: `radius-lg` (20px), `shadow-2`, fundo = tint do tipo (ou branco),
  borda hairline `1px solid ink-100/50%`, padding 20–24.
- Icon chip: 32×32, `radius-sm`, fundo = acento em 15% opacidade, emoji 18px
  centralizado.
- Eyebrow: Caption (12px, 600, uppercase, tracking), cor = acento 700.
- Espaço header→body: 12px. Entre blocos consecutivos na página: 16px.

Estado de toque (quando o card é acionável, ex. abrir referência): `scale .97`
+ `shadow-1` no `:active`.

---

## Os 10 blocos fixos da sequência

**Exceção:** 3 desses blocos — ❤️ O que a paciente pensa, 💬 Como explicar e
🤝 Fortalece confiança — pressupõem um Tema no formato "achado no exame,
reação da paciente". Temas de formato diferente (ex. conceitual/comparativo,
como "por que escolher o morfológico do 1º trimestre em vez da TN simples")
podem omitir esses 3 blocos quando não fazem sentido nesse tema, seguindo a
mesma regra já usada para blocos contextuais: **omitir o bloco inteiro em
vez de forçar conteúdo genérico**. Quando omitidos, o trilho de âncoras
(`TrilhoDeAncoras`) também não mostra o chip correspondente. 🎯 Essencial,
⚠️ Erro comum e ✅ Qual é o próximo passo? continuam obrigatórios em
qualquer Tema.

### 1. 🎯 O Essencial
- **Papel:** resposta em 1 parágrafo curto (2–4 linhas) — o único bloco que
  deve ser visível sem scroll ao abrir o Tema.
- **Acento:** lavanda (`--lav-100` bg, `--lav-500` ícone, `--lav-700` texto do rótulo).
- **Variante visual:** levemente maior que os demais (padding +4, borda
  `1px solid --lav-300` em vez de hairline neutro) — sinaliza "comece aqui".
- **Regra de conteúdo (estrutural, não editorial):** máximo ~280 caracteres.

### 2. ⚠️ Erro comum
- **Papel:** o engano mais frequente relacionado ao tema.
- **Acento:** âmbar (`--warning`).
- **Variante:** ícone chip com leve contorno tracejado — comunica "cuidado"
  sem depender só da cor.

### 3. ❤️ O que a paciente provavelmente está pensando
- **Papel:** antecipar a preocupação não verbalizada.
- **Acento:** rosa empatia (`--empathy`).
- **Variante:** balão com "cauda" sutil (pseudo-elemento triangular) apontando
  para cima, reforçando "isto está na cabeça dela".

### 4. 💬 Como explicar para a paciente
- **Papel:** frase pronta, em linguagem simples, para usar na consulta.
- **Acento:** neutro com borda esquerda lavanda de 3px (estilo "citação").
- **Variante:** tipografia levemente diferenciada — itálico no corpo, como
  fala direta, distinguindo de texto técnico dos outros blocos.

### 5. ✅ Qual é o próximo passo?
- **Papel:** ação concreta imediata.
- **Acento:** sage (`--success`).
- **Variante:** corpo pode renderizar como checklist numerada (1, 2, 3) em vez
  de parágrafo — único bloco com essa flexibilidade estrutural.
- **Ordem:** vem depois de "O que a paciente pensa" e "Como explicar" —
  primeiro acolhe a preocupação e dá a frase pronta, só depois entrega a
  ação clínica.

### 6. 🤝 O que fortalece a confiança da paciente
- **Papel:** atitude/gesto que aumenta confiança no profissional.
- **Acento:** dourado — um dos poucos usos de `--gold` fora de Aula Express,
  porque este bloco é sobre "valor percebido", coerente com a cor de prestígio.

### 7. 💜 Com o tempo, aprendi que…
- **Papel:** voz de experiência/mentoria, tom pessoal — a resposta real da
  autora (Dra. Morgana Kummer), não conteúdo genérico. É o único bloco do
  sistema que carrega assinatura, propositalmente: é onde o "eu" da autora
  aparece no app.
- **Acento:** lavanda profunda (`--lav-700` texto sobre `--lav-100`).
- **Variante:** único bloco com aspas decorativas grandes (glifo `"`) no canto
  superior esquerdo, em `--lav-300`, e corpo em itálico — diferenciação
  editorial proposital para sinalizar "isto é experiência, não protocolo".
  O corpo também é envolvido em aspas retas (`"..."`), e abaixo dele uma
  linha de assinatura — `— Dra. Morgana Kummer`, itálico, 12px (Footnote),
  `--lav-700` a 75% de opacidade, alinhada à direita — atribui a fala
  diretamente a ela.

### 8. 🎥 Aula Express
- **Papel:** vídeo curto complementar.
- **Acento:** único card **escuro** do sistema (`--ink-900` bg, texto branco)
  — funciona como "janela de mídia", contraste deliberado com o resto da
  página clara.
- **Anatomia própria:** thumbnail com botão de play central, badge de duração
  (ex. "3 min") no canto, botão "Assistir" em pílula dourada.
- **Estado bloqueado (fora de escopo de auth nesta etapa, mas previsto):** se
  sessão de vídeo não puder ser validada, o card mostra estado "indisponível
  offline" em vez de tela de erro — nunca quebra o layout da página.

### 9. 📚 Referências
- **Papel:** embasamento, citações.
- **Acento:** neutro (`--bg-subtle`), sem sombra (`shadow-1` apenas) —
  deliberadamente o bloco de menor peso visual da página.
- **Variante:** **colapsado por padrão**, expande com toque ("Ver referências
  (3)"). Isso é decisão de UX, não só visual: referência não compete com a
  resposta rápida pela atenção do usuário.

### 10. ➜ Veja também
- **Papel:** navegação para Temas relacionados, ao final da página.
- **Acento:** neutro, lista de linhas com seta, sem fundo colorido.
- **Variante inline:** a mesma seta `➜` pode aparecer como link curto dentro do
  corpo de outro bloco (ex. dentro do Essencial: "➜ Veja também: Placenta
  prévia") — mesmo estilo de texto, sem virar um card completo.

---

## Blocos contextuais (posição livre, aparecem só quando há conteúdo)

### 💡 Você sabia?
- **Papel:** curiosidade/complemento opcional, tom leve.
- **Formato:** chip compacto (não card completo) — outline lavanda, sem
  preenchimento, para não competir visualmente com os blocos fixos.
- **Posição:** inserido dentro do fluxo onde fizer sentido (após Essencial ou
  Próximo passo), nunca em posição fixa própria.

### 🚩 Quando encaminhar
- **Papel:** critério objetivo de encaminhamento/alerta.
- **Formato:** card com acento de urgência (`--danger`), borda mais espessa
  (2px) — é o único bloco com peso de borda diferente, reservado para
  informação que não pode ser perdida.
- **Posição:** logo após ✅ Próximo passo quando presente, para ficar próximo
  da decisão de conduta.

### 🧭 E agora?
- **Papel:** resumo de decisão em formato "cenário → conduta" (ex.: "DUM
  confiável + USG precoce compatível → mantenha a IG."), para a dúvida
  específica que motiva o médico a abrir o Tema no meio da consulta. Não
  substitui ✅ Qual é o próximo passo? (ação concreta do caso típico) — é o
  desempate para os casos-limite/variações que o Essencial não cobre.
- **Formato:** card com borda dupla lavanda (`--lav-500`, 2px), ícone chip
  preenchido a lavanda — peso visual comparável a 🚩 Quando encaminhar, mas
  sem a conotação de urgência. Corpo em lista (não numerada, já que os itens
  são condições alternativas, não passos sequenciais).
- **Posição:** último bloco de conteúdo da página, depois de 📚 Referências e
  antes de ➜ Veja também — deliberadamente o resumo com que o médico sai da
  leitura.
- **Status:** proposto pela autora para se tornar padrão em **todos** os
  Temas do guia (não só nos que têm formato "achado → decisão"). Implementado
  como bloco contextual (aparece só quando o Tema tem conteúdo para ele)
  porque ainda não foi retroaplicado aos Temas existentes — pendente de a
  autora escrever o "E agora?" de cada um.

---

## Componentes de navegação e estrutura

### `TrilhoDeAncoras` — componente de navegação adotado (ex-"Layout C")
Trilho horizontal de chips, roláveis, fixo (`sticky`) logo abaixo do
cabeçalho. É **um único componente reaproveitado em três contextos**, com o
mesmo visual e a mesma mecânica de toque — isso é o que faz o padrão ser
reconhecível em qualquer tela do app:

| Contexto | O que os chips representam | Comportamento |
|---|---|---|
| `GuiaArticleTemplate` (Tema) | Cada bloco pulável da página (Essencial, Erro comum, Próximo passo…) | Toque rola até o bloco; o chip do bloco visível no topo fica destacado (`scroll-spy`) |
| `IndiceModulo` (Índice) | Cada Módulo | Toque rola até a seção do Módulo na lista |
| `BuscaRapida` (Busca) | Buscas recentes / sugeridas | Toque preenche o campo de busca com aquele termo |

Regra visual única: chip inativo em `--bg-sunken` com texto `--ink-500`; chip
ativo/atual em `--lav-500` com texto branco. Nunca mais de ~7 chips visíveis
por vez — acima disso, prefira agrupar em vez de listar tudo.

### `GuiaArticleTemplate`
Componente "esqueleto" que recebe os dados de um Tema e monta a sequência
fixa de blocos automaticamente (ver `01-arquitetura-informacao.md §4`),
incluindo o `TrilhoDeAncoras` logo após o cabeçalho. Responsável por:
cabeçalho com progresso de leitura, inserir blocos contextuais na posição
certa, e renderizar rodapé de navegação.

### `IndiceModulo`
Lista de Módulos expansíveis → Temas, com o `TrilhoDeAncoras` no topo
filtrando/pulando para o Módulo desejado. Cada linha de Tema mostra: título
(pergunta), ícone de favorito (preenchido a dourado quando favoritado), seta
de navegação. Busca acessível pelo ícone no cabeçalho, não como aba própria.

### `BuscaRapida` (overlay)
Full-screen, ativado por ícone no cabeçalho. Input grande no topo, resultados
agrupados por Módulo (tag lavanda com o nome do Módulo acima de cada
resultado, termo buscado destacado em negrito), aparecem a partir de 2
caracteres digitados. Estado vazio mostra o `TrilhoDeAncoras` com buscas
recentes como chips. Pensado para responder à meta de 10 segundos mesmo
quando o usuário não sabe em qual Módulo o Tema está.

### `NavegacaoSequencial`
Rodapé fixo ao fim do Tema: "◀ Tema anterior" / "Voltar ao índice" / "Próximo
tema ▶". Permite "ler o módulo inteiro" sem voltar ao índice a cada Tema.

### `TabBarInferior`
4 destinos fixos: Início, Índice, Favoritos, Perfil. Ícones outline, rótulo
abaixo, item ativo em `--lav-500`.

### `LicencaDispositivo` (estado visual apenas, sem lógica nesta etapa)
Card de perfil mostrando plano da licença e lista de dispositivos conectados
com ação "desconectar". Reservado para quando a integração de autenticação/
venda (Kiwify ou similar) for implementada.
