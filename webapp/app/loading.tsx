// Cobre visualmente a espera de HomePage (app/page.tsx) enquanto ela decide
// pra onde redirecionar — sem isso, a tela fica branca até a resposta
// chegar. Mesmo visual da splash em app/app/page.tsx, pra não haver troca
// de tela perceptível entre as duas.
export default function Loading() {
  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '0 32px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #9585E8, #5B4BB8)',
      }}
    >
      <img src="/icon-hero.png" alt="" style={{ width: 260, height: 'auto', marginBottom: 8 }} />
      <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Guia Digital do Obstetra</div>
      <div style={{ color: 'rgba(255,255,255,.85)', fontSize: 13 }}>Sua mentoria digital em ultrassom fetal</div>
    </div>
  );
}
