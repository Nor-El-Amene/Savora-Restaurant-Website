document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.add('active');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('active');
  });
});
// Nav active link
const navLinks = document.querySelectorAll('.header nav a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active')); // remove active from all
    link.classList.add('active'); // add active to clicked
  });
});
// Select all elements to animate
const scrollElements = document.querySelectorAll(".animate-on-scroll");

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const displayScrollElement = (element) => {
  element.classList.add("visible");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    }
  });
};

// Listen to scroll
window.addEventListener("scroll", handleScrollAnimation);


