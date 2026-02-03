/**
 * FAQ Page Scripts: Serial Number Management
 * Simplified to work with inline HTML script
 */
(() => {
  // Use centralized configuration for serials
  // Map objects to display labels for search
  const PREDEFINED_SERIALS = (typeof LIBRE_CONFIG !== 'undefined' && LIBRE_CONFIG.SERIALS) 
    ? LIBRE_CONFIG.SERIALS.map(item => item.label)
    : [];

  /**
   * Utility to debounce function calls
   */
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const renderSerials = (queryValue = "") => {
    const bento = document.getElementById("serialBento");
    if (!bento) return;
    
    const query = (queryValue || "").toLowerCase().trim();
    const fragment = document.createDocumentFragment();
    let hasResults = false;
    
    PREDEFINED_SERIALS.forEach(sn => {
      const text = sn.toLowerCase();
      if (!query || text.indexOf(query) !== -1) {
        const div = document.createElement("div");
        div.className = "bento-item mt-sm";
        
        const span = document.createElement("span");
        span.textContent = sn;
        div.appendChild(span);

        fragment.appendChild(div);
        hasResults = true;
      }
    });

    if (!hasResults && query !== "") {
      const div = document.createElement("div");
      div.className = "bento-item";
      div.style.cssText = "background:transparent; box-shadow:none; color:var(--text-secondary); opacity:0.7; pointer-events:none;";
      div.textContent = "No results found";
      fragment.appendChild(div);
    }

    // Single DOM update
    bento.innerHTML = "";
    bento.appendChild(fragment);
  };

  const openModal = () => {
    const modal = document.getElementById("serialModal");
    const bento = document.getElementById("serialBento");
    const search = document.getElementById("serialSearch");
    
    if (!modal || !bento) {
      console.warn("Modal elements not found in HTML.");
      return;
    }
    
    document.body.style.overflow = "hidden";
    modal.classList.remove("hidden");
    
    renderSerials("");
    
    if (search) {
      search.value = "";
      search.focus();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("serialModal");
    if (modal) modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("serialSearch");
    
    if (search) {
      // Use config debounce wait
      search.addEventListener("input", debounce((e) => {
        renderSerials(e.target.value);
      }, LIBRE_CONFIG.UI.DEBOUNCE_WAIT));
    }

    // Handle deep link
    if (window.location.hash === "#serial-numbers") {
      setTimeout(() => openModal(), 500);
    }

    // Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    // Modal event listeners
    const openTrigger = document.getElementById("openSerials");
    const modalBg = document.querySelector(".modal-bg");
    const closeTrigger = document.getElementById("closeSerialsTrigger");
    const closeBtn = document.getElementById("closeSerialsBtn");

    if (openTrigger) openTrigger.addEventListener("click", openModal);
    if (modalBg) modalBg.addEventListener("click", closeModal);
    if (closeTrigger) closeTrigger.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
  });
})();
