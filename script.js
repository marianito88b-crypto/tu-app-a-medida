const SITE_CONFIG = {
  brandName: "Tu App a Medida",
  location: "Resistencia, Chaco",
  whatsappNumber: "5493625163528",
  whatsappMessage:
    "Hola, quiero consultar por una app o sistema a medida para mi negocio.",
  instagramUrl: "https://www.instagram.com/find_mygym/",
  email: "marianob_123@hotmail.com",
  projects: {
    barapp: {
      playStore: "https://play.google.com/store/search?q=barapp",
      appStore: "https://apps.apple.com/ar/app/barapp/id6757483657",
    },
    gyms: {
      playStore: "https://play.google.com/store/apps/details?id=com.mariano.findmygym",
      appStore: "https://apps.apple.com/fr/app/gyms/id6746703158?l=en-GB",
    },
    multirubro: "https://sistema-gestion-pro.vercel.app/",
    barberia: "https://sistema-gestion-pro.vercel.app/",
    odontologico: "https://pinodont.vercel.app/",
  },
};

const formatWhatsAppNumber = (number) => {
  if (!number || number.length < 8) return "WhatsApp";
  if (number.startsWith("549") && number.length >= 13) {
    return `+54 9 ${number.slice(3, 6)} ${number.slice(6, 9)}-${number.slice(9, 13)}`;
  }
  return `+${number}`;
};

const applyConfig = () => {
  document.title = `${SITE_CONFIG.brandName} | Apps y sistemas para negocios`;

  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.dataset.config;
    if (SITE_CONFIG[key]) {
      element.textContent = SITE_CONFIG[key];
    }
  });

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappMessage
  )}`;

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Contactar por WhatsApp: ${formatWhatsAppNumber(SITE_CONFIG.whatsappNumber)}`);
  });

  document.querySelectorAll("[data-instagram-link]").forEach((link) => {
    link.href = SITE_CONFIG.instagramUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${SITE_CONFIG.email}`;
    link.textContent = SITE_CONFIG.email;
  });

  document.querySelectorAll("[data-project-link]").forEach((link) => {
    const projectKey = link.dataset.projectLink;
    const storeKey = link.dataset.store;
    const project = SITE_CONFIG.projects[projectKey];

    if (!project) return;

    const url = storeKey ? project[storeKey] : project;
    if (!url) return;

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
};

const setupHeader = () => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("is-open"));
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
};

const setupFloatingCta = () => {
  const updateFloatingCta = () => {
    const shouldShow = window.innerWidth > 620 || window.scrollY > 420;
    document.body.classList.toggle("has-floating-cta", shouldShow);
  };

  window.addEventListener("scroll", updateFloatingCta, { passive: true });
  window.addEventListener("resize", updateFloatingCta);
  updateFloatingCta();
};

const setupRevealAnimations = () => {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
};

const setupIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 2,
        "aria-hidden": "true",
      },
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  setupHeader();
  setupFloatingCta();
  setupRevealAnimations();
  setupIcons();
});
