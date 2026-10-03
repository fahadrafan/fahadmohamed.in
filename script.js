const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navIndicator = document.getElementById('navIndicator');
const progress = document.getElementById('scrollProgress');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelector('.header-resume-btn')?.addEventListener('click', () => {
  nav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
});

const navLinks = Array.from(nav?.querySelectorAll('a[href^="#"]') || []);
const sections = navLinks
  .map(link => {
    const id = link.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    return { id, link, element };
  })
  .filter(item => item.element !== null);

let isManualNavClick = false;
let navClickTimeout = null;

function updateIndicator(activeLink, smooth = true) {
  if (!navIndicator) return;

  if (!activeLink || window.innerWidth <= 700) {
    navIndicator.classList.remove('visible');
    return;
  }

  if (!smooth) {
    navIndicator.style.transition = 'none';
  }

  navIndicator.style.width = `${activeLink.offsetWidth}px`;
  navIndicator.style.transform = `translateX(${activeLink.offsetLeft}px)`;
  navIndicator.classList.add('visible');

  if (!smooth) {
    void navIndicator.offsetHeight; // Force reflow
    navIndicator.style.transition = '';
  }
}

function setActiveLink(link, smooth = true) {
  navLinks.forEach(l => {
    if (l === link) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });

  updateIndicator(link, smooth);
}

function updateActiveNavByScroll(smooth = true) {
  if (sections.length === 0) return;

  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // If user scrolled to the bottom of the page, activate the last section
  if (scrollY + windowHeight >= documentHeight - 50) {
    const lastSection = sections[sections.length - 1];
    setActiveLink(lastSection.link, smooth);
    return;
  }

  // If user is at the top/hero section (above first section)
  const firstSection = sections[0];
  const offsetTolerance = 140;
  if (scrollY + offsetTolerance < firstSection.element.offsetTop) {
    setActiveLink(null, smooth);
    return;
  }

  // Find the current section
  let current = null;
  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    const top = sec.element.offsetTop - offsetTolerance;
    const height = sec.element.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      current = sec;
      break;
    }
  }

  if (!current) {
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (scrollY >= sec.element.offsetTop - offsetTolerance) {
        current = sec;
        break;
      }
    }
  }

  if (current) {
    setActiveLink(current.link, smooth);
  } else {
    setActiveLink(null, smooth);
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');

    setActiveLink(link, true);
    isManualNavClick = true;
    clearTimeout(navClickTimeout);

    navClickTimeout = setTimeout(() => {
      isManualNavClick = false;
    }, 850);
  });
});

// Also track external anchor clicks like the hero CTA or top logo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  if (!navLinks.includes(anchor)) {
    anchor.addEventListener('click', () => {
      const targetHref = anchor.getAttribute('href');
      if (targetHref === '#top') {
        setActiveLink(null, true);
        isManualNavClick = true;
        clearTimeout(navClickTimeout);
        navClickTimeout = setTimeout(() => {
          isManualNavClick = false;
        }, 850);
      } else {
        const matchingLink = navLinks.find(nl => nl.getAttribute('href') === targetHref);
        if (matchingLink) {
          setActiveLink(matchingLink, true);
          isManualNavClick = true;
          clearTimeout(navClickTimeout);
          navClickTimeout = setTimeout(() => {
            isManualNavClick = false;
          }, 850);
        }
      }
    });
  }
});

['wheel', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, () => {
    isManualNavClick = false;
  }, { passive: true });
});

if ('onscrollend' in window) {
  window.addEventListener('scrollend', () => {
    isManualNavClick = false;
  });
}

const resumeBtn = document.querySelector('.header-resume-btn');

function updateStickyResumeButton() {
  if (window.innerWidth <= 700) {
    if (window.scrollY > 80) {
      resumeBtn?.classList.add('is-sticky-mobile');
    } else {
      resumeBtn?.classList.remove('is-sticky-mobile');
    }
  } else {
    resumeBtn?.classList.remove('is-sticky-mobile');
  }
}

window.addEventListener('resize', () => {
  const currentActive = nav?.querySelector('a.active');
  updateIndicator(currentActive, false);
  updateStickyResumeButton();
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavByScroll(false);
    updateStickyResumeButton();
  });
} else {
  updateActiveNavByScroll(false);
  updateStickyResumeButton();
}

window.addEventListener('load', () => {
  updateActiveNavByScroll(false);
  updateStickyResumeButton();
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

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const width = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      if (progress) progress.style.width = `${width}%`;

      if (!isManualNavClick) {
        updateActiveNavByScroll(true);
      }
      updateStickyResumeButton();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
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