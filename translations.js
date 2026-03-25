const translations = {
    it: {
        hub_tagline: "Ecosistema Integrato di Dati Finanziari",
        hub_forex_sub: "Mercato dei Cambi",
        hub_stocks_sub: "Mercati Azionari Mondiali",
        hub_comm_sub: "Prezzi delle Materie Prime",
        hub_cryptos_sub: "Criptovalute",
        hub_footer: "© 2026 MARKET MONITOR - Hub di Trading Specializzato",
        hub_tools: "Strumenti",
        hub_privacy: "Privacy",
        mod_theme: "Tema App",
        mod_theme_light: "Chiaro",
        mod_theme_dark: "Scuro",
        mod_access: "Condividi Accesso",
        mod_pwd: "Password Accesso",
        mod_duration: "Durata Accesso",
        mod_gen: "Genera Link",
        mod_copy: "Copia Link"
    },
    en: {
        hub_tagline: "Integrated Financial Data Ecosystem",
        hub_forex_sub: "Foreign Exchange Market",
        hub_stocks_sub: "World Stock Markets",
        hub_comm_sub: "Commodities Prices",
        hub_cryptos_sub: "World Crypto currencies",
        hub_footer: "© 2026 MARKET MONITOR - Specialized Trading Hub",
        hub_tools: "Tools",
        hub_privacy: "Privacy",
        mod_theme: "App Theme",
        mod_theme_light: "Light",
        mod_theme_dark: "Dark",
        mod_access: "Share Access",
        mod_pwd: "Access Password",
        mod_duration: "Access Duration",
        mod_gen: "Generate Link",
        mod_copy: "Copy Link"
    },
    fr: {
        hub_tagline: "Écosystème Intégré de Données Financières",
        hub_forex_sub: "Marché des Changes",
        hub_stocks_sub: "Marchés Boursiers Mondiaux",
        hub_comm_sub: "Prix des Matières Premières",
        hub_cryptos_sub: "Cryptomonnaies",
        hub_footer: "© 2026 MARKET MONITOR - Hub de Trading Spécialisé",
        hub_tools: "Outils",
        hub_privacy: "Confidentialité",
        mod_theme: "Thème de l'App",
        mod_theme_light: "Clair",
        mod_theme_dark: "Sombre",
        mod_access: "Partager l'Accès",
        mod_pwd: "Mot de passe d'accès",
        mod_duration: "Durée d'accès",
        mod_gen: "Générer le lien",
        mod_copy: "Copier le lien"
    }
};

let currentLanguage = localStorage.getItem('app_language') || 'it';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('app_language', lang);
    applyTranslations();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
}

function applyTranslations() {
    const texts = translations[currentLanguage];
    if (!texts) return;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'password')) {
                el.placeholder = texts[key];
            } else {
                el.innerHTML = texts[key];
            }
        }
    });

    const titleElements = document.querySelectorAll('[data-i18n-title]');
    titleElements.forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (texts[key]) {
            el.title = texts[key];
        }
    });

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(`'${currentLanguage}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    document.documentElement.lang = currentLanguage;
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
});

window.addEventListener('storage', (e) => {
    if (e.key === 'app_language' && e.newValue) {
        currentLanguage = e.newValue;
        applyTranslations();
    }
});
