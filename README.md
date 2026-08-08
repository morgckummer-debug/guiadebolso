# Guia de Bolso — Guia Digital do Obstetra

PWA mobile-first (iPhone) para obstetras no início de carreira: um guia
digital interativo, não um PDF/e-book/curso. O objetivo é ajudar na tomada
de decisão rápida durante a consulta — qualquer resposta em menos de 10
segundos.

## v1.2 — versão atual estável

Versionamento: cada versão validada pela autora, Dra. Morgana Kummer, vira
uma branch congelada (`v1.0`, `v1.1`, `v1.2`, ...) que nunca mais é
alterada — todo desenvolvimento novo acontece na branch `develop` até a
próxima validação. `v1.0` foi o Sprint Zero (plataforma validada com
conteúdo real: leitura, busca, índice, links internos, Aula Express,
navegação entre temas). `v1.1` adicionou um 4º tema. `v1.2` expande para
21 temas — incluindo um novo módulo (Doppler fetal) — e três blocos de
conteúdo novos: 🔑 Pérola clínica, 📖 Contexto histórico e 🧭 E agora?.
Sem autenticação implementada ainda.

**Importante:** validado é a experiência da plataforma (UX, navegação,
arquitetura, design system) e o conteúdo dos temas escrito pela própria
autora — mas o pacote ainda não passou por revisão clínica formal completa
(ex. referências bibliográficas de alguns temas seguem em rascunho,
pendentes de indicação específica dela) antes de qualquer uso real em
consulta.

**21 temas completos e navegáveis de verdade** (não é mock estático):
1. Ultrassom obstétrico inicial — módulo Exames da gestação
   (capítulo 1 do livro, página 1/7 — abre a leitura antes dos achados clínicos)
2. Ultrassom de translucência nucal — módulo Exames da gestação (capítulo 1, página 2/7)
3. Morfológico do 1º trimestre: o que ele acrescenta — módulo Exames da gestação
   (capítulo 1, página 3/7 — absorveu o tema avulso "Morfológico do 1º
   trimestre" do módulo 1º trimestre, considerado redundante depois que
   este capítulo ficou mais completo; nada do conteúdo antigo foi
   perdido, só migrado pra cá)
4. Morfológico do 2º trimestre — módulo Exames da gestação (capítulo 1, página 4/7)
5. Ecocardiografia fetal — módulo Exames da gestação (capítulo 1, página 5/7)
6. Morfológico do 3º trimestre — módulo Exames da gestação (capítulo 1, página 6/7)
7. Doppler obstétrico: quando pedir — módulo Exames da gestação (capítulo 1, página 7/7)
8. Ausência de embrião — módulo 1º trimestre
9. Percentil de peso baixo — módulo Crescimento fetal
10. Placenta baixa — módulo Placenta e anexos
11. Artéria umbilical única — módulo Marcadores leves de aneuploidia
12. Dilatação das pelves renais — módulo Trato urinário fetal
13. Megabexiga fetal — módulo Trato urinário fetal
14. Colo curto — módulo Colo uterino
15. Foco ecogênico intracardíaco — módulo Marcadores leves de aneuploidia
16. Intestino hiperecogênico — módulo Marcadores leves de aneuploidia
17. Entendendo o Doppler fetal — módulo Doppler fetal
18. Grau da placenta — módulo Placenta e anexos
19. Vasa prévia — módulo Placenta e anexos
20. Datação da gestação — módulo 1º trimestre
21. Circunferência abdominal > P90 — módulo Crescimento fetal

Convenção de título: nome direto do achado, sem frase/pergunta em volta
(ex. "Placenta baixa", não "A placenta veio baixa. O que muda agora?").

O conteúdo clínico desses temas mistura rascunho baseado em diretrizes
públicas (ISUOG, ACOG) com falas e decisões clínicas escritas diretamente
pela autora nos blocos pessoais (💜 Aprendi que…, 🤝 Fortalece confiança,
entre outros) — pendente de revisão e validação médica completa antes de
qualquer uso real em consulta. Ver `prototype/index.html` (aba
Tema/Índice/Busca) para o protótipo funcional, e o final desta seção para
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
   system, showcase dos componentes, e as 3 telas principais do app, dentro
   de uma moldura de iPhone:
   - **Tema** — template de página adotado (trilho de âncoras que pula
     direto para qualquer bloco sem rolar a página — referência Stripe
     Docs), agora renderizado a partir de dados reais (3 temas piloto).
   - **Índice** — mesmo componente de trilho, filtrando por Módulo real;
     toque num tema navega de verdade para a tela de Tema.
   - **Busca** — campo funcional, filtra por título e tags dos 3 temas
     (com normalização de acento), chips de busca recente clicáveis.

   O trilho de âncoras (`TrilhoDeAncoras`, ver `docs/03-biblioteca-componentes.md`)
   é um único componente reaproveitado nas 3 telas — mesmo visual, mesma
   mecânica de toque, propósito diferente em cada contexto. "Veja também" e
   o rodapé de navegação sequencial também navegam de verdade entre os 3
   temas piloto.

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
  irmão no módulo, mantendo só "Voltar ao índice". Com a chegada do
  módulo "Exames da gestação" (7 temas em sequência, pensado para ser
  "folheado" como um capítulo), a implementação original só mostrava um
  botão fixo ("Tema anterior", sempre o primeiro irmão do módulo,
  independente da posição atual) — corrigi para navegação sequencial de
  verdade (anterior/próximo com base na posição real dentro do array do
  módulo, cada um omitido só na ponta correspondente da sequência).
- **💜 "Aprendi que…" tornou-se opcional**: o schema documentado em
  `docs/01` trata `aprendi_que` como bloco fixo. Ao escrever os 7 temas
  do capítulo "Exames da gestação", nem toda página tinha uma fala
  pessoal da autora de fato ditada para aquele conteúdo específico — e
  esse bloco carrega assinatura ("— Dra. Morgana Kummer"), então
  preencher com texto sintetizado seria atribuir fala que não foi dita.
  Tornei o bloco condicional (só renderiza se `aprendi` existir),
  mesmo padrão já usado para 🤝 Confiança, 💬 Explicar e ❤️ O que a
  paciente pensa — nenhum tema existente foi afetado, todos já tinham
  o campo preenchido.
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
