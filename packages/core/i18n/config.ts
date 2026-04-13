import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import ptBR from "./locales/pt-BR";

export const defaultNS = "translation";

export const resources = {
  en: { translation: en },
  "pt-BR": { translation: ptBR },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "pt-BR",
  fallbackLng: "en",
  defaultNS,
  interpolation: { escapeValue: false },
});

export default i18n;
