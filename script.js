console.log('script.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');

  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
  }
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem(
      'darkMode',
      body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
    );
  });

  const typedElement = document.getElementById('typed');
  const texts = [
    'A passionate software developer.',
    'A problem-solving enthusiast.',
    'A lifelong learner.'
  ];
  let textIndex = 0;
  let charIndex = 0;
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;

  function type() {
    if (!typedElement) return;
    if (charIndex < texts[textIndex].length) {
      typedElement.textContent += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (!typedElement) return;
    if (charIndex > 0) {
      typedElement.textContent = texts[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, typingDelay + 500);
    }
  }

  if (typedElement) {
    console.log('Starting typing animation');
    setTimeout(type, newTextDelay + 500);
  } else {
    console.error('Typed element not found');
  }

  const headerHeight = document.querySelector('header').offsetHeight;
  document.querySelectorAll('nav ul li a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      event.preventDefault();
      const targetId = anchor.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const y = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
        backToTop.classList.add('show');
        } else {
        backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
   });

   const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('active');
        }
    });
    }, {
    threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const formMessage = document.getElementById('form-message');
      if (!name || !email || !message) {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill out all fields.';
        return;
      }
      formMessage.style.color = 'green';
      formMessage.textContent = 'Message sent successfully!';
      form.reset();
    });
  } else {
    console.error('Contact form element not found.');
  }
});
