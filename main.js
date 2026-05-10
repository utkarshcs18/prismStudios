const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
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
  const name = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const industry = document.getElementById('f-industry').value;
  const msg = document.getElementById('f-msg').value.trim();
  if (!name || !email) { alert('Please fill in your name and email.'); return; }
  const sub = encodeURIComponent('New Enquiry from ' + name + ' — Flare Studios');
  const body = encodeURIComponent('Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email + '\nIndustry: ' + industry + '\n\nMessage:\n' + msg);
  window.location.href = 'mailto:team.flarestudios@gmail.com?subject=' + sub + '&body=' + body;
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}
