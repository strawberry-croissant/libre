/**
 * OS Configuration Data
 */
const OS_CONFIG = {
    'windows11': {
        title: 'Windows 11 (Light)',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h11.377v11.372H0V0zm12.623 0H24v11.372H12.623V0zM0 12.628h11.377V24H0V12.628zm12.623 0H24V24H12.623V12.628z"/></svg>',
        metaDescription: 'Download Libre for Windows 11.',
        generic: {
            name: 'Generic Drivers',
            link: 'https://downloadmirror.intel.com/872296/WiFi-24.10.0-Driver64-Win10-Win11.exe',
            info: 'Works on most hardware.',
            description: `
                <strong>Windows 11</strong> with Rufus and generic drivers. Simple bypass, works everywhere.
                <br><br>
                <span class="text-mini">
                  Light (No ISO): 500MB • Total with ISO: 8GB
                </span>
            `,
            isoLink: 'https://software-static.download.prss.microsoft.com/dbazure/888969d5-f34g-4e03-ac9d-1f9786c66749/26200.6584.250915-1905.25h2_ge_release_svc_refresh_CLIENT_CONSUMER_x64FRE_ar-sa.iso'
        },
        special: {
            name: 'Optimized Drivers',
            link: 'https://link-to-windows11-special-zip',
            info: 'For specific hardware. Check your serial first.',
            description: `
                <strong>Windows 11</strong> with Rufus and drivers tuned for specific machines. Check your serial number before downloading.
                <br><br>
                <span class="text-mini">
                  Light (No ISO): 2.5GB • Total with ISO: 10GB
                </span>
            `,
            isoLink: 'https://software-static.download.prss.microsoft.com/dbazure/888969d5-f34g-4e03-ac9d-1f9786c66749/26200.6584.250915-1905.25h2_ge_release_svc_refresh_CLIENT_CONSUMER_x64FRE_ar-sa.iso'
        }
    },
    'windows10': {
        title: 'Windows 10 (Light)',
        icon: '<svg width="24" height="24" viewBox="0 0 88 88" fill="currentColor"><path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z"/></svg>',
        metaDescription: 'Download Libre for Windows 10. Runs great on older hardware.',
        generic: {
            name: 'Generic Drivers',
            link: 'https://downloadmirror.intel.com/872296/WiFi-24.10.0-Driver64-Win10-Win11.exe',
            info: 'Stable. Works on unknown hardware.',
            description: `
                The classic. <strong>Stable and fast</strong> on older machines. No telemetry, no microsoft bloat.
                <br><br>
                <span class="text-mini">
                  Light (No ISO): 1.8GB • Total with ISO: 5.5GB
                </span>
            `,
            isoLink: 'https://drive.massgrave.dev/en-us_windows_10_iot_enterprise_ltsc_2021_x64_dvd_257ad90f.iso'
        },
        special: {
            name: 'Optimized Drivers',
            link: 'https://link-to-windows10-special-zip',
            info: 'For specific hardware. Check your serial first.',
            description: `
                <strong>Windows 10</strong> with Rufus, Libre, and drivers tuned for specific machines.
                <br><br>
                <span class="text-mini">
                  Light (No ISO): 2.3GB • Total with ISO: 9.5GB
                </span>
            `,
            isoLink: 'https://drive.massgrave.dev/en-us_windows_10_iot_enterprise_ltsc_2021_x64_dvd_257ad90f.iso'
        }
    },
    'ubuntu': {
        title: 'Ubuntu (Light)',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.61.455a3.41 3.41 0 0 0-3.41 3.41 3.41 3.41 0 0 0 3.41 3.41 3.41 3.41 0 0 0 3.41-3.41 3.41 3.41 0 0 0-3.41-3.41zM12.92.8C8.923.777 5.137 2.941 3.148 6.451a4.5 4.5 0 0 1 .26-.007 4.92 4.92 0 0 1 2.585.737A8.316 8.316 0 0 1 12.688 3.6 4.944 4.944 0 0 1 13.723.834 11.008 11.008 0 0 0 12.92.8zm9.226 4.994a4.915 4.915 0 0 1-1.918 2.246 8.36 8.36 0 0 1-.273 8.303 4.89 4.89 0 0 1 1.632 2.54 11.156 11.156 0 0 0 .559-13.089zM3.41 7.932A3.41 3.41 0 0 0 0 11.342a3.41 3.41 0 0 0 3.41 3.409 3.41 3.41 0 0 0 3.41-3.41 3.41 3.41 0 0 0-3.41-3.41zm2.027 7.866a4.908 4.908 0 0 1-2.915.358 11.1 11.1 0 0 0 7.991 6.698 11.234 11.234 0 0 0 2.422.249 4.879 4.879 0 0 1-.999-2.85 8.484 8.484 0 0 1-.836-.136 8.304 8.304 0 0 1-5.663-4.32zm11.405.928a3.41 3.41 0 0 0-3.41 3.41 3.41 3.41 0 0 0 3.41 3.41 3.41 3.41 0 0 0 3.41-3.41 3.41 3.41 0 0 0-3.41-3.41z"/></svg>',
        metaDescription: 'Download Libre for Ubuntu. Linux made easy.',
        description: `
            <strong>GNOME interface</strong>. Easiest switch from Windows. Based on Ubuntu 25.10. Light and reliable.
            <br><br>
            <span class="text-mini">
              Assets: 2MB • Max with ISO: 5.6GB (6? 
              <a
                class="oss-link"
                id="sixSevenLink"
                href="67"
              >six seven?</a>)
            </span>
        `,
        assetsLink: '#',
        isoLink: 'https://ubuntu.com/download/desktop/thank-you?version=25.10&architecture=amd64'
    },
    'mint': {
        title: 'Linux Mint (Light)',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.438 5.906v8.438c0 2.06 1.69 3.75 3.75 3.75h5.625c2.06 0 3.75-1.69 3.75-3.75V9.656a2.827 2.827 0 0 0-2.813-2.812 2.8 2.8 0 0 0-1.875.737A2.8 2.8 0 0 0 12 6.844a2.827 2.827 0 0 0-2.812 2.812v4.688h1.875V9.656c0-.529.408-.937.937-.937s.938.408.938.937v4.688h1.875V9.656c0-.529.408-.937.937-.937s.938.408.938.937v4.688a1.86 1.86 0 0 1-1.875 1.875H9.188a1.86 1.86 0 0 1-1.875-1.875V5.906ZM12 0C5.384 0 0 5.384 0 12s5.384 12 12 12 12-5.384 12-12S18.616 0 12 0m0 1.875A10.11 10.11 0 0 1 22.125 12 10.11 10.11 0 0 1 12 22.125 10.11 10.11 0 0 1 1.875 12 10.11 10.11 0 0 1 12 1.875"/></svg>',
        metaDescription: 'Download Libre for Linux Mint. Lightweight and familiar.',
        description: `
            <strong>Cinnamon desktop</strong>. Light, fast, great for devs.
            <br><br>
            <span class="text-mini">
              Assets: 2MB • Max with ISO: 2.9GB
            </span>
        `,
        assetsLink: '#',
        isoOptions: [
            { name: 'Cinnamon (Standard)', link: 'https://pub.linuxmint.io/stable/22.3/linuxmint-22.3-cinnamon-64bit.iso' },
            { name: 'XFCE (Lightweight)', link: 'https://pub.linuxmint.io/stable/22.3/linuxmint-22.3-xfce-64bit.iso' }
        ]
    },
    'mac': {
        title: 'Mac (Beta)',
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>',
        metaDescription: 'Experimental build for macOS.',
        description: 'MacOS cannot work on most hardware. Only specified computers stated in the FAQ page can run it. Check the FAQ page for more information.<br><br>We are still experimenting with MacOS, if you would like to help us, please contact us <a class="slight-silent-link" href="contact-us">here</a>. <br><br><br> Current MacOS Development Status: MacOS Sonoma in TEST/DEVELOPMENT. Status: <span class="spoiler" title="Restricted access">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',
        isComingSoon: true
    }
};

window.OS_CONFIG = OS_CONFIG;
Object.freeze(OS_CONFIG);
