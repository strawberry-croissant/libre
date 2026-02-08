(() => {
  const PREDEFINED_SERIALS = (typeof LIBRE_CONFIG !== 'undefined' && LIBRE_CONFIG.SERIALS) 
    ? LIBRE_CONFIG.SERIALS.map(item => item.label)
    : [];

  // Utility to debounce function calls
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
        div.className = "bento-item";
        
        const span = document.createElement("span");
        span.textContent = sn;
        div.appendChild(span);

        const chevron = document.createElement("div");
        chevron.className = "chevron";
        chevron.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
        div.appendChild(chevron);

        div.addEventListener("click", () => {
          div.classList.toggle("active");
        });

        fragment.appendChild(div);
        hasResults = true;
      }
    });

    if (!hasResults && query !== "") {
      const div = document.createElement("div");
      div.className = "bento-item";
      div.style.cssText = "background:transparent; box-shadow:none; color:var(--text-secondary); opacity:0.7; pointer-events:none; border:none;";
      div.textContent = "No results found";
      fragment.appendChild(div);
    }

    bento.innerHTML = "";
    bento.appendChild(fragment);
  };

  const openModal = () => {
    const modal = document.getElementById("serialModal");
    const bento = document.getElementById("serialBento");
    const search = document.getElementById("serialSearch");
    
    if (!modal || !bento) return;
    
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
      search.addEventListener("input", debounce((e) => {
        renderSerials(e.target.value);
      }, LIBRE_CONFIG.UI.DEBOUNCE_WAIT));
    }

    if (window.location.hash === "#serial-numbers") {
      setTimeout(() => openModal(), 500);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    const openTrigger = document.getElementById("openSerials");
    const modalBg = document.querySelector(".modal-bg");
    const closeHeaderTrigger = document.getElementById("closeSerialsTriggerInHeader");
    const closeTrigger = document.getElementById("closeSerialsTrigger");
    const closeBtn = document.getElementById("closeSerialsBtn");

    if (openTrigger) openTrigger.addEventListener("click", openModal);
    if (modalBg) modalBg.addEventListener("click", closeModal);
    if (closeHeaderTrigger) closeHeaderTrigger.addEventListener("click", closeModal);
    if (closeTrigger) closeTrigger.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
  });
})();
