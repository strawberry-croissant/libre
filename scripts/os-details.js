(() => {
    const showDownloadComplete = () => {
        const toast = document.createElement('div');
        toast.className = 'download-toast';
        toast.innerHTML = `
            <div>
                Done downloading.<br>
                <span class="text-mini">Check your Downloads folder and read the README.</span>
            </div>
        `;
        
        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                .download-toast {
                    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
                    background: linear-gradient(135deg, var(--accent-color), #30d158);
                    color: white; padding: 16px 28px; border-radius: 12px;
                    font-weight: 600; font-size: 16px; z-index: 10000;
                    box-shadow: 0 8px 32px rgba(41, 151, 255, 0.3);
                    animation: slideUp 0.4s ease-out; text-align: center;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.4s ease-out forwards';
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    };

    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const osKey = urlParams.get('os');
        const driverType = urlParams.get('driver') || 'generic';

        const config = (window.OS_CONFIG && window.OS_CONFIG[osKey]) ? window.OS_CONFIG[osKey] : null;

        if (!config) {
            console.warn(`[Libre] No config found for OS: "${osKey}".`);
            if (!osKey) {
                window.location.href = '/downloads';
                return;
            }
        }

        document.title = `Libre - ${config.title}`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', config.metaDescription);

        const titleEl = document.getElementById('detailsTitle');
        const descEl = document.getElementById('detailsDescription');
        const btnGroup = document.getElementById('detailsBtnGroup');

        if (titleEl) {
            titleEl.innerHTML = `
                <div class="os-icon-details">${config.icon}</div>
                ${config.title}
            `;
        }

        if (!document.getElementById('details-icon-styles')) {
            const style = document.createElement('style');
            style.id = 'details-icon-styles';
            style.textContent = `
                .os-icon-details {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    margin-bottom: 20px;
                    border-radius: 12px;
                    background: rgba(128, 128, 128, 0.1);
                    color: var(--accent-color);
                }
                .os-icon-details svg {
                    width: 32px;
                    height: 32px;
                }
                .spoiler {
                    background: #2f3136;
                    color: transparent;
                    border-radius: 3px;
                    padding: 0 4px;
                    cursor: pointer;
                    transition: background 0.2s ease, color 0.2s ease;
                    user-select: none;
                }
                .spoiler.revealed {
                    background: rgba(255, 255, 255, 0.1);
                    color: inherit;
                    cursor: text;
                    user-select: text;
                }
                .menu-hidden { 
                    display: grid;
                    grid-template-rows: 0fr;
                    opacity: 0;
                    overflow: hidden;
                    transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
                }
                .menu-hidden > div {
                    min-height: 0;
                }
                .menu-visible { 
                    grid-template-rows: 1fr !important;
                    opacity: 1 !important;
                    margin-top: 10px;
                }
                .btn-iso {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 16px;
                    background: rgba(128, 128, 128, 0.08);
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    color: var(--text-color);
                    font-size: 15px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    text-align: left;
                    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Satoshi", "Helvetica Neue", "Helvetica", sans-serif !important;
                    width: 100%;
                    margin-bottom: 8px;
                    cursor: pointer;
                    font-weight: 500;
                }
                .btn-iso:hover {
                    background: rgba(128, 128, 128, 0.15);
                }
                .dropdown-arrow {
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    opacity: 0.8;
                }
                .rotate-arrow {
                    transform: rotate(180deg);
                }
                .download-selection-container {
                    animation: revealDropdown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                @keyframes revealDropdown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .custom-dropdown {
                    position: relative;
                    width: 100%;
                }
                .dropdown-trigger {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 12px 18px;
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    cursor: pointer;
                    font-size: 15px;
                    transition: all 0.2s ease;
                    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Satoshi", "Helvetica Neue", "Helvetica", sans-serif !important;
                    font-weight: 500;
                }
                .dropdown-trigger:hover {
                    border-color: var(--accent-color);
                }
                .dropdown-content {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    margin-top: 8px;
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    overflow: hidden;
                    z-index: 100;
                    display: grid;
                    grid-template-rows: 0fr;
                    opacity: 0;
                    visibility: hidden;
                    transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, visibility 0.4s;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                }
                .dropdown-content.open {
                    grid-template-rows: 1fr;
                    opacity: 1;
                    visibility: visible;
                }
                .dropdown-inner {
                    min-height: 0;
                }
                .dropdown-item {
                    padding: 14px 18px;
                    cursor: pointer;
                    transition: background 0.2s;
                    font-size: 14px;
                    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Satoshi", "Helvetica Neue", "Helvetica", sans-serif !important;
                }
                .dropdown-item:hover {
                    background: rgba(128, 128, 128, 0.1);
                }
                .dropdown-item.selected {
                    background: rgba(41, 151, 255, 0.12);
                    color: var(--accent-color);
                    font-weight: 600;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('spoiler')) {
                if (osKey === 'mac') {
                    alert('To view full development logs or contribute, you must contact us and apply to be a developer.');
                }
            }
        });

        if (config.isComingSoon) {
            if (titleEl) titleEl.textContent = 'Coming Soon';
            if (descEl) descEl.innerHTML = config.description;
            if (btnGroup) btnGroup.classList.add('hidden');
            return;
        }

        let currentDesc = config.description;
        let currentAssetsLink = config.assetsLink;
        let currentIsoLink = config.isoLink;
        let driverInfoHtml = '';

        if (config[driverType]) {
            const dConfig = config[driverType];
            currentDesc = dConfig.description;
            currentAssetsLink = dConfig.link;
            currentIsoLink = dConfig.isoLink;

            const rocketSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5zm1.5 4h-3l-2.5 6h3l-1.5 6 5.5-8h-3l2.5-4z"/></svg>`;
            const scaleSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>`;
            
            const icon = driverType === 'special' ? rocketSvg : scaleSvg;
            const bgStyle = `background: color-mix(in srgb, var(--accent-color), transparent ${driverType === 'special' ? '90%' : '95%'});`;

            driverInfoHtml = `
                <div class="driver-info" style="margin-top:15px; padding:12px; ${bgStyle} border-radius:12px; border:1px solid rgba(128,128,128,0.1); text-align:left; font-size:13px; display:flex; gap:10px; align-items:center;">
                    <div style="display: flex; align-items: center; color: var(--accent-color);">${icon}</div>
                    <div>
                        <strong style="color:var(--text-color); display:block; margin-bottom:2px;">${dConfig.name}</strong>
                        <span style="color:var(--text-secondary);">${dConfig.info}</span>
                    </div>
                </div>
            `;
        }

        if (descEl) {
            descEl.innerHTML = currentDesc + driverInfoHtml;
        }

        if (btnGroup) {
            btnGroup.innerHTML = '';
            
            if (currentAssetsLink) {
                if (driverType === 'special' && LIBRE_CONFIG.SERIALS && LIBRE_CONFIG.SERIALS.length > 0) {
                    const container = document.createElement('div');
                    container.className = 'download-selection-container';
                    const arrowIcon = `<span class="dropdown-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span>`;

                    const customDropdown = document.createElement('div');
                    customDropdown.className = 'custom-dropdown';

                    const trigger = document.createElement('div');
                    trigger.className = 'dropdown-trigger';
                    trigger.innerHTML = `<span>Select your Serial Number</span> ${arrowIcon}`;

                    const content = document.createElement('div');
                    content.className = 'dropdown-content';
                    const inner = document.createElement('div');
                    inner.className = 'dropdown-inner';

                    const downloadBtn = document.createElement('a');
                    downloadBtn.className = 'btn btn-primary disabled';
                    downloadBtn.textContent = 'Download Optimized Driver';
                    downloadBtn.style.opacity = '0.5';
                    downloadBtn.style.pointerEvents = 'none';
                    downloadBtn.href = '#';

                    LIBRE_CONFIG.SERIALS.forEach(serial => {
                        const item = document.createElement('div');
                        item.className = 'dropdown-item';
                        item.textContent = serial.label;
                        item.addEventListener('click', () => {
                            inner.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
                            item.classList.add('selected');
                            
                            trigger.querySelector('span').textContent = serial.label;
                            content.classList.remove('open');
                            trigger.querySelector('.dropdown-arrow').classList.remove('rotate-arrow');

                            downloadBtn.href = serial.file;
                            downloadBtn.classList.remove('disabled');
                            downloadBtn.style.opacity = '1';
                            downloadBtn.style.pointerEvents = 'auto';
                            downloadBtn.textContent = 'Download Now';
                            if (!serial.file.startsWith('http')) downloadBtn.setAttribute('download', '');
                        });
                        inner.appendChild(item);
                    });

                    trigger.addEventListener('click', () => {
                        const isOpen = content.classList.toggle('open');
                        trigger.querySelector('.dropdown-arrow').classList.toggle('rotate-arrow', isOpen);
                    });

                    window.addEventListener('click', (e) => {
                        if (!customDropdown.contains(e.target)) {
                            content.classList.remove('open');
                            trigger.querySelector('.dropdown-arrow').classList.remove('rotate-arrow');
                        }
                    });

                    content.appendChild(inner);
                    customDropdown.appendChild(trigger);
                    customDropdown.appendChild(content);

                    container.appendChild(customDropdown);
                    container.appendChild(downloadBtn);
                    btnGroup.appendChild(container);

                } else {
                    const assetsBtn = document.createElement('a');
                    assetsBtn.className = 'btn btn-primary';
                    
                    if (Array.isArray(currentAssetsLink)) {
                        assetsBtn.href = '#';
                        assetsBtn.textContent = (osKey.startsWith('windows')) 
                            ? `Download ${config[driverType].name} (${currentAssetsLink.length} files)` 
                            : 'Download Assets & Tweaks';
                        
                        assetsBtn.onclick = (e) => {
                            e.preventDefault();
                            
                            if (window.isMobile) {
                                alert("⚠️ Use a PC for this download.");
                            }

                            const confirmMsg = `This will download ${currentAssetsLink.length} files.`;
                            
                            if(confirm(confirmMsg)) {
                                const totalFiles = currentAssetsLink.length;
                                let downloadedCount = 0;
                                
                                currentAssetsLink.forEach((url, index) => {
                                    setTimeout(() => {
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', '');
                                        link.style.display = 'none';
                                        document.body.appendChild(link);
                                        link.click();
                                        setTimeout(() => document.body.removeChild(link), 100);
                                        
                                        downloadedCount++;
                                        if (downloadedCount === totalFiles) {
                                            setTimeout(showDownloadComplete, 1500);
                                        }
                                    }, index * 1000); 
                                });
                            }
                        };
                        
                        const note = document.createElement('p');
                        note.className = 'text-mini mt-sm';
                        note.style.lineHeight = '1.4';
                        note.innerHTML = `<strong>Tip:</strong> Allow multiple downloads if prompted.`;
                        btnGroup.appendChild(note);
                    } else {
                        assetsBtn.href = currentAssetsLink;
                        assetsBtn.target = '_blank';
                        assetsBtn.textContent = (osKey.startsWith('windows')) 
                            ? `Download ${config[driverType].name}` 
                            : 'Download Assets & Tweaks';
                    }
                    btnGroup.appendChild(assetsBtn);
                }
            }

            if (config.isoOptions) {
                const selectContainer = document.createElement('div');
                selectContainer.className = 'iso-selection-group mt-sm';
                selectContainer.style.width = '100%';

                const select = document.createElement('select');
                select.className = 'btn-iso'; 
                select.style.padding = '12px 18px';
                select.style.borderRadius = '12px';
                select.style.border = '1px solid var(--border-color)';
                select.style.background = 'rgba(128, 128, 128, 0.08)';
                select.style.color = 'var(--text-color)';
                select.style.cursor = 'pointer';
                select.style.width = '100%';
                select.style.appearance = 'auto';
                select.style.outline = 'none';

                const defaultOpt = document.createElement('option');
                defaultOpt.textContent = 'Select .ISO Image';
                defaultOpt.disabled = true;
                defaultOpt.selected = true;
                select.appendChild(defaultOpt);

                config.isoOptions.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.link;
                    option.textContent = opt.name;
                    select.appendChild(option);
                });

                select.addEventListener('change', (e) => {
                    if (e.target.value) {
                        window.open(e.target.value, '_blank');
                        select.selectedIndex = 0;
                    }
                });

                selectContainer.appendChild(select);
                btnGroup.appendChild(selectContainer);
            } else if (currentIsoLink && currentIsoLink !== '#') {
                const isoBtn = document.createElement('a');
                isoBtn.href = currentIsoLink;
                isoBtn.target = '_blank';
                isoBtn.rel = 'noopener noreferrer';
                isoBtn.className = 'btn btn-secondary';
                isoBtn.textContent = 'Download .ISO Image';
                btnGroup.appendChild(isoBtn);
            }
        }
    });

    window.addEventListener('pageshow', () => {
    });
})();
