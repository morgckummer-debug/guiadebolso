# Guia de Bolso — Guia Digital do Obstetra

PWA mobile-first (iPhone) para obstetras no início de carreira: um guia
digital interativo, não um PDF/e-book/curso. O objetivo é ajudar na tomada
de decisão rápida durante a consulta — qualquer resposta em menos de 10
segundos.

## Etapa 2 (atual): Sprint Zero — validação com conteúdo real

Arquitetura, Design System e componentes (Etapa 1) considerados maduros o
suficiente para testar a plataforma inteira com conteúdo real, mas **a
arquitetura ainda não está congelada** — este Sprint Zero existe para
validar a experiência (leitura, busca, índice, links internos, Aula
Express, navegação entre temas) antes da v1.0. Sem autenticação
implementada ainda.

**3 temas piloto completos e navegáveis de verdade** (não é mock estático):
1. Não apareceu embrião. E agora? — módulo 1º trimestre
2. O peso fetal veio no percentil 8. E agora? — módulo Crescimento fetal
3. A placenta veio baixa. O que muda agora? — módulo Placenta e anexos

O conteúdo clínico desses 3 temas é **rascunho**, escrito com base em
diretrizes públicas (ISUOG, ACOG) para exercitar a plataforma — pendente de
revisão e validação médica da autora antes de qualquer uso real em
consulta. Ver `prototype/index.html` (aba Tema/Índice/Busca) para o
protótipo funcional, e o final desta seção para as sugestões de
arquitetura identificadas durante a implementação.

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
