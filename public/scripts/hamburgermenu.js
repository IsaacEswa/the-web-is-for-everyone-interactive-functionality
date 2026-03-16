// ----- SIDEBAR FOCUS TRAP -----
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-icon');

function showSidebar() {
    sidebar.classList.add('open');
    sidebar.setAttribute("aria-hidden", "false");

    // pak alle focusbare elementen in de sidebar
    const focusable = sidebar.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusable[0];
    const lastFocusableElement = focusable[focusable.length - 1];

    // Focus gaat naar de close button
    firstFocusableElement.focus();

    // Trap focus inside sidebar
    sidebar.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            if (e.shiftKey) {
                // Shift+Tab van eerste element → ga naar laatste
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                // Tab van laatste element → ga naar eerste
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }

        // Escape sluit menu
        if (e.key === "Escape") {
            hideSidebar();
        }
    });
}

function hideSidebar() {
    sidebar.classList.remove('open');
    sidebar.setAttribute("aria-hidden", "true");
    closeBtn.blur();
}


console.log('hamburger menu script loaded');