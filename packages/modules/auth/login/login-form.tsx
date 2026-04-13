import { loginAction } from "core/actions/login/login.action";
import ptBR from "core/i18n/locales/pt-BR";
import { LoginPageForm } from "./_partials/login-page-form";

const t = ptBR.auth;

export function LoginForm() {
  return (
    <LoginPageForm
      action={loginAction}
      emailLabel={t.email}
      emailPlaceholder={t.emailPlaceholder}
      passwordLabel={t.password}
      passwordPlaceholder={t.passwordPlaceholder}
      submitLabel={t.submit}
    />
  );
}
