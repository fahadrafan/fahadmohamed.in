const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealItems.forEach(item => observer.observe(item));

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const width = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progress.style.width = `${width}%`;
}, { passive: true });

const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('.contact-submit');

  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending… <span>↗</span>';

  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const formData = new FormData(contactForm);

    await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formData).toString()
    });

    contactForm.reset();

    formStatus.textContent =
      'Thanks for reaching out! Your message has been sent successfully.';
    formStatus.classList.add('success');

    submitButton.disabled = false;
    submitButton.innerHTML = 'Send message <span>↗</span>';

  } catch (error) {
    formStatus.textContent =
      'Something went wrong. Please try again or email me directly.';
    formStatus.classList.add('error');

    submitButton.disabled = false;
    submitButton.innerHTML = 'Send message <span>↗</span>';
  }
});