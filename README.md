# Guia de Bolso — Guia Digital do Obstetra

PWA mobile-first (iPhone) para obstetras no início de carreira: um guia
digital interativo, não um PDF/e-book/curso. O objetivo é ajudar na tomada
de decisão rápida durante a consulta — qualquer resposta em menos de 10
segundos.

## v1.2 — versão atual estável

Versionamento: cada versão validada pela autora, Dra. Morgana Kummer, vira
uma branch congelada (`v1.0`, `v1.1`, `v1.2`, ...) que nunca mais é
alterada — todo desenvolvimento novo acontece na branch `develop` até a
próxima validação. **`main` espelha a última versão congelada (hoje,
`v1.2`) — qualquer branch de trabalho nova (sessão, feature, PR) deve
nascer a partir de `develop`, nunca de `main`, para não perder edições já
feitas lá.** `v1.0` foi o Sprint Zero (plataforma validada com
conteúdo real: leitura, busca, índice, links internos, Aula Express,
navegação entre temas). `v1.1` adicionou um 4º tema. `v1.2` expande para
18 temas — incluindo um novo módulo (Doppler fetal) — e três blocos de
conteúdo novos: 🔑 Pérola clínica, 📖 Contexto histórico e 🧭 E agora?.
Sem autenticação implementada ainda.

**Importante:** validado é a experiência da plataforma (UX, navegação,
arquitetura, design system) e o conteúdo dos temas escrito pela própria
autora — mas o pacote ainda não passou por revisão clínica formal completa
(ex. referências bibliográficas de alguns temas seguem em rascunho,
pendentes de indicação específica dela) antes de qualquer uso real em
consulta.

**18 temas completos e navegáveis de verdade** (não é mock estático):
1. Ausência de embrião — módulo 1º trimestre
2. Feto PIG — módulo Crescimento fetal
3. Placenta baixa — módulo Placenta e anexos
4. Artéria umbilical única — módulo Marcadores leves de aneuploidia
5. Dilatação das pelves renais — módulo Trato urinário fetal
6. Megabexiga fetal — módulo Trato urinário fetal
7. Colo curto — módulo Colo uterino
8. Foco ecogênico intracardíaco — módulo Marcadores leves de aneuploidia
9. Intestino hiperecogênico — módulo Marcadores leves de aneuploidia
10. Morfológico do 1º trimestre — módulo 1º trimestre
11. Entendendo o Doppler fetal — módulo Doppler fetal
12. Grau da placenta — módulo Placenta e anexos
13. Vasa prévia — módulo Placenta e anexos
14. Datação da gestação — módulo 1º trimestre
15. Circunferência abdominal > P90 — módulo Crescimento fetal
16. PIG × RCF — módulo Crescimento fetal
17. Anemia fetal — módulo Doppler fetal
18. RCF precoce × RCF tardia — módulo Crescimento fetal

Convenção de título: nome direto do achado, sem frase/pergunta em volta
(ex. "Placenta baixa", não "A placenta veio baixa. O que muda agora?").

O conteúdo clínico desses temas mistura rascunho baseado em diretrizes
públicas (ISUOG, ACOG) com falas e decisões clínicas escritas diretamente
pela autora nos blocos pessoais (💜 Aprendi que…, 🤝 Fortalece confiança,
entre outros) — pendente de revisão e validação médica completa antes de
qualquer uso real em consulta. Ver `prototype/index.html` (aba
Tema/Índice) para o protótipo funcional, e o final desta seção para
as sugestões de arquitetura identificadas durante a implementação.

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

5. **Banco de perguntas pessoais** → [`docs/05-banco-perguntas-pessoais.md`](docs/05-banco-perguntas-pessoais.md)
   Perguntas-gatilho usadas para coletar, tema a tema, a fala real da autora
   para o bloco 💜 "Com o tempo, aprendi que…" — o único bloco do sistema
   com assinatura, onde a experiência pessoal dela entra no app.

6. **Pensamentos guardados** → [`docs/06-pensamentos-guardados.md`](docs/06-pensamentos-guardados.md)
   Inbox de ideias soltas da autora — sempre que ela escrever `Pensamento:
   …` em conversa, o texto é salvo aqui e promovido para o Tema certo
   quando ele for criado.

