// Scroll animations
const items = document.querySelectorAll('.about-content');
const footer = document.querySelector('.footer-text');
const heroTitle = document.querySelector('.hero h1');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

items.forEach(item => observer.observe(item));
observer.observe(footer);
observer.observe(heroTitle);
