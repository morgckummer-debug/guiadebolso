// Dados clínicos dos 14 temas — portado de prototype/index.html.
// Conteúdo clínico é rascunho, pendente de revisão médica formal da autora.
// Este módulo só é importado por código server-side (API routes) — nunca enviado ao bundle do cliente.

const MODULOS = [
  {id:'trimestre1', nome:'1º trimestre', icon:'🌱'},
  {id:'crescimento', nome:'Crescimento fetal', icon:'📏'},
  {id:'placenta', nome:'Placenta e anexos', icon:'🔵'},
  {id:'urinario', nome:'Trato urinário fetal', icon:'💧'},
  {id:'colo', nome:'Colo uterino', icon:'🔒'},
  {id:'marcadores', nome:'Marcadores leves de aneuploidia', icon:'✨'},
  {id:'doppler', nome:'Doppler fetal', icon:'📡'},
  {id:'malformacoes', nome:'Malformações fetais', icon:'🩻'},
];

const TEMAS = [
  {
    id:'sem-embriao',
    titulo:'Ausência de embrião',
    modulo:'trimestre1',
    tags:['gestação inicial','saco gestacional','embrião','prognóstico indeterminado','usg transvaginal','gestação anembrionada','viabilidade incerta'],
    essencial:'Não ver embrião não fecha diagnóstico sozinho. Perda confirmada quando:<ul><li>SG >25mm sem embrião</li><li>SG >20mm sem vesícula vitelínica</li><li>Embrião >7mm sem BCF</li></ul>Fora isso, é "gravidez de prognóstico indeterminado" — repita o USG antes de definir conduta.',
    erro:'Fechar diagnóstico de perda gestacional precoce (ou gestação anembrionada) numa única ultrassonografia, sem checar se algum critério objetivo foi atingido — risco de indicar conduta numa gravidez de prognóstico ainda indeterminado.',
    passo:{tipo:'checklist', itens:[
      'Verifique se bate algum critério de diagnóstico definitivo (lista completa abaixo) — se sim, pode fechar o diagnóstico nesta consulta.',
      'Se não bater nenhum, é gravidez de prognóstico indeterminado — reavalie no prazo certo (lista completa abaixo), sem fechar diagnóstico ainda.',
      'Sempre cruze com a idade gestacional mais confiável disponível (DUM segura ou USG datador prévio) antes de definir qualquer conduta.',
    ]},
    criterios:[
      {titulo:'Diagnóstico definitivo (perda confirmada)', itens:[
        ['SG sem embrião','>25mm'],
        ['SG sem vesícula vitelínica','>20mm'],
        ['Embrião sem BCF','>7mm'],
      ]},
      {titulo:'Prognóstico indeterminado (reavaliar)', itens:[
        ['Embrião sem BCF','5–7mm'],
        ['SG sem embrião','16–24mm'],
        ['Âmnio vazio','presente'],
        ['Vesícula vitelínica','>7mm'],
      ]},
      {titulo:'Prazo até nova reavaliação', itens:[
        ['SG sem VV, ainda indeterminado','7–13 dias'],
        ['SG sem VV, fecha anembrionada','14 dias'],
        ['SG com VV, ainda indeterminado','7–10 dias'],
        ['SG com VV, fecha anembrionada','11 dias'],
      ]},
    ],
    explicar:'"Ainda é cedo para ter certeza. Vou pedir para repetirmos esse exame em alguns dias — isso não significa que algo está errado, é o tempo mínimo necessário para o embrião ficar visível com segurança."',
    pensando:'Será que eu já perdi a gestação e ninguém está me dizendo? — a espera pelo reexame gera muita ansiedade, mesmo quando é a conduta correta.',
    confianca:'Explicar o motivo técnico da espera (por que não dá para saber ainda), em vez de só dizer "vamos repetir o exame", transforma incerteza em prazo claro e critério objetivo — isso reduz a ansiedade percebida.',
    aprendi:'Não ver o embrião no primeiro ultrassom quando a cronologia é superior a 7 semanas só traz preocupação quando o saco gestacional está irregular, em casos de sangramento com ou sem hematomas, ou se o conteúdo está heterogêneo (coágulos). Se a vesícula vitelínica está normal, provavelmente a gestação seguirá tranquila.',
    vocesabia:[
      '"Viabilidade incerta" foi renomeada para "gravidez de prognóstico indeterminado". Não confundir com "gestação anembrionada" — essa é diagnóstico definitivo (saco que nunca teve embrião), diferente da perda de um embrião que já existia.',
      '"Aborto" e "abortamento" saíram dos laudos — o termo atual é "perda gestacional precoce", com 4 subtipos: determinada (morte confirmada — o cenário deste tema), em curso, incompleta e completa.',
    ],
    encaminhar:'Encaminhar para avaliação de urgência, sem aguardar reavaliação eletiva, quando houver:<ul><li>Sangramento importante associado</li><li>Dor pélvica intensa</li><li>Suspeita de gestação ectópica (saco não visualizado na cavidade com beta-hCG acima da zona discriminatória)</li><li>Paciente hemodinamicamente instável</li></ul>',
    aula:{titulo:'Critérios ultrassonográficos de viabilidade gestacional precoce', pendente:true},
    referencias:[
      ['Doubilet PM et al. "Diagnostic criteria for nonviable pregnancy early in the first trimester." N Engl J Med, 2013.', 'https://pubmed.ncbi.nlm.nih.gov/24106937/'],
      'ISUOG Practice Guidelines: ultrasound in early pregnancy. Ultrasound Obstet Gynecol, 2019.',
    ],
    vejaTambem:[],
  },
  {
    id:'percentil8',
    titulo:'Percentil de peso baixo',
    modulo:'crescimento',
    tags:['percentil','peso fetal estimado','restrição de crescimento','pig','rcf','doppler','pequeno para idade gestacional'],
    essencial:'Percentil 8 isolado, sem alteração de Doppler ou desaceleração de crescimento, é "pequeno para idade gestacional" — não é sinônimo de restrição de crescimento. Confirme a idade gestacional e avalie o Doppler antes de rotular.',
    erro:'Tratar todo percentil abaixo de 10 como restrição de crescimento fetal e já encaminhar ou antecipar parto — a maioria dos fetos entre percentil 3 e 10, com Doppler normal, é pequena constitucional, não patológica.',
    passo:{tipo:'checklist', itens:[
      'Confirme a idade gestacional — a datação de 1º trimestre é a mais confiável disponível.',
      'Avalie Doppler de artéria umbilical e cerebral média (relação cérebro-placentária).',
      'Se Doppler normal e sem outros achados: reavalie em 2 semanas, não antes disso — e sempre repita o Doppler nessa reavaliação, não só a medida de peso.',
      'Se Doppler alterado, percentil <3, ou queda ≥30 percentis entre dois ultrassons (sinal prático de alerta — o critério formal do consenso Delphi é cruzamento de 2 quartis): encaminhe para acompanhamento de alto risco.',
    ]},
    explicar:'"O peso está um pouco abaixo da média, mas isso sozinho não quer dizer que há um problema. Vamos olhar o fluxo de sangue do bebê pelo Doppler e repetir a medida em algumas semanas para ver como ele está crescendo."',
    pensando:'Meu bebê está desnutrido? Isso é culpa minha, da minha alimentação? — associar "peso baixo" à culpa materna é uma reação comum, e quase sempre não é o caso.',
    confianca:'Deixar claro que "percentil" é uma comparação estatística, não uma nota — e que o próximo exame (Doppler) é o que realmente diferencia um bebê pequeno saudável de um que precisa de mais atenção.',
    aprendi:'Um feto PIG (entre os percentis 3 e 10) não necessariamente é um feto doente. Os bebês pequenos constitucionais, filhos de pais de baixa estatura, impreterivelmente serão pequenos também. O mais importante não é analisar o ultrassom como um ponto fixo, e sim a trajetória de crescimento desse bebê.',
    vocesabia:[
      '"PIG" (pequeno para idade gestacional) e "RCF" (restrição de crescimento fetal) não são sinônimos — todo RCF é PIG, mas nem todo PIG é RCF.',
      'Queda de 30 percentis ou mais entre dois ultrassons já é sinal prático de alerta — ex.: percentil 60 no morfológico, 45 em 28 semanas, 20 em 30 semanas. A queda entre o morfológico e a última medida (60→20) já é relevante, mesmo abaixo do critério formal do Delphi (cruzamento de 2 quartis).',
    ],
    encaminhar:'Encaminhar para pré-natal de alto risco / medicina fetal quando houver:<ul><li>Percentil &lt;3 em qualquer idade gestacional</li><li>Doppler de artéria umbilical ou relação cérebro-placentária alterados</li><li>Queda ≥30 percentis entre dois exames</li><li>Oligoidrâmnio associado</li></ul>',
    aula:{titulo:'Como interpretar percentil de peso fetal e quando pedir Doppler', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines: diagnosis and management of small-for-gestational-age fetus and fetal growth restriction. Ultrasound Obstet Gynecol, 2020.', 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.22134'],
      ['Gordijn SJ et al. "Consensus definition of fetal growth restriction: a Delphi procedure." Ultrasound Obstet Gynecol, 2016.', 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.15884'],
    ],
    vejaTambem:['placenta-baixa','datacao-gestacao'],
  },
  {
    id:'placenta-baixa',
    titulo:'Placenta baixa',
    modulo:'placenta',
    tags:['placenta baixa','placenta prévia','inserção baixa','via de parto','acretismo','migração placentária'],
    essencial:'Quase 90% das placentas parecem baixas no 1º trimestre — normal, pelo tamanho do útero. Só 10% seguem baixas no morfológico do 2º trimestre; a maioria já subiu antes disso. Reavalie por via transvaginal no morfológico e, se persistir, após 32 semanas, antes da via de parto.',
    erro:'Tratar um achado do 2º trimestre como se já fosse diagnóstico definitivo: proibir atividade (inclusive relações sexuais) sem sangramento, ou já comentar cesárea, prematuridade e antecipação de parto — sem esperar a reavaliação perto do termo. Isso já gerou casais extremamente ansiosos por um achado que, na maioria das vezes, se resolve sozinho.',
    passo:{tipo:'checklist', itens:[
      'No morfológico do 2º trimestre (22–24 semanas), reavalie a posição da placenta e meça o colo do útero (predição de parto prematuro) — sempre por via transvaginal.',
      'Se ainda baixa e sem sangramento: tranquilize, sem restrição de atividade — inclusive relações sexuais —, e reagende reavaliação para ~32 semanas.',
      'Se houver sangramento, independente da idade gestacional: avalie como intercorrência aguda e oriente abstinência de relações sexuais até a placenta migrar.',
      'Perto do termo (35–36 semanas): se ainda baixa, defina via de parto e investigue sinais de acretismo se houver cesárea prévia.',
    ]},
    explicar:'"Nessa fase, é comum a placenta parecer baixa e depois \'subir\' conforme o útero cresce. Não muda nada agora — vamos só reavaliar mais perto do final da gestação."',
    pensando:'A placenta não está nutrindo meu bebê direito? Vou precisar de cesárea? Posso machucar o bebê se eu namorar?',
    confianca:'Explicar o conceito de "migração placentária" com uma imagem simples — o colo se afasta da placenta conforme o útero cresce — ajuda a paciente a entender por que não há necessidade de ação imediata.',
    aprendi:'A palavra "baixa" assusta mais do que a situação clínica justifica na maioria dos casos do 2º trimestre — vale investir tempo explicando a diferença entre achado e diagnóstico definitivo.',
    vocesabia:['Persistência conforme a idade gestacional do achado:<ul><li>Placenta baixa às 15–19 semanas: ~6% vira prévia (7% com cesárea prévia)</li><li>Placenta baixa às 32–35 semanas: ~40% persiste</li><li>Placenta prévia no 1º trimestre, sem cesárea prévia: 20% persiste</li><li>Placenta prévia no 1º trimestre, com cesárea prévia: 40% persiste</li></ul>'],
    encaminhar:'Encaminhar para avaliação de alto risco / medicina fetal quando houver:<ul><li>Sangramento vaginal ativo em qualquer volume</li><li>Placenta baixa persistente após 32 semanas associada a cesárea(s) anterior(es) — risco de acretismo</li><li>Placenta prévia centro-total mantida próximo ao termo</li></ul>',
    aula:{titulo:'Placenta baixa no 2º trimestre: quando repetir e quando encaminhar', pendente:true},
    referencias:[
      'ACOG Practice Bulletin No. 231 — Placenta Accreta Spectrum. Obstet Gynecol, 2018.',
      'ISUOG Practice Guidelines: role of ultrasound in placenta previa and accreta. Ultrasound Obstet Gynecol, 2016.',
    ],
    vejaTambem:['percentil8','grau-placenta','vasa-previa'],
  },
  {
    id:'arteria-umbilical-unica',
    titulo:'Artéria umbilical única',
    modulo:'marcadores',
    tags:['artéria umbilical única','auu','cordão umbilical','dois vasos','doppler','pig','rcf','cardiopatia fetal','ecocardiograma fetal'],
    essencial:'A AUU pode ser identificada no morfológico do 1º trimestre. Quando é isolada, as principais preocupações são PIG/RCF (≈20%) e discreto aumento do risco de cardiopatias, sendo comum a indicação de ecocardiograma fetal.',
    erro:'Solicitar investigação extensa apenas pela presença de AUU. O mais importante é confirmar que o ultrassom morfológico foi completo e pesquisar malformações associadas antes de definir a conduta.',
    passo:{tipo:'checklist', itens:[
      'Confirmar que a AUU é um achado isolado.',
      'Revisar cuidadosamente a anatomia fetal.',
      'Considerar ecocardiograma fetal.',
      'Acompanhar o crescimento fetal com ultrassonografias seriadas.',
    ]},
    explicar:'"Em vez de três vasos, o cordão do seu bebê possui dois. Quando esse é o único achado, a maioria dos bebês nasce saudável. Vamos apenas acompanhar o crescimento e avaliar o coração com mais atenção."',
    pensando:'Meu bebê tem um vaso a menos. Será que ele vai nascer com algum problema? Será que fiz alguma coisa errada durante a gravidez?',
    confianca:'Deixar claro que "artéria única" é uma variação anatômica do cordão, não uma doença — e que o acompanhamento (crescimento seriado e ecocardiograma) existe justamente para dar segurança, não porque já haja um problema identificado.',
    aprendi:'A artéria umbilical única costuma assustar muito mais a gestante do que ao médico. Quando o restante do exame está normal, a nossa principal função é acompanhar bem a gestação e evitar criar um problema maior do que realmente existe.',
    vocesabia:['Em cerca de 70–80% dos casos, a AUU é um achado isolado. Quando não há outras malformações no ultrassom, o prognóstico costuma ser excelente.'],
    aula:{titulo:'Artéria umbilical única: quando investigar e como acompanhar', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines: performance of the routine mid-trimester fetal ultrasound scan. Ultrasound Obstet Gynecol, 2022.', 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.24888'],
      'Achado isolado de artéria umbilical única e risco de PIG/RCF e cardiopatia congênita — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['percentil8','vasa-previa'],
  },
  {
    id:'dilatacao-pelves-renais',
    titulo:'Dilatação das pelves renais',
    modulo:'urinario',
    tags:['dilatação das pelves renais','dilatação do trato urinário','dilatação pielocalicial','trato urinário fetal','mega bexiga','ureter','rim fetal'],
    essencial:'A dilatação das pelves renais isolada raramente representa risco imediato ao bebê. O principal é acompanhar sua evolução, pois dilatações maiores apresentam maior chance de necessitar tratamento após o nascimento.',
    erro:'Assustar a gestante diante de uma dilatação leve das pelves renais. A maioria dos casos resolve espontaneamente. Já as dilatações acima de 10 mm exigem acompanhamento mais cuidadoso.',
    passo:{tipo:'checklist', itens:[
      'Medir corretamente a pelve renal.',
      'Avaliar rins, bexiga e líquido amniótico.',
      'Programar ultrassom de controle.',
      'Se a dilatação for >10 mm, orientar seguimento pós-natal, pois aumenta a chance de necessidade de tratamento cirúrgico.',
      'Se a dilatação for >10 mm, considerar consulta com pediatra ainda durante a gestação — traz mais segurança para o casal e reduz a ansiedade sobre como será o futuro.',
    ]},
    explicar:'"Encontramos uma discreta dilatação na região onde a urina fica armazenada dentro do rim. Na maioria dos casos isso melhora espontaneamente. Vamos apenas acompanhar a evolução durante a gestação."',
    pensando:'O rim do meu bebê está doente? Ele vai precisar de cirurgia? Isso pode prejudicar a função dos rins?',
    confianca:'Explicar que "pelve renal" é só o espaço onde a urina se acumula antes de descer pelo ureter — e que medir e acompanhar esse espaço, sem necessariamente intervir, é a forma correta de cuidar, não sinal de que algo está errado.',
    aprendi:'Nem toda dilatação das pelves renais significa doença. A melhor forma de cuidar dessa gestação é acompanhar a evolução e explicar à família que, na maioria das vezes, o desfecho é favorável.',
    vocesabia:['A dilatação leve das pelves renais é mais frequente em fetos masculinos. O uso materno de progesterona também pode favorecer esse achado devido ao seu efeito de relaxamento da musculatura lisa.'],
    encaminhar:'Encaminhar para avaliação de alto risco / medicina fetal quando houver:<ul><li>Dilatação identificada precocemente, no 1º trimestre</li><li>Mega bexiga associada</li><li>Dilatação de ureteres associada</li></ul>Nesses casos, pode ser necessária intervenção cirúrgica.',
    aula:{titulo:'Dilatação das pelves renais: quando é normal e quando encaminhar', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines: performance of the routine mid-trimester fetal ultrasound scan — avaliação do trato urinário fetal. Ultrasound Obstet Gynecol, 2022.', 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.24888'],
      'Classificação e seguimento da dilatação das pelves renais / dilatação do trato urinário fetal — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['megabexiga-fetal'],
  },
  {
    id:'megabexiga-fetal',
    titulo:'Megabexiga fetal',
    modulo:'urinario',
    tags:['megabexiga fetal','megabexiga','bexiga aumentada','aneuploidia','uropatia obstrutiva','obstrução urinária baixa','trato urinário fetal','medicina fetal'],
    essencial:'A megabexiga fetal é definida por bexiga com diâmetro longitudinal ≥7 mm no 1º trimestre. As principais preocupações são aneuploidias (≈25%) e, em menor frequência, uropatia obstrutiva (≈10%).',
    erro:'Associar toda megabexiga à obstrução urinária. No 1º trimestre, a investigação genética é tão importante quanto a avaliação do trato urinário.',
    passo:{tipo:'checklist', itens:[
      'Explique à gestante que são necessários exames complementares antes de definir o prognóstico.',
      'Solicite avaliação com Medicina Fetal.',
      'Oriente sobre a possibilidade de investigação genética, conforme os demais achados.',
      'Mantenha o acompanhamento pré-natal até a avaliação especializada.',
    ]},
    explicar:'"A bexiga do bebê está maior do que o esperado para esta fase da gestação. Isso pode acontecer por diferentes causas. Vamos investigar cuidadosamente para identificar a origem e definir o melhor acompanhamento."',
    pensando:'Meu bebê não consegue fazer xixi? Os rins dele estão comprometidos? Existe tratamento?',
    confianca:'Deixar claro, logo de início, que o achado isolado tem investigação e acompanhamento bem definidos — e que "vamos investigar" não é sinônimo de "algo grave", é o caminho para saber exatamente o que fazer.',
    aprendi:'A primeira pergunta não deve ser ‘é uma obstrução?’. Deve ser: ‘o restante do bebê está normal?’. Essa resposta costuma definir o prognóstico e os próximos passos da investigação.',
    vocesabia:['Quando a megabexiga mede entre 7 e 15 mm e não há aneuploidia, muitos casos apresentam resolução espontânea durante a gestação, sem necessidade de tratamento.'],
    encaminhar:'Encaminhe para Medicina Fetal quando houver:<ul><li>Megabexiga no 1º trimestre (≥7 mm)</li><li>Megabexiga persistente ou progressiva</li><li>Oligodrâmnio</li><li>Dilatação das pelves renais ou ureteres</li><li>Outras malformações ou marcadores de aneuploidia</li><li>Suspeita de obstrução urinária baixa</li></ul>',
    aula:{titulo:'Megabexiga fetal: quando é obstrução e quando investigar aneuploidia', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines: performance of the routine mid-trimester fetal ultrasound scan — avaliação do trato urinário fetal e marcadores de aneuploidia. Ultrasound Obstet Gynecol, 2022.', 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.24888'],
      'Megabexiga fetal no 1º trimestre: prognóstico, investigação genética e conduta — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['dilatacao-pelves-renais'],
  },
  {
    id:'colo-curto',
    titulo:'Colo curto',
    modulo:'colo',
    tags:['colo curto','insuficiência istmocervical','comprimento cervical','cerclagem','progesterona vaginal','parto prematuro','afunilamento cervical'],
    essencial:'A insuficiência istmocervical pode causar perdas fetais antes do ultrassom morfológico. Ainda não existe um valor de corte bem estabelecido para o colo no 1º trimestre, mas medidas próximas de 30 mm merecem atenção, principalmente quando há afunilamento do orifício interno.',
    erro:'Acreditar que um toque vaginal normal exclui insuficiência istmocervical. O toque avalia principalmente o orifício cervical externo. O orifício interno, onde a doença começa, só pode ser avaliado pelo ultrassom transvaginal. Um toque normal NÃO exclui insuficiência istmocervical.',
    passo:{tipo:'checklist', itens:[
      'Iniciar progesterona vaginal. Em caso de colos muito curtos, encaminhar para o pré-natal de alto risco ou maternidade.',
      'Reavaliar o comprimento do colo conforme a idade gestacional.',
      'Investigar antecedente de perdas no 2º trimestre ou parto prematuro.',
      'Orientar sinais de alerta e manter seguimento rigoroso.',
    ]},
    explicar:'"O colo do útero funciona como uma ‘porta’ que deve permanecer fechada durante a gestação. Em algumas mulheres ele começa a abrir por dentro antes de causar qualquer sintoma. Por isso o ultrassom é tão importante. Assim podemos te dar progesterona para evitar a prematuridade extrema."',
    pensando:'Se eu não sinto dor e está tudo bem, por que meu colo está abrindo? Meu bebê pode nascer a qualquer momento?',
    confianca:'"Seu exame mostrou uma alteração que conseguimos identificar antes de ela causar sintomas. Isso nos permite agir mais cedo e aumentar as chances de a gestação evoluir bem."',
    aprendi:'Algumas perdas gestacionais poderiam ser evitadas se olhássemos o colo do útero antes que ele começasse a abrir… O ultrassom não substitui o exame clínico, mas consegue mostrar exatamente a parte do colo que o dedo nunca alcança.',
    vocesabia:['Muitas mulheres com insuficiência istmocervical são primigestas. O primeiro sinal pode ser justamente uma perda gestacional no 2º trimestre.'],
    encaminhar:'Encaminhar para pré-natal de alto risco / medicina fetal quando houver:<ul><li>Colo &lt;25 mm antes de 24 semanas</li><li>Suspeita de insuficiência istmocervical</li><li>Abertura do orifício interno ao ultrassom</li><li>História de perda fetal tardia ou parto prematuro espontâneo</li><li>Dúvida sobre indicação de cerclagem</li></ul>',
    aula:{titulo:'Colo curto: quando indicar progesterona e quando pensar em cerclagem', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines: role of ultrasound in the prediction of spontaneous preterm birth. Ultrasound Obstet Gynecol, 2022.', 'https://obgyn.onlinelibrary.wiley.com/doi/full/10.1002/uog.26020'],
      'ACOG Practice Bulletin — Cervical Insufficiency — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:[],
  },
  {
    id:'foco-ecogenico-intracardiaco',
    titulo:'Foco ecogênico intracardíaco',
    modulo:'marcadores',
    tags:['foco ecogênico intracardíaco','golf ball','marcador de aneuploidia','marcador leve','coração fetal','eco intracardíaco'],
    essencial:'O foco ecogênico intracardíaco (Golf Ball) é um marcador ultrassonográfico leve de aneuploidia, e não uma malformação cardíaca. Quando é um achado isolado, praticamente não modifica o risco de aneuploidia.',
    erro:'Informar à gestante que o bebê "tem um problema no coração". O Golf Ball não é uma cardiopatia e não interfere na função cardíaca.',
    passo:{tipo:'checklist', itens:[
      'Verificar se o Golf Ball é um achado isolado.',
      'Revisar o rastreamento para aneuploidias.',
      'Na ausência de outros marcadores ou malformações, tranquilizar a gestante e manter o pré-natal habitual.',
    ]},
    explicar:'"Esse pontinho brilhante é apenas um marcador visto no ultrassom. Ele não altera o funcionamento do coração e, quando aparece sozinho, geralmente não aumenta o risco para o bebê."',
    pensando:'Meu bebê tem uma doença no coração? Vai precisar de cirurgia? Esse pontinho pode prejudicar o coração dele?',
    confianca:'"Hoje sabemos que um marcador isolado tem um significado muito diferente de vários marcadores juntos. Por isso analisamos sempre o bebê como um todo antes de tirar qualquer conclusão."',
    aprendi:'A maioria das gestantes acha que o bebê tem uma malformação no coração, e isso traz grande ansiedade. Acalmar a mãe é essencial — principalmente porque, quase 100% das vezes, o Golf Ball não será mais identificado no 3º trimestre.',
    vocesabia:[
      'Apesar do aspecto brilhante ao ultrassom, não existe uma lesão no coração. Ao exame anatomopatológico, não há uma alteração estrutural correspondente.',
      'Na grande maioria dos casos, o Golf Ball deixa de ser visto ao ultrassom até o 3º trimestre — reforço de que não é uma alteração estrutural permanente.',
    ],
    encaminhar:'Encaminhar para pré-natal de alto risco / medicina fetal quando houver:<ul><li>Golf Ball associado a outros marcadores ultrassonográficos</li><li>Malformações estruturais associadas</li><li>Rastreamento positivo para aneuploidias</li><li>Dúvida na interpretação do exame</li></ul>',
    aula:{titulo:'Foco ecogênico intracardíaco: por que não é uma cardiopatia', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines: performance of the routine mid-trimester fetal ultrasound scan — marcadores leves de aneuploidia. Ultrasound Obstet Gynecol, 2022.', 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.24888'],
      'Foco ecogênico intracardíaco isolado e risco de aneuploidia — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['intestino-hiperecogenico','ventriculomegalia-leve','prega-nucal-espessada'],
  },
  {
    id:'intestino-hiperecogenico',
    titulo:'Intestino hiperecogênico',
    modulo:'marcadores',
    tags:['intestino hiperecogênico','marcador de aneuploidia','marcador leve','fibrose cística','infecção congênita','restrição de crescimento fetal'],
    essencial:'O intestino hiperecogênico é <strong>normal no 1º trimestre</strong>. No 2º e 3º trimestres, é um marcador ultrassonográfico leve que merece investigação, principalmente por sua associação com aneuploidias, infecções congênitas, fibrose cística e restrição de crescimento fetal.',
    erro:'Interpretar o intestino hiperecogênico como uma malformação intestinal. Na verdade, ele é um marcador ultrassonográfico e seu significado depende da idade gestacional e da presença de outros achados.',
    passo:{tipo:'checklist', itens:[
      'Confirmar a idade gestacional.',
      'Revisar o rastreamento para aneuploidias.',
      'Avaliar crescimento fetal.',
      'Considerar investigação para infecções congênitas e fibrose cística quando indicada.',
      'Programar acompanhamento ultrassonográfico.',
    ]},
    explicar:'"Esse não é um defeito no intestino. É um achado do ultrassom que, em alguns casos, nos leva a investigar outras condições. Na maioria das vezes, quando aparece sozinho, a evolução é boa."',
    pensando:'Meu bebê tem um problema no intestino? Vai precisar de cirurgia quando nascer?',
    confianca:'"Nem todo marcador significa doença. Nosso papel é investigar com critério e evitar conclusões precipitadas."',
    aprendi:'Sempre lembro que um mesmo achado pode ter significados completamente diferentes dependendo da idade gestacional. Antes de interpretar o laudo, interprete o contexto.',
    vocesabia:['Acredita-se que a hiperecogenicidade intestinal possa refletir sofrimento intestinal fetal. Em casos associados à restrição de crescimento, existe maior risco de enterocolite necrosante no período neonatal.'],
    encaminhar:'Encaminhar para pré-natal de alto risco / medicina fetal quando houver:<ul><li>Intestino hiperecogênico persistente</li><li>Restrição de crescimento fetal</li><li>Outros marcadores ou malformações</li><li>Suspeita de infecção congênita</li><li>Risco aumentado para aneuploidias</li></ul>',
    aula:{titulo:'Intestino hiperecogênico: quando investigar e quando tranquilizar', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines: performance of the routine mid-trimester fetal ultrasound scan — marcadores leves de aneuploidia. Ultrasound Obstet Gynecol, 2022.', 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.24888'],
      'Intestino hiperecogênico fetal: associações clínicas e conduta — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['foco-ecogenico-intracardiaco','ventriculomegalia-leve','prega-nucal-espessada'],
  },
  {
    id:'ventriculomegalia-leve',
    titulo:'Ventriculomegalia leve',
    modulo:'marcadores',
    tags:['ventriculomegalia leve','ventriculomegalia limítrofe','átrio ventricular','marcador leve','citomegalovírus','cariótipo fetal','ressonância fetal'],
    essencial:'A medida do átrio do ventrículo lateral, no plano transventricular, na altura do glomo do plexo coroide, classifica a ventriculomegalia: normal &lt;9mm, leve 9–11mm, moderada 12–14mm, grave ≥15mm. Na leve, o córtex costuma medir &gt;10mm e o DBP é normal; na grave, o córtex fica &lt;10mm e o DBP aumenta — sinais indiretos de mais líquido comprimindo o parênquima.',
    erro:'Medir o átrio fora do plano correto (oblíquo, sem apoiar os calibradores nas margens internas da parede ventricular) e superestimar o valor — ou, no sentido oposto, tranquilizar a paciente diante de uma medida alterada sem investigar cariótipo, infecção congênita e anatomia cerebral completa.',
    passo:{tipo:'checklist', itens:[
      'Confirme a medida no plano transventricular correto, na altura do glomo do plexo coroide, com os calibradores nas margens internas da parede do ventrículo.',
      'Classifique: normal (&lt;9mm), leve (9–11mm), moderada (12–14mm) ou grave (≥15mm) — a conduta e o prognóstico mudam entre essas faixas.',
      'Avalie o córtex e o DBP: córtex &gt;10mm com DBP normal reforça um quadro leve; córtex &lt;10mm com DBP aumentado é sinal de gravidade.',
      'Revise a anatomia fetal completa, com atenção ao corpo caloso, ao cavo do septo pelúcido e à fossa posterior.',
      'Ofereça investigação para aneuploidias (cariótipo/microarray, considerar NIPT) e rastreamento de infecção congênita, principalmente citomegalovírus.',
      'Programe USG de controle a cada 2–4 semanas — a trajetória (estável, regride ou progride) pesa tanto quanto o valor isolado.',
    ]},
    explicar:'"Encontramos um espaço dentro do cérebro do bebê, onde fica o líquido, um pouco maior do que o esperado. Isso não é hidrocefalia — na maioria das vezes, quando é um achado isolado e discreto, a evolução é boa. Vamos investigar algumas causas possíveis e acompanhar de perto."',
    pensando:'Meu bebê vai ter uma deficiência? Ele vai precisar de uma cirurgia no cérebro depois que nascer?',
    confianca:'Separar claramente "ventriculomegalia leve isolada" de "hidrocefalia" já na primeira frase evita que a gestante carregue, por semanas, uma imagem mental muito mais grave do que a situação real — e mostrar que existe um plano de investigação claro, não apenas "esperar para ver", também reduz a ansiedade.',
    aprendi:'Toda vez que vejo "ventriculomegalia" no laudo, penso primeiro na mãe lendo isso sozinha em casa antes da consulta — porque pra ela, aquilo soa como hidrocefalia grave. Aprendi que separar bem "leve" de "grave" logo na primeira frase, e explicar que vamos acompanhar a evolução, vale mais do que qualquer detalhe técnico da medida do átrio.',
    vocesabia:[
      'Cerca de 80–90% dos casos de ventriculomegalia leve isolada, sem outros achados, cariótipo normal e sem sinais de infecção, têm desenvolvimento neurológico normal — mas o acompanhamento até o fim da gestação é o que confirma isso.',
      'É mais frequente no sexo masculino, e casos leves unilaterais tendem a ter prognóstico ainda mais favorável que os bilaterais.',
    ],
    encaminhar:'Encaminhar para pré-natal de alto risco / medicina fetal quando houver:<ul><li>Ventriculomegalia moderada ou grave (≥12mm)</li><li>Progressão da medida em exames seriados</li><li>Córtex &lt;10mm ou DBP aumentado</li><li>Malformações do sistema nervoso central associadas</li><li>Outros marcadores ou malformações estruturais</li><li>Investigação positiva para infecção congênita</li></ul>',
    aula:{titulo:'Ventriculomegalia: como medir, classificar e quando encaminhar', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines (updated): sonographic examination of the fetal central nervous system. Ultrasound Obstet Gynecol, 2020.', 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.22145'],
      'Classificação e conduta na ventriculomegalia fetal leve — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['intestino-hiperecogenico','foco-ecogenico-intracardiaco','prega-nucal-espessada'],
  },
  {
    id:'prega-nucal-espessada',
    titulo:'Prega nucal espessada',
    modulo:'marcadores',
    tags:['prega nucal espessada','prega nucal aumentada','marcador de aneuploidia','marcador leve do 2º trimestre','translucência nucal','trissomia 21','ecocardiograma fetal','doppler de artéria cerebral média','anemia fetal'],
    essencial:'A prega nucal é medida no morfológico do 2º trimestre (plano transcerebelar, da tábua óssea occipital externa até a borda externa da pele), e é considerada espessada quando ≥6mm entre 15 e 20 semanas. É um marcador leve de aneuploidia — não é sinônimo de Síndrome de Down — mas também exige avaliação do coração fetal (ecocardiograma) e rastreamento de anemia fetal (Doppler de artéria cerebral média).',
    erro:'Tratar a prega nucal aumentada como se fosse diagnóstico de Síndrome de Down, ou confundi-la com a translucência nucal do 1º trimestre — são exames diferentes, em momentos diferentes, com significados diferentes. Também é erro comum não completar a investigação: além do rastreamento de aneuploidias, esse achado pede ecocardiograma fetal e Doppler de artéria cerebral média para pesquisa de anemia fetal.',
    passo:{tipo:'checklist', itens:[
      'Confirme que a medida foi feita no plano correto: transcerebelar, com os calibradores da tábua óssea occipital externa até a borda externa da pele.',
      'Considere espessada quando ≥6mm entre 15 e 20 semanas.',
      'Revise o rastreamento de aneuploidias já realizado (TN do 1º trimestre, NIPT, bioquímica) — a prega nucal isolada muda a interpretação do risco combinado.',
      'Solicite ecocardiograma fetal — a prega nucal aumentada tem associação com cardiopatias congênitas, independentemente do risco de aneuploidia.',
      'Avalie o Doppler da artéria cerebral média para rastreio de anemia fetal — nem todo obstetra está treinado nessa avaliação; encaminhe para especialista em medicina fetal quando houver dúvida.',
      'Revise a anatomia fetal completa em busca de outros marcadores ou malformações associadas.',
    ]},
    explicar:'"Encontramos uma dobra de pele na parte de trás do pescoço do bebê um pouco mais espessa do que o esperado. Isso não é a mesma coisa que a translucência nucal do início da gravidez, e também não significa que o bebê tenha Síndrome de Down. Precisamos avaliar o coração dele com mais atenção e verificar também se não há sinal de anemia — por isso vou te encaminhar para um exame mais completo."',
    pensando:'Meu bebê tem Síndrome de Down? Por que só descobriram isso agora, se já fiz os exames do início da gravidez?',
    confianca:'Deixar claro que "prega nucal aumentada" não é sinônimo de Síndrome de Down, e que o próximo passo (ecocardiograma e Doppler de ACM) é justamente para investigar com mais precisão — não porque já exista um diagnóstico fechado — ajuda a paciente a entender que ainda estamos no processo de investigação.',
    aprendi:'Prega nucal aumentada não é sinônimo de Síndrome de Down. Aprendi que, além de revisar o rastreamento de aneuploidias, é essencial avaliar o coração do bebê com ecocardiograma e pesquisar anemia fetal pelo Doppler da artéria cerebral média — e nem todo médico sabe fazer essa avaliação direito. Por isso, sempre que o obstetra tiver dúvida, sugiro encaminhar para quem é especialista em medicina fetal a arriscar um exame incompleto.',
    vocesabia:[
      'A prega nucal isolada, sem outros marcadores, malformações ou cardiopatia, tem impacto pequeno no risco final de aneuploidia — mas o achado ainda pede investigação completa antes de tranquilizar.',
      'Diferente da translucência nucal (medida entre 11 e 14 semanas), a prega nucal é uma medida do 2º trimestre e não é comparável numericamente com ela.',
    ],
    encaminhar:'Encaminhar para pré-natal de alto risco / medicina fetal quando houver:<ul><li>Prega nucal ≥6mm associada a outros marcadores ou malformações</li><li>Cardiopatia identificada ou dúvida na avaliação do coração fetal</li><li>Necessidade de Doppler de artéria cerebral média para rastreio de anemia fetal, quando não houver treinamento para essa avaliação</li><li>Rastreamento de aneuploidias de risco aumentado</li></ul>',
    aula:{titulo:'Prega nucal espessada: o que investigar além do risco de aneuploidia', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines: performance of the routine mid-trimester fetal ultrasound scan — marcadores leves de aneuploidia. Ultrasound Obstet Gynecol, 2022.', 'https://obgyn.onlinelibrary.wiley.com/doi/10.1002/uog.24888'],
      'Prega nucal espessada isolada, avaliação cardíaca e rastreio de anemia fetal — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['ventriculomegalia-leve','foco-ecogenico-intracardiaco','intestino-hiperecogenico'],
  },
  {
    id:'morfologico-1trimestre',
    titulo:'Morfológico do 1º trimestre',
    modulo:'trimestre1',
    tags:['morfológico do 1º trimestre','translucência nucal','tn simples','ducto venoso','doppler tricúspide','rastreamento de pré-eclâmpsia','aspirina','doppler artérias uterinas'],
    essencial:'O morfológico do 1º trimestre vai muito além da translucência nucal: soma avaliação de ducto venoso, Doppler da tricúspide, anatomia fetal completa e rastreamento de pré-eclâmpsia — que define quem se beneficia da aspirina preventiva.',
    erro:'Dizer que o morfológico do 1º trimestre é apenas uma "translucência nucal mais cara". Na realidade, ele responde perguntas completamente diferentes e pode identificar gestantes que se beneficiam da prevenção da pré-eclâmpsia.',
    passo:{tipo:'checklist', itens:[
      'Explicar a diferença entre TN simples e morfológico do 1º trimestre antes da paciente escolher o exame.',
      'Realizar o rastreamento de pré-eclâmpsia (história obstétrica, doenças crônicas e autoimunes, IMC, pressão arterial média, Doppler das artérias uterinas) quando o morfológico for feito.',
      'Calcular o risco e, se indicado, iniciar aspirina no momento certo — o benefício depende do início precoce.',
      'Se a paciente quiser migrar para o morfológico do 1º trimestre, mesmo já tendo agendado a TN simples, não recusar — respeitar a escolha pelo exame mais completo.',
    ]},
    aprendi:'Sempre escuto que o morfológico do 1º trimestre é uma ‘moda’. Mas a pré-eclâmpsia continua sendo uma das principais causas de morte materna. Se hoje conseguimos identificar precocemente quem tem maior risco e iniciar medidas preventivas, por que abrir mão dessa oportunidade?',
    vocesabia:[
      'O que a TN simples avalia:<ul><li>CCN</li><li>Frequência cardíaca fetal</li><li>Translucência nucal</li><li>Pesquisa do osso nasal</li></ul>',
      'O morfológico do 1º trimestre acrescenta:<ul><li>Ducto venoso</li><li>Doppler da valva tricúspide</li><li>Anatomia fetal completa (cérebro, face, coluna, diafragma, coração, estômago, rins, bexiga, parede abdominal, membros, cordão, placenta)</li><li>Rastreamento de pré-eclâmpsia (história obstétrica, doenças crônicas e autoimunes, IMC, pressão arterial média, Doppler das artérias uterinas)</li></ul>',
    ],
    aula:{titulo:'Morfológico do 1º trimestre: o que ele responde que a TN simples não responde', pendente:true},
    referencias:[
      'ISUOG Practice Guidelines: performance of first-trimester fetal ultrasound scan. Ultrasound Obstet Gynecol, 2023.',
      'ASPRE trial — aspirin for evidence-based preeclampsia prevention — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['datacao-gestacao'],
  },
  {
    id:'doppler-introducao',
    titulo:'Entendendo o Doppler fetal',
    modulo:'doppler',
    tags:['doppler fetal','artéria umbilical','artéria cerebral média','acm','relação cérebro-placentária','rcp','ducto venoso','hipóxia fetal','acidose fetal','centralização fetal','insuficiência placentária'],
    essencial:'Hipóxia e acidose são processos diferentes: hipóxia é redução de oxigênio (dias/semanas), acidose é falência tardia da compensação fetal. O Doppler normal da artéria umbilical não exclui insuficiência placentária — nenhum vaso deve ser interpretado isoladamente.',
    erro:'Interpretar um vaso do Doppler isoladamente, sem considerar os demais e a idade gestacional. Usar o termo "centralização" como se fosse, por si só, indicação de sofrimento fetal ou de parto — o excesso desse raciocínio já levou a interrupções desnecessárias da gestação.',
    passo:{tipo:'checklist', itens:[
      'Identifique qual vaso está alterado no laudo — nunca conclua a partir de um vaso isolado.',
      'Se a artéria umbilical estiver alterada, pense em comprometimento da resistência placentária (quanto maior o IP, maior o comprometimento).',
      'Se ACM ou RCP estiverem alteradas, pense em hipóxia (redistribuição de fluxo) — isso ainda não é acidose.',
      'Se o ducto venoso estiver alterado, isso já é sinal de acidose — estágio mais avançado, decisão mais urgente.',
      'Sempre correlacione o achado com a idade gestacional antes de decidir a conduta.',
    ]},
    aprendi:'Aprendi com o tempo que nunca é demais pedir o estudo Doppler, principalmente a partir do 2º trimestre. Vejo muitos bebês PIG e mães com diabetes gestacional sendo acompanhados sem o Doppler. Para o ultrassonografista, é o mesmo que fazer o exame com uma venda nos olhos 🫣',
    vocesabia:[
      'Reserva funcional da placenta — comprometimento estimado da circulação placentária:<ul><li>Artéria umbilical normal: até ~50%</li><li>IP acima do percentil 95: ~75%</li><li>Diástole zero: ~80%</li><li>Diástole reversa: ~90%</li></ul>',
      'O seguimento seriado da artéria umbilical reduz aproximadamente 30% das complicações perinatais.',
      'O feto tem baixo teor de oxigênio no sangue mesmo em condições normais — por isso suas hemácias são nucleadas, uma adaptação para sua sobrevivência.',
    ],
    criterios:[
      {titulo:'Cascata do Doppler: da resistência à acidose', html:`
<div class="flow">
  <div class="flow-step tone-lav"><div class="flow-icon">🩸</div><div class="flow-text"><div class="flow-label">Artéria umbilical</div><div class="flow-desc">Resistência placentária — quanto maior o IP, maior a resistência. Pode estar normal mesmo com ~50% da circulação placentária comprometida.</div></div></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step tone-warn"><div class="flow-icon">🧠</div><div class="flow-text"><div class="flow-label">ACM · RCP</div><div class="flow-desc">Hipóxia — redistribuição de fluxo. Compensado, pode durar dias ou semanas. Ainda não é acidose.</div></div></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step tone-danger"><div class="flow-icon">⏱️</div><div class="flow-text"><div class="flow-label">Ducto venoso</div><div class="flow-desc">Acidose — falência da compensação fetal. Marcador tardio, decisão mais urgente.</div></div></div>
</div>`},
      {titulo:'Da hipóxia à acidose: a cascata bioquímica', html:`
<div class="flow">
  <div class="flow-step tone-warn"><div class="flow-icon">🫁</div><div class="flow-text"><div class="flow-label">↓ Oxigênio</div><div class="flow-desc">Hipóxia — o feto entra em compensação.</div></div></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step tone-danger"><div class="flow-icon">🧪</div><div class="flow-text"><div class="flow-label">pH ~7,2</div><div class="flow-desc">Acidose — falência da compensação, metabolismo anaeróbico.</div></div></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step tone-danger"><div class="flow-icon">⚠️</div><div class="flow-text"><div class="flow-label">Morte intrauterina / perinatal</div><div class="flow-desc">Ou morbidade perinatal, quando não é fatal.</div></div></div>
</div>`},
      {titulo:'Valores de pH fetal', html:`
<div class="value-cards">
  <div class="value-card tone-ok"><div class="value-card-icon">🧪</div><div class="value-card-label">Normal</div><div class="value-card-range">7,35–7,45</div></div>
  <div class="value-card tone-danger"><div class="value-card-icon">🧪</div><div class="value-card-label">Acidemia</div><div class="value-card-range">&lt;&nbsp;7,35</div></div>
  <div class="value-card tone-warn"><div class="value-card-icon">🧪</div><div class="value-card-label">Alcalose</div><div class="value-card-range">&gt;&nbsp;7,45</div></div>
</div>`},
      {titulo:'Valores de referência', html:`
<div class="value-cards">
  <div class="value-card"><div class="value-card-icon">🩸</div><div class="value-card-label">Umbilical</div><div class="value-card-range">Normal<br>&lt;&nbsp;P95</div></div>
  <div class="value-card"><div class="value-card-icon">🧠</div><div class="value-card-label">ACM</div><div class="value-card-range">Normal<br>&gt;&nbsp;P5</div></div>
  <div class="value-card"><div class="value-card-icon">⚖️</div><div class="value-card-label">RCP</div><div class="value-card-range">Normal<br>&gt;&nbsp;P5</div></div>
</div>`},
      {titulo:'Artéria umbilical: gravidade conforme o padrão', html:`
<div class="flow">
  <div class="flow-step tone-warn"><div class="flow-icon">🩸</div><div class="flow-text"><div class="flow-label">IP &gt; P95</div><div class="flow-desc">Hipóxia.</div></div></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step tone-danger"><div class="flow-icon">🩸</div><div class="flow-text"><div class="flow-label">Diástole zero</div><div class="flow-desc">Acidose.</div></div></div>
  <div class="flow-arrow">↓</div>
  <div class="flow-step tone-danger"><div class="flow-icon">🚨</div><div class="flow-text"><div class="flow-label">Diástole reversa</div><div class="flow-desc">Morte iminente.</div></div></div>
</div>`},
      {titulo:'Por que a ACM cai na hipóxia (redistribuição de fluxo)', html:`
<div class="redist-grid">
  <div class="redist-box less"><div class="redist-icon">↓</div><div class="redist-title">Menos fluxo</div><div class="redist-list">Intestino<br>Músculos<br>Rins</div></div>
  <div class="redist-box more"><div class="redist-icon">↑</div><div class="redist-title">Mais fluxo</div><div class="redist-list">Cérebro<br>Coronárias<br>Suprarrenais</div></div>
</div>
<div class="redist-arrow">↓</div>
<div class="redist-result">Resultado: o IP da ACM diminui</div>`},
      {titulo:'Centralização fetal — o que é e o que não é', html:`
<div class="def-row"><div class="def-term">É</div><div class="def-desc">Mecanismo adaptativo à hipóxia.</div></div>
<div class="def-row"><div class="def-term">Não é</div><div class="def-desc">Sinal isolado de sofrimento terminal.</div></div>
<div class="def-row"><div class="def-term">Não indica</div><div class="def-desc">Parto isoladamente.</div></div>
<div class="def-row"><div class="def-term">Hoje</div><div class="def-desc">Muitos serviços evitam o termo no laudo — o uso excessivo já levou a interrupções desnecessárias.</div></div>`},
    ],
    aula:{titulo:'Entendendo o Doppler fetal: fisiopatologia e interpretação prática', pendente:true},
    referencias:[
      'Nicolaides KH / Fetal Medicine Foundation (FMF) — fisiopatologia da centralização fetal e Doppler — referência específica pendente de indicação da autora.',
      'ISUOG Practice Guidelines: use of Doppler ultrasonography in obstetrics. Ultrasound Obstet Gynecol.',
    ],
    vejaTambem:['acm-baixa-resistencia'],
  },
  {
    id:'acm-baixa-resistencia',
    titulo:'ACM de baixa resistência',
    modulo:'doppler',
    tags:['acm de baixa resistência','relação cérebro-placentária','rcp reduzida','doppler de artéria cerebral média','pig','ciur','centralização fetal','placenta anterior','reflexo vagal fetal'],
    essencial:'Alteração de ACM (baixa resistência) ou de RCP (relação cérebro-placentária) só tem relevância clínica em fetos PIG/CIUR. Em feto com peso adequado (AIG), é muito improvável que represente hipóxia real — na maioria das vezes é um efeito técnico transitório, não um sinal de sofrimento fetal.',
    erro:'Interpretar ACM de baixa resistência ou RCP reduzida em feto com peso normal como sinal de hipóxia e já indicar parto — sem reavaliar a técnica do exame primeiro. Essa "alteração" isolada, num feto AIG, já levou a muitas cesáreas e induções por iatrogenia, principalmente quando o exame é feito rápido, sem tempo para reavaliação (alta demanda de convênio, fila do SUS).',
    passo:{tipo:'checklist', itens:[
      'Confirme o peso fetal estimado antes de reagir a uma ACM/RCP alterada — se o feto é PIG/CIUR, a alteração é clinicamente relevante; se é AIG, é muito improvável que seja hipóxia real.',
      'Antes de fechar o laudo com ACM/RCP alterada num feto AIG, revise a técnica: pressão excessiva do transdutor (principalmente em placenta anterior) e compressão de cordão pelo próprio bebê são as causas mais comuns de vasodilatação cerebral transitória, não relacionada à hipóxia verdadeira.',
      'Alivie a pressão do transdutor, aguarde o bebê mudar de posição e o cordão descomprimir, e repita a medida antes de considerar o achado definitivo.',
      'Só em fetos PIG/CIUR: correlacione com o Doppler de artéria umbilical e conduza conforme a cascata de gravidade (umbilical → ACM/RCP → ducto venoso).',
      'Nunca libere um laudo de ACM/RCP alterada em feto AIG, feito de forma apressada, sem repetir a medida — isso é causa comum de encaminhamentos desnecessários pra maternidade.',
    ]},
    explicar:'"Esse exame mostrou uma alteração num vaso do cérebro do bebê, mas isso só é preocupante quando o peso dele está abaixo do esperado. Como seu bebê está com o peso adequado, é bem provável que essa alteração tenha sido só um efeito momentâneo do próprio exame, e não um sinal de que ele está com falta de oxigênio. Vou reavaliar com calma antes de tirar qualquer conclusão."',
    pensando:'Meu bebê está sem oxigênio? Preciso fazer cesárea agora? Por que meu ultrassom anterior estava normal e agora mudou tão rápido?',
    confianca:'Explicar que peso fetal normal já reduz muito a chance de hipóxia real, e que a alteração pode ter sido só um reflexo passageiro do próprio exame, evita um susto desproporcional — e mostra que reavaliar com calma é conduta correta, não descaso.',
    aprendi:'Vejo com frequência esse relato de "alteração" da ACM ou da RCP virando parto por iatrogenia — principalmente quando o exame é feito correndo, sem tempo de reavaliar, e o laudo já sai liberado direto pra maternidade. Aprendi que, na grande maioria dos fetos AIG, essa alteração é só um reflexo transitório: o bebê comprimindo parte do cordão, ou a mão pesada do ultrassonografista pressionando demais o transdutor — principalmente quando a placenta é anterior — reduz o fluxo placentário por um momento, o bebê tem um reflexo vagal, e o cérebro dilata as artérias pra compensar. Isso não é hipóxia de verdade. Antes de mandar a "bomba" pra maternidade, vale a pena aliviar a pressão, esperar o bebê se mexer e repetir a medida com calma.',
    vocesabia:[
      'RCP (relação cérebro-placentária) = IP da ACM ÷ IP da artéria umbilical. Por isso, toda alteração da RCP deve ser interpretada junto com os dois vasos que a compõem, nunca isoladamente.',
      'ACM de baixa resistência só indica redistribuição de fluxo por hipóxia real quando o feto já tem outro motivo pra isso — insuficiência placentária, geralmente com peso abaixo do esperado. Num feto AIG, o mecanismo mais provável é técnico, não patológico.',
      'A causa mais comum de "alteração" transitória da ACM em feto AIG: compressão de parte do cordão pelo próprio bebê, ou pressão excessiva do transdutor sobre a placenta (mais frequente quando ela é anterior) — reduz o fluxo placentário momentaneamente, gera um reflexo vagal fetal, e o cérebro dilata as artérias para compensar. Isso se resolve sozinho ao aliviar a pressão e reavaliar.',
    ],
    encaminhar:'Encaminhar para pré-natal de alto risco / medicina fetal quando houver:<ul><li>ACM de baixa resistência ou RCP reduzida confirmada (após reavaliação da técnica) em feto PIG/CIUR</li><li>Alteração associada de Doppler de artéria umbilical</li><li>Dúvida se o achado é técnico ou verdadeiro em feto de peso limítrofe</li></ul>',
    aula:{titulo:'ACM de baixa resistência: quando é hipóxia de verdade e quando é técnica', pendente:true},
    referencias:[
      ['ISUOG Practice Guidelines (updated): use of Doppler velocimetry in obstetrics. Ultrasound Obstet Gynecol, 2021.', 'https://obgyn.onlinelibrary.wiley.com/doi/full/10.1002/uog.23698'],
      'Reflexo vagal fetal e vasodilatação cerebral transitória por compressão de cordão ou pressão do transdutor — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['doppler-introducao'],
  },
  {
    id:'grau-placenta',
    titulo:'Grau da placenta',
    modulo:'placenta',
    tags:['grau da placenta','classificação de grannum','calcificação placentária','maturação placentária','insuficiência placentária','síndrome antifosfolípide','saf'],
    essencial:'Antes do Doppler, o grau placentário era um dos poucos métodos para estimar o envelhecimento da placenta. Hoje o Doppler fetal é muito mais preciso para avaliar a função placentária — o grau vira achado de importância limitada quando isolado.',
    erro:'Indicar parto apenas porque o laudo descreve placenta grau III. O grau III não significa, por si só, que a placenta deixou de funcionar.',
    passo:{tipo:'checklist', itens:[
      'Correlacionar o grau placentário com a idade gestacional.',
      'Avaliar crescimento fetal e líquido amniótico.',
      'Se houver suspeita de insuficiência placentária, solicitar Doppler fetal.',
      'Nunca tomar decisões baseado apenas no grau da placenta.',
    ]},
    explicar:'"A placenta pode apresentar calcificações ao longo da gestação, principalmente no final da gravidez. Hoje sabemos que isso, isoladamente, não indica sofrimento fetal. O mais importante é avaliar como a placenta está funcionando, e isso é feito pelo Doppler e pelo crescimento do bebê."',
    pensando:'Minha placenta está velha? Meu bebê parou de receber alimento?',
    confianca:'"Hoje conseguimos avaliar diretamente a função da placenta, e não apenas sua aparência. Isso nos permite tomar decisões muito mais seguras para você e seu bebê."',
    aprendi:'Durante muito tempo, aprendemos a olhar para a calcificação da placenta. Hoje olhamos primeiro para o bebê. Se ele cresce bem e o Doppler está normal, a aparência da placenta perde grande parte da sua importância, mesmo se estiver muito calcificada (grau III).',
    vocesabia:['A classificação de Grannum foi criada em 1979, quando o Doppler obstétrico ainda não fazia parte da prática clínica. Na época, acreditava-se que uma placenta muito calcificada poderia indicar insuficiência placentária.'],
    historia:{
      titulo:'Antes do Doppler…',
      texto:'Na década de 1980, o obstetra tinha poucas ferramentas para avaliar a função placentária. O grau placentário, o líquido amniótico e o crescimento fetal eram as principais formas de estimar se a placenta estava envelhecendo. Com o desenvolvimento do Doppler da artéria umbilical, tornou-se possível avaliar a resistência da circulação placentária em tempo real, mudando completamente a forma de acompanhar as gestações de risco.',
    },
    encaminhar:'O grau placentário isoladamente não é indicação de encaminhamento. Encaminhe apenas se houver:<ul><li>Restrição de crescimento fetal</li><li>Alterações no Doppler</li><li>Oligodrâmnio</li><li>Doença hipertensiva materna</li></ul>',
    criterios:[
      {titulo:'Classificação de Grannum', itens:[
        ['Grau I','até 27 semanas'],
        ['Grau II','até 32 semanas'],
        ['Grau III','até 34 semanas'],
      ]},
      {titulo:'Quando suspeitar de maturação precoce', html:`
<div class="def-row"><div class="def-term">Regra geral</div><div class="def-desc">Quanto mais precoce o grau avançado, mais grave.</div></div>
<div class="def-row"><div class="def-term">Associação</div><div class="def-desc">CIUR (restrição de crescimento fetal).</div></div>
<div class="def-row"><div class="def-term">Doenças autoimunes</div><div class="def-desc">Síndrome antifosfolípide (SAF) pode causar maturação placentária muito precoce.</div></div>
<div class="def-row"><div class="def-term">Sinal de alerta</div><div class="def-desc">Grau III entre 22–30 semanas — suspeitar de causa autoimune / SAF.</div></div>`},
    ],
    aula:{titulo:'Grau da placenta: por que ele perdeu protagonismo para o Doppler', pendente:true},
    referencias:[
      ['Grannum PA, Berkowitz RL, Hobbins JC. "The ultrasonic changes in the maturing placenta and their relation to fetal pulmonic maturity." Am J Obstet Gynecol, 1979.', 'https://pubmed.ncbi.nlm.nih.gov/434036/'],
      'Síndrome antifosfolípide e maturação placentária precoce — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['placenta-baixa'],
  },
  {
    id:'vasa-previa',
    titulo:'Vasa prévia',
    modulo:'placenta',
    tags:['vasa prévia','inserção velamentosa','placenta bilobulada','placenta succenturiada','geleia de wharton','sangramento vaginal','ruptura de membranas','fertilização in vitro'],
    essencial:'Algumas alterações da placenta e da inserção do cordão aumentam significativamente o risco de vasa prévia. Sempre que uma delas estiver descrita no laudo, considere essa possibilidade e encaminhe a gestante para avaliação especializada.',
    erro:'Valorizar a inserção velamentosa ou uma placenta bilobulada apenas como um achado anatômico e esquecer que elas aumentam o risco de vasa prévia.',
    passo:{tipo:'checklist', itens:[
      'Manter o acompanhamento pré-natal normalmente até a confirmação diagnóstica.',
      'Se houver confirmação de vasa prévia, planejar o parto antes do início do trabalho de parto.',
      'Orientar a gestante a procurar atendimento imediatamente em caso de sangramento vaginal ou ruptura da bolsa.',
    ]},
    explicar:'"Encontramos uma característica da placenta que exige um acompanhamento mais cuidadoso. Na maioria das vezes a gestação evolui bem, mas precisamos confirmar se existem vasos do bebê próximos ao colo do útero, pois isso pode mudar o planejamento do parto."',
    pensando:'Meu bebê corre risco durante o parto?',
    confianca:'"Nem toda alteração da placenta representa um risco imediato. O mais importante é reconhecê-la a tempo para planejar a gestação e o parto da forma mais segura possível."',
    aprendi:'Sempre que vejo uma inserção velamentosa, uma placenta bilobulada ou um lobo acessório, faço a mesma pergunta: existe uma vasa prévia? Mais um motivo para realização do ultrassom transvaginal. Esse cuidado simples pode ser a diferença entre uma emergência obstétrica e um parto planejado com segurança.',
    vocesabia:[
      'O diagnóstico pré-natal da vasa prévia aumenta a sobrevida fetal de aproximadamente 44% para 97%, pois permite programar o parto antes da ruptura das membranas.',
      'Alterações associadas à vasa prévia:<ul><li><strong>Inserção velamentosa</strong> — o cordão umbilical não se insere diretamente na placenta, mas nas membranas; os vasos percorrem um trajeto sem proteção da geleia de Wharton antes de alcançar a placenta. Principal fator de risco para vasa prévia; também associada a maior risco de lesão hipóxico-isquêmica cerebral.</li><li><strong>Placenta bilobulada</strong> — a placenta é formada por dois lobos de tamanho semelhante, unidos por vasos fetais que podem cruzar o colo uterino e originar uma vasa prévia. Também aumenta o risco de retenção de restos placentários e hemorragia pós-parto.</li><li><strong>Placenta succenturiada</strong> — existe um lobo placentário acessório separado da placenta principal; os vasos que unem o lobo acessório à placenta principal também podem passar sobre o colo uterino.</li></ul>',
      'Tanto a inserção velamentosa quanto a inserção marginal ("em raquete") do cordão umbilical estão associadas a maior risco de restrição de crescimento intrauterino (CIUR) — reforça a importância de acompanhar o crescimento fetal nesses casos.',
      'Outros fatores de risco: placenta prévia ou de inserção baixa; fertilização in vitro.',
    ],
    encaminhar:'Encaminhar para pré-natal de alto risco / medicina fetal quando houver:<ul><li>Inserção velamentosa</li><li>Suspeita ou confirmação de vasa prévia</li><li>Placenta bilobulada ou succenturiada com suspeita de vasos fetais próximos ao colo</li><li>Dúvida diagnóstica no laudo ultrassonográfico</li></ul>',
    aula:{titulo:'Vasa prévia: quando suspeitar e como planejar o parto', pendente:true},
    referencias:[
      'ISUOG Practice Guidelines (updated): diagnosis and management of vasa previa. Ultrasound Obstet Gynecol, 2024.',
      'Vasa prévia: sobrevida fetal com diagnóstico pré-natal versus diagnóstico intraparto — referência específica pendente de indicação da autora.',
    ],
    vejaTambem:['placenta-baixa','arteria-umbilical-unica'],
  },
  {
    id:'datacao-gestacao',
    titulo:'Datação da gestação',
    modulo:'trimestre1',
    tags:['datação da gestação','idade gestacional','dpp','ccn','usg datador','dum','correção da idade gestacional','biometria fetal','acog','isuog'],
    essencial:'Ensinar como definir corretamente a idade gestacional e a DPP, qual exame utilizar em cada fase da gestação e quando a idade gestacional deve (ou não) ser corrigida.',
    erro:'<ul><li>Corrigir a idade gestacional toda vez que um novo ultrassom mostra uma diferença de alguns dias.</li><li>Usar sempre 7 dias como critério de discrepância — o limiar é 5 dias até 8+6 semanas, e só passa a ser 7 dias de 9+0 a 13+6 semanas.</li><li>Valorizar a DUM quando ela é incerta ou incompatível com um ultrassom precoce confiável.</li><li>Utilizar biometria do terceiro trimestre para redefinir a DPP.</li></ul>',
    passo:{tipo:'checklist', itens:[
      'Confirme a idade gestacional pelo USG mais precoce e de maior acurácia — idealmente entre 8 e 13 semanas + 6 dias (CCN).',
      'Se a DUM for confiável e compatível com o USG precoce, mantenha a idade gestacional pela DUM.',
      'Se o laudo tem IG pela DUM até 8+6 semanas e a diferença entre DUM e USG for de 5 dias ou mais, redate pelo USG.',
      'Se o laudo tem IG pela DUM entre 9+0 e 13+6 semanas e a diferença entre DUM e USG for de 7 dias ou mais, redate pelo USG.',
      'Depois de estabelecida, não corrija a idade gestacional por ultrassons de 2º/3º trimestre — eles servem para avaliar crescimento, não para redatar.',
    ]},
    explicar:'"Cada ultrassom mede o bebê naquele momento. No início da gravidez os bebês crescem quase no mesmo ritmo, por isso conseguimos estimar a idade gestacional com mais precisão. Depois, cada bebê passa a crescer de um jeito, então pequenas diferenças de tamanho não significam que a data da gestação mudou."',
    confianca:'Explique por que você está mantendo (ou corrigindo) a idade gestacional. Quando a gestante entende o motivo da decisão, ela tende a confiar mais no acompanhamento e evita comparar datas de diferentes ultrassons.',
    aprendi:'A melhor forma de evitar problemas no final da gestação é acertar a datação no começo. Muitos diagnósticos de restrição de crescimento, macrossomia ou gravidez prolongada desaparecem quando a idade gestacional está correta.',
    vocesabia:[
      'A idade gestacional definida pelo ultrassom do primeiro trimestre (idealmente entre 8 e 13 semanas + 6 dias) é mais precisa do que a DUM na maioria das pacientes e, depois de estabelecida, não deve ser modificada pelos ultrassons posteriores, exceto em situações especiais.',
      'Critérios de datação gestacional pela ACOG:<ul><li>Até 13+6 sem, por CCN — discrepância US×DUM ≥5 dias até 8+6 sem, ≥7 dias de 9+0 a 13+6 sem.</li><li>14+0 a 15+6 sem, por DBP/CC/CA/CF — discrepância ≥7 dias.</li><li>16+0 a 21+6 sem, por DBP/CC/CA/CF — discrepância ≥10 dias.</li><li>22+0 a 27+6 sem, por DBP/CC/CA/CF — discrepância ≥14 dias.</li><li>28+0 sem até o termo, por DBP/CC/CA/CF — discrepância ≥21 dias.</li></ul>A data da gestação deve ser sempre baseada no USG mais precoce e de maior acurácia.',
    ],
    perolas:[
      'A maioria dos erros de crescimento fetal começa com uma datação incorreta.',
      'Um erro de apenas 5 a 7 dias na datação pode levar a diagnósticos equivocados de restrição de crescimento, macrossomia ou pós-datismo.',
      'O ultrassom do segundo ou terceiro trimestre é excelente para avaliar crescimento, mas muito menos preciso para datar a gestação.',
    ],
    eAgora:[
      'DUM confiável + USG precoce compatível → mantenha a IG.',
      'IG pela DUM até 8+6 semanas + diferença DUM×USG ≥5 dias → redate pelo USG.',
      'IG pela DUM entre 9+0 e 13+6 semanas + diferença DUM×USG ≥7 dias → redate pelo USG.',
      'Diferenças em ultrassons tardios → não altere a DPP apenas pelo crescimento fetal.',
      'Se houver dúvida sobre qual data manter, consulte os critérios da ACOG/ISUOG para redatação.',
    ],
    aula:{titulo:'Quando devo corrigir a idade gestacional?', pendente:true},
    referencias:[
      ['ACOG Committee Opinion No. 700 — Methods for Estimating the Due Date. Obstet Gynecol, 2017 (reafirmado).', 'https://pubmed.ncbi.nlm.nih.gov/28426621/'],
      'ISUOG Practice Guidelines: performance of first-trimester fetal ultrasound scan (datação gestacional). Ultrasound Obstet Gynecol, 2023.',
    ],
    vejaTambem:['morfologico-1trimestre','percentil8'],
  },
  {
    id:'onfalocele-gastrosquise',
    titulo:'Onfalocele × gastrosquise',
    modulo:'malformacoes',
    tags:['onfalocele','gastrosquise','defeito de parede abdominal','alfafetoproteína','trissomia 13','trissomia 18','beckwith-wiedemann','cariótipo fetal','ecocardiograma fetal'],
    essencial:'Os dois são defeitos da parede abdominal com AFP materna elevada, mas têm prognóstico e conduta muito diferentes. O que diferencia: <strong>onfalocele</strong> — defeito na própria inserção do cordão, conteúdo (alças, muitas vezes fígado) coberto por uma membrana (saco); <strong>gastrosquise</strong> — defeito ao lado do cordão (geralmente à direita), sem membrana, alças flutuando livres no líquido amniótico.',
    erro:'Tratar as duas condições com a mesma conduta. Onfalocele tem associação forte com aneuploidias (trissomias 13 e 18) e síndromes (Beckwith-Wiedemann) — pede cariótipo e ecocardiograma fetal. Gastrosquise, na grande maioria das vezes, é um achado isolado, sem aumento relevante de risco de aneuploidia — oferecer investigação genética extensa sem motivo aumenta a ansiedade da gestante à toa.',
    passo:{tipo:'checklist', itens:[
      'Confirme o achado central: existe uma membrana cobrindo o conteúdo herniado (onfalocele) ou as alças estão livres no líquido amniótico, sem cobertura (gastrosquise)?',
      'Verifique a posição do cordão: insere no próprio defeito/ápice do saco (onfalocele) ou está normalmente inserido, com o defeito ao lado — geralmente à direita (gastrosquise)?',
      'Onfalocele: reforce a anatomia fetal completa, peça ecocardiograma fetal e ofereça cariótipo/microarray — associação relevante com trissomias 13 e 18 e com Beckwith-Wiedemann.',
      'Gastrosquise: geralmente é achado isolado — acompanhe o crescimento fetal (associação com PIG/RCF) e o aspecto das alças (espessamento, dilatação) com ultrassons seriados.',
      'Programe o parto em centro terciário com cirurgia pediátrica disponível — nos dois casos, mas principalmente na gastrosquise, pelo risco de complicações intestinais (atresia, vólvulo) e de óbito fetal tardio.',
    ]},
    explicar:'"O ultrassom mostrou que uma parte do intestino do bebê está se formando fora da barriga. Isso tem um nome e uma explicação técnica, e o mais importante agora é entender exatamente qual tipo é esse, porque isso muda os próximos exames e o acompanhamento."',
    pensando:'Meu bebê vai precisar de cirurgia assim que nascer? Isso é grave? Foi algo que eu fiz errado na gravidez?',
    confianca:'Explicar que os dois defeitos têm nomes diferentes por causa da aparência ao ultrassom (com ou sem membrana cobrindo), e que essa diferença é exatamente o que muda a investigação e o prognóstico, ajuda a paciente a entender por que o próximo passo não é igual para todo mundo com "um problema na barriga do bebê".',
    aprendi:'Gastrosquise e onfalocele assustam igual na hora que a paciente ouve o nome, mas pedem conversas bem diferentes. Aprendi que a primeira coisa a explicar não é o defeito em si, e sim se tem "capinha" cobrindo ou não — porque é isso que muda toda a investigação depois, e evita que uma mãe com gastrosquise isolada saia da consulta com o mesmo medo de síndrome genética que uma com onfalocele.',
    vocesabia:[
      'Os dois elevam a alfafetoproteína (AFP) materna — não adianta usar a AFP sozinha pra diferenciar; o ultrassom (membrana + posição do cordão) é quem faz o diagnóstico.',
      'A gastrosquise costuma ser mais associada a mães mais jovens, diferente da onfalocele, que não tem esse padrão etário.',
      'Onfalocele "gigante" (com fígado herniado) tem, paradoxalmente, menor risco de aneuploidia do que onfalocele pequena com só alças intestinais — vale considerar o tamanho do defeito na hora de conversar sobre risco.',
    ],
    encaminhar:'Encaminhar para pré-natal de alto risco / medicina fetal em todos os casos, e programar o parto em centro terciário com cirurgia pediátrica disponível. Priorize a avaliação com urgência quando houver:<ul><li>Onfalocele com suspeita de cardiopatia ou outra malformação associada</li><li>Gastrosquise com alças muito dilatadas, espessadas ou sinais de sofrimento intestinal</li><li>Restrição de crescimento fetal associada</li><li>Oligoidrâmnio ou outros sinais de complicação</li></ul>',
    aula:{titulo:'Onfalocele × gastrosquise: como diferenciar e o que muda na conduta', pendente:true},
    referencias:[
      ['Khalil A et al. "Outcome of fetal exomphalos diagnosed at 11–14 weeks of gestation." Ultrasound Obstet Gynecol, 2012.', 'https://obgyn.onlinelibrary.wiley.com/doi/full/10.1002/uog.10048'],
      ['European Reference Network for Rare Inherited Congenital Anomalies (ERNICA) evidence-based guideline on the management of gastroschisis. Orphanet J Rare Dis, 2024.', 'https://doi.org/10.1186/s13023-024-03062-8'],
    ],
    vejaTambem:[],
  },
];


export type Modulo = { id: string; nome: string; icon: string };
export type Tema = typeof TEMAS[number];

export { MODULOS, TEMAS };
