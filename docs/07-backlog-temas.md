# Backlog de temas — lista da autora

Lista de achados frequentes na prática, mas raramente ensinados de forma
prática, ditada pela Dra. Morgana Kummer em 2026-08-07. Guardada como
matéria-prima para os próximos Temas — nenhum destes foi escrito ainda,
exceto onde marcado abaixo. Quando um destes virar Tema, seguir o mesmo
fluxo já em uso: perguntar por card usando `docs/05-banco-perguntas-pessoais.md`
como referência de perguntas-gatilho, coletar a fala literal da autora, e
marcar como concluído aqui.

## Placenta
- [ ] Placenta grau III antes do termo
- [ ] Lago placentário
- [ ] Placenta espessa
- [ ] Placenta fina
- [ ] Placenta baixa × placenta prévia — *relacionado ao tema já existente
      "Placenta baixa"; autora comentou que já viu muito erro nessa
      distinção. Avaliar se vira um tema novo dedicado à diferenciação, ou
      se expande o tema atual.*
- [ ] Seio marginal

## Cordão
- [ ] Inserção marginal
- [ ] Inserção velamentosa
- [ ] Vasa prévia
- [ ] Cisto de cordão
- [ ] Nó verdadeiro × falso nó

## Líquido amniótico
- [ ] Debris ("grumos")
- [ ] Bandas amnióticas × sinéquias uterinas
- [ ] Membrana amniótica descolada

## Achados fetais
- [ ] Plexo coroide
- [x] Ventriculomegalia leve — *tema escrito, módulo "Marcadores menores de aneuploidias".*
- [ ] Cisterna magna aumentada
- [ ] Mega cisterna magna
- [x] Prega nucal espessada — *tema escrito, módulo "Marcadores menores de aneuploidias".*
- [ ] Húmero curto
- [x] Fêmur curto — *tema escrito, módulo "Marcadores menores de aneuploidias". O viés das
      curvas de crescimento (Hadlock/população americana) na população
      brasileira, ponto trazido pela autora, vive só no bloco "Aprendi que…"
      — os demais cards focam no raciocínio padrão (datação, proporção,
      estatura familiar).*
- [ ] Braquicefalia
- [ ] Dolicocefalia
- [ ] Cisto ovariano fetal
- [ ] Cisto de mesentério
- [ ] Cisto de plexo coroide

## Crescimento
- [x] PIG × RCF — *tema escrito como "PIG × RCF" (módulo Crescimento fetal),
      com critérios de Delphi para RCF precoce/tardia. Escrito originalmente
      numa branch antiga (`develop`, formato `prototype/index.html`) e
      portado para `webapp/data/temas.ts` em 2026-09-13, junto com mais 3
      temas que só existiam lá (ver itens abaixo e no módulo Doppler).*
- [x] Circunferência abdominal > P90 — *não estava nesta lista original;
      tema trazido do `develop` junto com "PIG × RCF" (mesma leva de
      2026-09-13). CA aumentada em gestante diabética ≠ macrossomia.*
- [x] RCF precoce × RCF tardia — *idem, tema separado de "PIG × RCF"
      (diferenciação distinta, não se sobrepõem): ponto de corte 32 semanas,
      fisiopatologia e vaso de referência diferentes entre os dois.*
- [ ] Macrossomia
- [ ] Peso fetal no P10
- [ ] Circunferência abdominal isoladamente baixa
- [ ] Velocidade de crescimento

## Doppler
- [ ] IR alto da uterina — *parcialmente coberto pelo tema "Insuficiência
      placentária no 2º trimestre" (distinção rastreio 1º tri × predição
      2º/3º tri), mas ainda não existe como achado isolado dedicado (uterina
      alterada sem RCF já instalada).*
- [ ] Incisura bilateral
- [x] ACM baixa — *tema escrito como "ACM de baixa resistência" (junto com CPR
      reduzida), módulo "Doppler fetal". Foco no erro de tratar como hipóxia
      em feto AIG, sem checar peso nem técnica do exame (pressão do
      transdutor, compressão de cordão).*
- [x] CPR reduzida — *ver "ACM baixa" acima, mesmo tema.*
- [x] Diástole zero — *coberto pelo tema "Insuficiência placentária no 2º
      trimestre" (não como tema isolado — a autora preferiu tratar a
      cascata toda num só tema, já que a conduta muda o vaso de referência
      a cada estágio). Conduta ditada pela autora: reavaliação 2-3x/semana
      ou diária, internação em hospital de referência, corticoide se ≤34
      sem, acompanhamento passa a ser pelo ducto venoso.*
