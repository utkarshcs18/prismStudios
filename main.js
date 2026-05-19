if (history.scrollRestoration) {
  history.scrollRestoration = 'auto';
}

if (window.location.hash) {
  history.replaceState("", document.title, window.location.pathname + window.location.search);
}

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    lenis.scrollTo(target);

    setTimeout(() => {
      history.replaceState("", document.title, window.location.pathname + window.location.search);
    }, 100);
  });
});

let isAutoScrolling = true;

window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
  if (typeof CONFIG !== 'undefined') {
    emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
  }

  requestAnimationFrame(() => {
    lenis.scrollTo(0, { 
      duration: 1.5, 
      easing: (t) => 1 - Math.pow(1 - t, 4) 
    });
    setTimeout(() => {
      isAutoScrolling = false;
      mainNav.classList.toggle('scrolled', window.scrollY > 60);
    }, 1500);
  });
});

const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  if (!isAutoScrolling) {
    mainNav.classList.toggle('scrolled', window.scrollY > 60);
  }
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);

  if (open) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    lenis.start();
  });
});

const sections = ['services', 'process', 'contact'];
const navLinks = document.querySelectorAll('.nav-links a[data-section], .mob-link[data-section]');

function setActive() {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 160) current = id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.section === current);
  });
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .rl, .rr').forEach(el => ro.observe(el));

let _toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('prismToast');
  document.getElementById('prismToastMsg').textContent = msg;
  toast.classList.add('show');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}

function applyTemplate() {
  const msgField = document.getElementById('f-msg');
  const template = `Project Overview: 
- What do you do?
- What are your main goals?
- Any specific timeline?`;

  msgField.value = template;
  msgField.focus();
}

function sendMsg() {
  const btn = document.querySelector('.f-btn');
  const btnText = btn.firstChild;

  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const industry = document.getElementById('f-industry').value;
  const msg = document.getElementById('f-msg').value.trim();

  if (!name || !email || !msg) {
    showToast('Please fill in your name, email, and project details.');
    return;
  }

  if (typeof CONFIG === 'undefined' || !CONFIG.EMAILJS_SERVICE_ID || !CONFIG.EMAILJS_TEMPLATE_ID) {
    console.error('PRISM | ERROR: EmailJS configuration (config.js) is missing or incomplete.');
    showToast('Contact form is currently offline. Please email work.prismstudios@gmail.com directly.');
    return;
  }

  const originalText = btnText.textContent;
  btn.disabled = true;
  btnText.textContent = 'Sending... ';

  const templateParams = {
    from_name: name,
    from_email: email,
    phone: phone,
    industry: industry,
    message: msg,
    to_name: "Prism.studios"
  };

  emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, templateParams)
    .then(function (response) {
      console.log('PRISM | SUCCESS!', response.status, response.text);
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }, function (error) {
      console.log('PRISM | FAILED...', error);
      showToast('Failed to send message. Please try again or email us directly.');
      btn.disabled = false;
      btnText.textContent = originalText;
    });
}
