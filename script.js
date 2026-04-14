document.documentElement.classList.add('js');

const yearTarget = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const updatePointerGlow = (event) => {
  const x = `${Math.round((event.clientX / window.innerWidth) * 100)}%`;
  const y = `${Math.round((event.clientY / window.innerHeight) * 100)}%`;
  document.body.style.setProperty('--pointer-x', x);
  document.body.style.setProperty('--pointer-y', y);
};

window.addEventListener('pointermove', updatePointerGlow, { passive: true });

if ('IntersectionObserver' in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
