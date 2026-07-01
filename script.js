const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const sections = [...document.querySelectorAll('section[id]')];
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

function updateNavState() {
  nav.classList.toggle('is-scrolled', window.scrollY > 24);

  let current = 'home';
  for (const section of sections) {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) current = section.id;
  }

  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateNavState, { passive: true });
updateNavState();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
