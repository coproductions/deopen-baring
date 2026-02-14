// ============================================
// De Open-Baring — Site JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('.page-section');
  const contactForm = document.getElementById('contact-form');

  // --- Scroll: header shadow & section visibility ---
  const onScroll = () => {
    // Header shadow
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Intersection Observer for scroll reveal ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  sections.forEach(section => observer.observe(section));

  // --- Mobile menu toggle ---
  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth scroll for nav links (offset for fixed header) ---
  const scrollToSection = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      const headerHeight = header.offsetHeight;
      const top = target.offsetTop - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  navLinks.forEach(link => link.addEventListener('click', scrollToSection));
  mobileLinks.forEach(link => link.addEventListener('click', scrollToSection));

  // --- Contact form (basic handling) ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('form-success');
      success.classList.add('visible');
      contactForm.reset();
      setTimeout(() => {
        success.classList.remove('visible');
      }, 3000);
    });
  }

  // --- Trigger initial scroll check ---
  onScroll();
});
