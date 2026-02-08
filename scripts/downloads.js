(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('driverModal');
        const closeBtn = document.querySelector('.modal-close');
        const windowsCards = document.querySelectorAll('.download-card[data-os]');
        const genericOption = document.getElementById('genericDriver');
        const specialOption = document.getElementById('specialDriver');
        let selectedOS = '';

        if (!modal) return;

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        windowsCards.forEach(card => {
            card.addEventListener('click', function() {
                selectedOS = this.getAttribute('data-os');
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

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

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeModal();
            }
        });

        const urlParams = new URLSearchParams(window.location.search);
        const osParam = urlParams.get('os');
        if (osParam && (osParam === 'windows11' || osParam === 'windows10')) {
            selectedOS = osParam;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({path: cleanUrl}, '', cleanUrl);
        }
    });
})();
