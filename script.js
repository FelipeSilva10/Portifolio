(() => {
  const navigationLinks = Array.from(document.querySelectorAll(".jump-nav a[href^='#']"));

  if (!navigationLinks.length || !("IntersectionObserver" in window)) {
    return;
  }

  const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setCurrentLink = (id) => {
    navigationLinks.forEach((link) => {
      if (link.getAttribute("href") === id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleEntries[0]) {
        setCurrentLink("#" + visibleEntries[0].target.id);
      }
    },
    {
      rootMargin: "-18% 0px -68% 0px",
      threshold: [0.05, 0.2, 0.45],
    }
  );

  sections.forEach((section) => observer.observe(section));
})();
