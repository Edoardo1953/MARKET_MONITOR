document.addEventListener('DOMContentLoaded', () => {
    const toolsBtn = document.getElementById('toolsBtn');
    const toolsModal = document.getElementById('toolsModal');
    const closeModal = document.querySelector('.close-modal');
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const body = document.body;

    // Toggle Modal
    if (toolsBtn) {
        toolsBtn.addEventListener('click', () => {
            toolsModal.classList.remove('hidden');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            toolsModal.classList.add('hidden');
        });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (toolsModal && e.target === toolsModal) {
            toolsModal.classList.add('hidden');
        }
    });

    // Theme Switch Logic
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateThemeUI(newTheme);
        });
    }

    function updateThemeUI(theme) {
        if (themeToggle && themeLabel) {
            if (theme === 'light') {
                themeLabel.setAttribute('data-i18n', 'mod_theme_light');
                themeToggle.querySelector('i').className = 'fa-solid fa-sun';
                themeToggle.style.color = '#f59e0b';
                themeToggle.style.borderColor = '#f59e0b';
            } else {
                themeLabel.setAttribute('data-i18n', 'mod_theme_dark');
                themeToggle.querySelector('i').className = 'fa-solid fa-moon';
                themeToggle.style.color = '#3b82f6';
                themeToggle.style.borderColor = '#3b82f6';
            }
            if (typeof applyTranslations === 'function') applyTranslations();
        }
    }

    // Init theme from storage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    // --- PRIVACY & ACCESS LOGIC ---

    const privacyBtn = document.getElementById('privacyBtn');
    const privacyOverlay = document.getElementById('privacyOverlay');
    const closePrivacy = document.querySelector('.close-privacy');
    const generateLinkBtn = document.getElementById('generateLinkBtn');
    const loginBtn = document.getElementById('btnLogin');
    const pwdInput = document.getElementById('accessPasswordInput');
    const errorMsg = document.getElementById('accessError');

    function togglePrivacy(show) {
        if (!privacyOverlay) return;
        if (show) {
            privacyOverlay.classList.remove('hidden');
        } else {
            privacyOverlay.classList.add('hidden');
        }
    }

    if (privacyBtn) {
        privacyBtn.addEventListener('click', () => togglePrivacy(true));
    }

    if (closePrivacy) {
        closePrivacy.addEventListener('click', () => togglePrivacy(false));
    }

    // Close privacy on outside click
    window.addEventListener('click', (e) => {
        if (privacyOverlay && e.target === privacyOverlay) {
            togglePrivacy(false);
        }
    });

    // Sharing logic
    window.generateShareLink = function() {
        const password = document.getElementById('sharePassword').value;
        const months = parseInt(document.getElementById('shareExpiry').value);
        
        if (!password) {
            alert("Inserisci una password per proteggere il link.");
            return;
        }

        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + months);
        
        const payload = `${expiryDate.toISOString()}|MARKET_MONITOR_ACCESS`;
        const token = xorEncrypt(payload, password);
        
        const baseUrl = window.location.href.split('?')[0].split('#')[0];
        const shareUrl = `${baseUrl}?t=${token}`;
        
        const resultDiv = document.getElementById('shareLinkResult');
        const resultInput = document.getElementById('shareLinkInput');
        
        resultInput.value = shareUrl;
        resultDiv.classList.remove('hidden');
    };

    window.copyShareLink = function() {
        const input = document.getElementById('shareLinkInput');
        input.select();
        input.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(input.value);
        alert("Link copiato negli appunti!");
    };

    // Access Prompt
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('t');
    if (token) {
        const accessOverlay = document.getElementById('accessOverlay');
        if (accessOverlay) {
            accessOverlay.classList.remove('hidden');
            
            if (loginBtn) {
                loginBtn.onclick = () => {
                    const password = pwdInput.value;
                    const verification = verifyAccessToken(token, password);
                    
                    if (!verification) {
                        errorMsg.textContent = "Password non valida.";
                        errorMsg.classList.remove('hidden');
                    } else if (verification.expired) {
                        errorMsg.textContent = "Accesso scaduto.";
                        errorMsg.classList.remove('hidden');
                    } else {
                        // Success!
                        accessOverlay.classList.add('hidden');
                        // Store the grant in localStorage? 
                        // Actually the user might want it to persist. 
                        // But for now, we just clean the URL.
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }
                };
            }

            if (pwdInput) {
                pwdInput.onkeypress = (e) => {
                    if (e.key === 'Enter') loginBtn.click();
                };
            }
        }
    }

    // Helper functions (Minified/Simplified from Forex version)
    function xorEncrypt(text, key) {
        if (!key) return btoa(text);
        let result = "";
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return btoa(unescape(encodeURIComponent(result)));
    }

    function xorDecrypt(encoded, key) {
        if (!key) return atob(encoded);
        try {
            let text = decodeURIComponent(escape(atob(encoded)));
            let result = "";
            for (let i = 0; i < text.length; i++) {
                result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return result;
        } catch (e) {
            return null;
        }
    }

    function verifyAccessToken(token, password) {
        const decrypted = xorDecrypt(token, password);
        if (!decrypted) return null;
        const parts = decrypted.split('|');
        if (parts.length !== 2) return null;
        
        // Support both new global and old Forex tokens
        if (parts[1] !== "MARKET_MONITOR_ACCESS" && parts[1] !== "FOREX_ACCESS") return null;
        
        const exp = new Date(parts[0]);
        if (isNaN(exp.getTime())) return null;
        return {
            expired: exp < new Date(),
            expiry: exp
        };
    }
});
