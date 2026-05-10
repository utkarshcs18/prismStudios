const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  
  if (open) {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${sbw}px`;
    mainNav.style.paddingRight = `${sbw}px`;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.paddingRight = '';
    mainNav.style.paddingRight = '';
    document.body.style.overflow = '';
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
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

function sendMsg() {
  const btn = document.querySelector('.f-btn');
  const btnText = btn.firstChild; // The "Send Message" text node
  
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const industry = document.getElementById('f-industry').value;
  const msg = document.getElementById('f-msg').value.trim();

  if (!name || !email) {
    alert('Please fill in your name and email.');
    return;
  }

  // Visual feedback
  const originalText = btnText.textContent;
  btn.disabled = true;
  btnText.textContent = 'Sending... ';

  const templateParams = {
    from_name: name,
    from_email: email,
    phone: phone,
    industry: industry,
    message: msg,
    to_name: "Utkarsh"
  };

  // Replace "servk7b" with your Service ID and "template_zwsc2n8" with your Template ID
  emailjs.send("servk7b", "template_zwsc2n8", templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }, function(error) {
      console.log('FAILED...', error);
      alert('Failed to send message. Please try again or email us directly.');
      btn.disabled = false;
      btnText.textContent = originalText;
    });
}