- [x] Diástole reversa — *ver "Insuficiência placentária no 2º trimestre"
      acima. Conduta ditada pela autora: indicação de parto por si só,
      independente da IG — não há tempo para corticoide.*
- [x] Anemia fetal (PSV da ACM) — *não estava nesta lista original; tema
      trazido do `develop` na mesma leva de 2026-09-13 (junto com "PIG × RCF",
      "Circunferência abdominal > P90" e "RCF precoce × RCF tardia"). Foco no
      erro de confundir IP da ACM (hipóxia) com PSV da ACM (anemia) — são
      parâmetros diferentes na mesma artéria.*

## Parede abdominal
Item trazido pela autora fora desta lista original (2026-09-13). Motivou a
criação do módulo **"Malformações fetais"** — pensado para abrigar as
principais malformações estruturais por sistema (SNC, TGU, TGI, óssea…).
Por enquanto é um módulo único, sem subdivisão por sistema: os achados de
SNC que já são marcadores menores (ventriculomegalia, por ex.) continuam em
"Marcadores menores de aneuploidias". Revisar a divisão por sistema quando
houver mais temas aqui dentro (a partir de uns 3-4 por subgrupo).
- [x] Onfalocele × gastrosquise — *tema escrito, módulo "Malformações fetais".*

## Marcadores maiores de aneuploidias
Módulo planejado pela autora (2026-09-13) como contraponto ao já existente
"Marcadores menores de aneuploidias" — ainda sem temas escritos nem lista
de achados definida. Aguardando a autora trazer os achados específicos
quando for a hora de escrever esse capítulo.

## Condução do pré-natal — 2º e 3º trimestre
Decisão de arquitetura (2026-09-13, ver `docs/01-arquitetura-informacao.md`
§2.2): o antigo módulo único "1º trimestre" misturava achado (Ausência de
embrião) com rotina/protocolo (Morfológico do 1º trimestre, Datação da
gestação). Separado em duas trilhas — achados por sistema (sem trimestre) e
"Condução do pré-natal" por trimestre. O módulo `conducao-1tri` já existe em
`webapp/data/temas.ts` com os 2 temas de rotina que já existiam. `conducao-2tri`
foi criado em `temas.ts` (2026-09-13) com o primeiro tema de rotina. Falta
`conducao-3tri` — não criado ainda (módulo vazio no índice fica estranho);
criar quando houver pelo menos 2-3 temas de rotina prontos. Ideias de temas de
rotina para 3º trimestre, a validar com a autora:
- [x] 2º trimestre: o que o morfológico do 2º trimestre responde (22–24
      semanas, aceito até 26 sem) — tema escrito como "Morfológico do 2º
      trimestre", módulo `conducao-2tri`. Conteúdo ditado pela autora:
      correção da janela (22–24, não 20–24), distinção entre rastreio de
      pré-eclâmpsia (1º tri, indica AAS) × Doppler de uterinas no 2º tri
      (prediz pré-eclâmpsia tardia, não indica AAS), e pérola sobre medida
      do colo uterino ter que constar explicitamente no pedido médico, em
      toda gestante — inclusive primigestas sem histórico de parto prematuro.
- [x] 2º trimestre: quando pedir TOTG e por quê — tema escrito como "Quando
      pedir TOTG e por quê", módulo `conducao-2tri`. Conteúdo ditado pela
      autora a partir de um texto-base (diretriz de diabetes gestacional):
      rastreio universal por glicemia de jejum na 1ª consulta, critérios
      diagnósticos do TOTG 75g, exceção do bypass gástrico em Y de Roux
      (TOTG contraindicado na prática — perfil glicêmico domiciliar em vez
      disso), e marcadores ecográficos específicos do DMG mal controlado
      (tecido subcutâneo fetal >5mm, septo interventricular >4,5mm).
      `conducao-2tri` agora tem 2 temas de rotina.
- [ ] 3º trimestre: USG de crescimento seriado — quando começar e com que
      intervalo
- [ ] 3º trimestre: o que a curva de crescimento acrescenta ao pré-natal
      de baixo risco