7. **Backlog de temas** → [`docs/07-backlog-temas.md`](docs/07-backlog-temas.md)
   Lista de achados frequentes na prática, ainda não escritos como Tema,
   organizados por categoria (Placenta, Cordão, Líquido amniótico, Achados
   fetais, Crescimento, Doppler) — matéria-prima para os próximos temas.

8. **Marketing e personas (pós-lançamento)** → [`docs/08-marketing-personas.md`](docs/08-marketing-personas.md)
   Anotações de planejamento para depois da conclusão deste projeto: canal de
   venda (Kiwify) e as 3 personas identificadas até agora — obstetra
   recém-formado(a) abrindo consultório (autora como preceptora
   pós-residência), obstetra com alguns anos de consultório buscando
   atualização, e clínico geral que faz ultrassom na rede pública.

9. **Protótipo interativo (estático, sem build)** → [`prototype/index.html`](prototype/index.html)
   Abra o arquivo direto no navegador. Contém: showcase dos tokens do design
   system, showcase dos componentes, e as 2 telas principais do app, dentro
   de uma moldura de iPhone:
   - **Tema** — template de página adotado (trilho de âncoras que pula
     direto para qualquer bloco sem rolar a página — referência Stripe
     Docs), renderizado a partir de dados reais (18 temas).
   - **Índice** — mesmo componente de trilho, filtrando por Módulo real;
     toque num tema navega de verdade para a tela de Tema.

   Busca não é mais uma tela própria — desde a revisão de 2026-08-08/09
   (`docs/03-biblioteca-componentes.md`), o `RaciocinioFAB` (botão flutuante,
   presente em Tema e Índice) é o único ponto de busca do app, com pulso
   único "tá com dúvida?" por tela e busca embutida no sheet (filtra por
   título e tags, com normalização de acento, chips de busca recente,
   fallback "Ainda não escrevemos sobre isso").

   O trilho de âncoras (`TrilhoDeAncoras`, ver `docs/03-biblioteca-componentes.md`)
   é um único componente reaproveitado — mesmo visual, mesma mecânica de
   toque, propósito diferente em cada contexto (Tema, Índice, sheet do FAB).
   "Veja também" e o rodapé de navegação sequencial também navegam de
   verdade entre os temas.

## Sugestões de arquitetura identificadas no Sprint Zero (não aplicadas automaticamente)

Ver conversa/histórico de commits para o detalhamento completo (problema →
por que acontece → sugestão → impacto). Resumo dos pontos levantados ao
popular os 3 temas piloto:

- **Veja também com 0 itens**: com poucos temas, alguns não têm um "veja
  também" genuinamente relevante (ex. o tema de 1º trimestre não tem par
  natural entre os 3 pilotos). Implementei omitir o bloco inteiro quando a
  lista está vazia, em vez de mostrar um card sem conteúdo — consistente
  com a regra já usada para blocos contextuais, mas é uma decisão nova, não
  documentada antes.
- **Anterior/Próximo com módulo de 1 tema**: a navegação sequencial documentada
  é "dentro do módulo" — com 1 tema por módulo (situação real agora, e
  provável em vários módulos no início do conteúdo), não há vizinho.
  Implementei omitir os botões de anterior/próximo quando não há tema
  irmão no módulo, mantendo só "Voltar ao índice".
- **🚩 Quando encaminhar sem chip no trilho de âncoras**: mantive fora do
  trilho de 7 chips (regra de "nunca mais que ~7") — ele aparece
  imediatamente após "Próximo passo", que já tem chip próprio.

## Próximos passos sugeridos (fora do escopo desta entrega)

- Escolher stack de implementação real (o protótipo é HTML/CSS/JS puro,
  propositalmente framework-agnóstico nesta fase de validação visual).
- Revisão clínica formal dos 3 temas piloto antes de qualquer uso real.
- Popular o restante do modelo de conteúdo com mais Temas.
- Especificar a integração de checkout/licenciamento (ex. Kiwify) via webhook
  — sem implementar autenticação nesta fase.
