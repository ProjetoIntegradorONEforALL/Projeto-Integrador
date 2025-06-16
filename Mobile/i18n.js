import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importando arquivos separados por namespace
import home_en from "./locales/en/settings.json";
import alerts_en from "./locales/en/alerts.json";

import home_es from "./locales/es/settings.json";
import alerts_es from "./locales/es/alerts.json";

import home_pt from "./locales/pt/settings.json";
import alerts_pt from "./locales/pt/alerts.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en: {
      home: home_en,
      alerts: alerts_en,
    },
    es: {
      home: home_es,
      alerts: alerts_es,
    },
    pt: {
      home: home_pt,
      alerts: alerts_pt,
    },
  },
  lng: "pt", // idioma padrão
  fallbackLng: "pt",
  defaultNS: "home", // namespace padrão
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
