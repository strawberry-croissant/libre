/**
 * Downloads Page Scripts: Driver Selection Modal
 */
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('driverModal');
        const closeBtn = document.querySelector('.modal-close');
        const windowsCards = document.querySelectorAll('.download-card[data-os]');
        const genericOption = document.getElementById('genericDriver');
        const specialOption = document.getElementById('specialDriver');
        let selectedOS = '';

        if (!modal) return;

        /**
         * Closes the active modal and restores scrolling
         */
        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        // Show modal when Windows download card is clicked
        windowsCards.forEach(card => {
            card.addEventListener('click', function() {
                selectedOS = this.getAttribute('data-os');
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Handle driver selection
        if (genericOption) {
            genericOption.addEventListener('click', () => {
                if (selectedOS) {
                    window.location.href = `/os-details/?os=${selectedOS}&driver=generic`;
                }
            });
        }

        if (specialOption) {
            specialOption.addEventListener('click', () => {
                if (selectedOS) {
                    window.location.href = `/os-details/?os=${selectedOS}&driver=special`;
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });

        // Auto-open modal if 'os' param is present
        const urlParams = new URLSearchParams(window.location.search);
        const osParam = urlParams.get('os');
        if (osParam && (osParam === 'windows11' || osParam === 'windows10')) {
            selectedOS = osParam;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Clean up URL without refreshing so modal doesn't re-open on back/refresh
            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({path: cleanUrl}, '', cleanUrl);
        }
    });
})();
