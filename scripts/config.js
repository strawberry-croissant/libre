/**
 * Central Configuration for config
 */
const LIBRE_CONFIG = {
  BACKEND: {
    TRACKING_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000/track'
      : 'https://tracker-backend-bvo4.onrender.com/track',
    INDEX_TRACKING_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000/track/index'
      : 'https://tracker-backend-bvo4.onrender.com/track/index',
  },
  THEME: {
    STORAGE_KEY: 'theme',
    DARK_CLASS: 'dark-mode',
  },
  UI: {
    DEBOUNCE_WAIT: 350,
  },
  /* add serial numbers here */
  SERIALS: [
    { sn: '50900008934', label: '50900008934 (Laptop,Acer)', file: '/Downloads/Specialized/place to put files and text files_W10-11_Acer_laptop.zip' }
  ]
};

// Freeze to prevent modifications
window.LIBRE_CONFIG = LIBRE_CONFIG;
Object.freeze(LIBRE_CONFIG);
Object.freeze(LIBRE_CONFIG.BACKEND);
Object.freeze(LIBRE_CONFIG.THEME);
Object.freeze(LIBRE_CONFIG.UI);
Object.freeze(LIBRE_CONFIG.SERIALS);
                                                        