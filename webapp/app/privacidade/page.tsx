import type { Metadata } from 'next';
import Link from 'next/link';
import './privacidade.css';

export const metadata: Metadata = {
  title: 'Política de Privacidade — Guia Digital do Obstetra',
};

export default function PrivacidadePage() {
  return (
    <div className="privacy-shell">
      <div className="privacy-card">
        <Link href="/login" className="privacy-back">← Voltar</Link>
        <h1 className="privacy-title">Política de Privacidade</h1>
        <p className="privacy-updated">Última atualização: setembro de 2026</p>

        <p>
          O Guia Digital do Obstetra é um app de acesso pago para obstetras. Esta página
          explica, de forma simples, quais dados coletamos de quem cria uma conta, para que
          usamos e como você pode solicitar acesso, correção ou exclusão deles, em conformidade
          com a Lei Geral de Proteção de Dados (LGPD).
        </p>

        <h2>Quais dados coletamos</h2>
        <ul>
          <li>
            <strong>Cadastro por e-mail e senha:</strong> o e-mail informado e a senha, que é
            armazenada de forma criptografada (nunca em texto puro) pelo nosso provedor de
            autenticação.
          </li>
          <li>
            <strong>Login com Google:</strong> nome, e-mail e foto de perfil que o próprio
            Google compartilha conosco quando você escolhe &quot;Continuar com Google&quot;.
            Não temos acesso à sua senha do Google.
          </li>
          <li>
            <strong>Dado da compra:</strong> o e-mail usado na compra do acesso (processada pela
            Kiwify), para confirmar automaticamente que sua conta tem uma licença ativa.
          </li>
        </ul>
        <p>Não coletamos nenhum outro dado — não usamos cookies de rastreamento nem ferramentas de analytics de terceiros.</p>

        <h2>Para que usamos esses dados</h2>
        <ul>
          <li>Autenticar seu login e manter sua sessão conectada com segurança.</li>
          <li>Verificar se o e-mail da sua conta corresponde a uma compra ativa e liberar o conteúdo.</li>
          <li>Enviar e-mails operacionais, como a confirmação de cadastro.</li>
        </ul>
        <p>Não usamos seus dados para publicidade, e não fazemos nenhum tipo de perfil de comportamento.</p>

        <h2>Com quem compartilhamos</h2>
        <p>
          Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing. Os
          dados ficam armazenados em nosso banco de dados (Supabase) e a confirmação de compra é
          feita junto à plataforma de pagamento (Kiwify), apenas para checar se a licença está
          ativa.
        </p>

        <h2>Cookies</h2>
        <p>
          Usamos apenas um cookie estritamente necessário para manter você conectado(a) depois do
          login. Ele não é usado para rastreamento nem publicidade.
        </p>

        <h2>Por quanto tempo guardamos seus dados</h2>
        <p>
          Enquanto sua conta existir. Se você pedir a exclusão da conta, apagamos seus dados de
          cadastro em até 30 dias, salvo obrigação legal de retenção (por exemplo, registros
          fiscais da compra).
        </p>

        <h2>Seus direitos</h2>
        <p>
          Você pode pedir a qualquer momento para acessar, corrigir ou excluir seus dados, ou
          tirar dúvidas sobre este texto, escrevendo para{' '}
          <a href="mailto:kummermorg@gmail.com">kummermorg@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
