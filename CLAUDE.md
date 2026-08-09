# Instruções para sessões do Claude Code neste repositório

## Branch de trabalho — regra fixa

**Sempre trabalhe direto na branch `develop`. Nunca crie uma branch nova
para a sessão, nunca parta de `main`.**

- Se a sessão foi iniciada numa branch com nome gerado automaticamente
  (ex. `claude/<algo-aleatorio>`), faça checkout de `develop`
  (`git checkout develop && git pull origin develop`) antes de começar a
  editar, e dê push direto para `develop` ao final — não abra PR de uma
  branch efêmera para outra.
- `main` **não** é a branch ativa — ela só espelha a última versão
  congelada (hoje `v1.2`) e pode estar desatualizada. Nunca basear
  trabalho novo nela.
- `v1.0`, `v1.1`, `v1.2`, ... são branches congeladas, validadas pela
  autora (Dra. Morgana Kummer) — **nunca alterá-las**. Uma nova versão
  congelada só nasce quando a autora validar o estado atual de `develop`.
- Motivo desta regra: sessões anteriores criaram branches novas por
  padrão (uma por tarefa) e algumas partiram de `main` desatualizada,
  gerando múltiplas branches paralelas com trabalho duplicado ou
  conflitante, nunca mescladas. Ver histórico de commits em `develop`
  para o processo de limpeza feito em 2026-08-09.

## Contexto do projeto

Ver `README.md` para a visão geral (o que é o produto, estrutura de
conteúdo Tema/Módulo, os documentos em `docs/`, e o protótipo em
`prototype/index.html`). Pontos que vale destacar aqui porque afetam
como editar:

- **Conteúdo clínico é rascunho**, pendente de revisão médica formal —
  não tratar como pronto para uso real em consulta.
- Todo Tema novo segue o fluxo em `docs/05-banco-perguntas-pessoais.md`:
  coletar uma resposta pessoal literal da autora para o bloco 💜 "Com o
  tempo, aprendi que…" antes de fechar o conteúdo — nunca inventar essa
  fala.
- `docs/07-backlog-temas.md` é a lista de achados ainda não escritos como
  Tema — ao escrever um novo, marcar o item correspondente como
  concluído lá.
- O protótipo (`prototype/index.html`) é HTML/CSS/JS puro, sem build.
  Ao editar `TEMAS`/`MODULOS`, validar sintaxe (`node --check`) e
  integridade dos dados (ids únicos, `vejaTambem`/`modulo` apontando
  para ids existentes) antes de commitar — não há testes automatizados.
