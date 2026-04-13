import { loginAction } from "core/actions/login/login.action";
import { resources } from "core/i18n";
import { LoginPageForm } from "./_partials/login-page-form";

const t = resources["pt-BR"].translation.auth;

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
