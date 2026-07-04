if (history.scrollRestoration) {
  history.scrollRestoration = 'auto';
}

if (window.location.hash) {
  history.replaceState("", document.title, window.location.pathname + window.location.search);
}

let lenis = null;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    if (lenis) lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');

    if (this.classList.contains('mob-link')) {
      if (lenis) lenis.start();
      if (typeof hamburger !== 'undefined' && hamburger) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
      if (typeof mobileMenu !== 'undefined' && mobileMenu) mobileMenu.classList.remove('open');
    }

    const targetEl = document.querySelector(target);
    if (targetEl) {
      if (lenis) {
        lenis.scrollTo(targetEl);
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setTimeout(() => {
      history.replaceState("", document.title, window.location.pathname + window.location.search);
    }, 100);
  });
});

let isAutoScrolling = true;

window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
  if (typeof CONFIG !== 'undefined' && typeof emailjs !== 'undefined') {
    emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
  }

  requestAnimationFrame(() => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 4)
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setTimeout(() => {
      isAutoScrolling = false;
      if (typeof mainNav !== 'undefined' && mainNav) {
        mainNav.classList.toggle('scrolled', window.scrollY > 60);
      }
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
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');

  if (lenis) {
    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }
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
- Brief about project?
- Any specific timeline?
`;

  msgField.value = template;
  msgField.focus();
}

function sendMsg(event) {
  if (event) event.preventDefault();

  const btn = document.querySelector('.f-btn');
  const btnText = btn.firstChild;

  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const industry = document.getElementById('f-industry').value;
  const msg = document.getElementById('f-msg').value.trim();

  if (!name || !email || !msg) {
    showToast('Please fill in your name, email, and project details.');
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showToast('Please enter a valid email address.');
    return false;
  }

  if (phone && !/^[0-9]{10}$/.test(phone)) {
    showToast('Please enter a valid 10-digit phone number.');
    return false;
  }

  if (typeof CONFIG === 'undefined' || !CONFIG.EMAILJS_SERVICE_ID || !CONFIG.EMAILJS_TEMPLATE_ID) {
    console.error('PRISM | ERROR: EmailJS configuration (config.js) is missing or incomplete.');
    showToast('Contact form is currently offline. Please email work.prismstudios@gmail.com directly.');
    return false;
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

  return false;
}