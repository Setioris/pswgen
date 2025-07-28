/**
 * Main application script handling navigation, theme toggling, and cookie management
 */

document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Navigation between tools
    const navButtons = document.querySelectorAll('.nav-btn');
    const toolSections = document.querySelectorAll('.tool-section');

    // Theme toggle elements
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Cookie consent elements
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');

    // Initialize cookie consent
    function initializeCookieConsent() {
        const consentGiven = Cookie.get('cookieConsent');
        if (consentGiven === 'true') {
            cookieConsent.classList.add('hidden');
            initializeTheme();
            initializeActiveTool();
        } else if (consentGiven === 'false') {
            cookieConsent.classList.add('hidden');
            // Don't initialize preferences if cookies declined
            document.body.removeAttribute('data-theme');
            toolSections[0].classList.add('active');
            navButtons[0].classList.add('active');
        } else {
            // Show consent banner if no preference set
            cookieConsent.classList.remove('hidden');
        }
    }

    // Initialize theme from cookies
    function initializeTheme() {
        const theme = Cookie.get('theme');
        const systemDark = prefersDarkScheme.matches;

        if (theme === 'dark' || (!theme && systemDark)) {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Toggle Light Mode';
        } else {
            document.body.removeAttribute('data-theme');
            themeToggle.textContent = 'Toggle Dark Mode';
        }
    }

    // Initialize active tool from cookies
    function initializeActiveTool() {
        const savedTool = Cookie.get('activeTool');
        if (savedTool) {
            const toolButton = document.querySelector(`.nav-btn[data-target="${savedTool}"]`);
            if (toolButton) {
                toolButton.click();
                return;
            }
        }
        // Fallback to first tool
        toolSections[0].classList.add('active');
        navButtons[0].classList.add('active');
    }

    // Set up navigation
    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');

            // Update active state
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show selected section
            toolSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });

            // Save to cookie if consented
            if (Cookie.get('cookieConsent') === 'true') {
                Cookie.set('activeTool', targetId, 30);
            }
        });
    });

    // Set up theme toggle
    themeToggle.addEventListener('click', function () {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            themeToggle.textContent = 'Toggle Dark Mode';
            if (Cookie.get('cookieConsent') === 'true') {
                Cookie.set('theme', 'light', 30);
            }
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Toggle Light Mode';
            if (Cookie.get('cookieConsent') === 'true') {
                Cookie.set('theme', 'dark', 30);
            }
        }
    });

    // Set up cookie consent buttons
    acceptCookies.addEventListener('click', function () {
        Cookie.set('cookieConsent', 'true', 365);
        cookieConsent.classList.add('hidden');
        initializeTheme();
        initializeActiveTool();
    });

    declineCookies.addEventListener('click', function () {
        Cookie.set('cookieConsent', 'false', 365);
        cookieConsent.classList.add('hidden');
        Cookie.erase('theme');
        Cookie.erase('activeTool');
        document.body.removeAttribute('data-theme');
        themeToggle.textContent = 'Toggle Dark Mode';
    });

    // Firefox-specific adjustments
    if (navigator.userAgent.toLowerCase().includes('firefox')) {
        document.documentElement.classList.add('firefox');
    }

    // Initialize everything
    initializeCookieConsent();
});