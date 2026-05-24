/* ═══════════════════════════════════════════════
   ALEX REYES — PORTFOLIO  |  main.js
═══════════════════════════════════════════════ */

'use strict';

/* ─── NAVBAR: shrink on scroll + active link ─── */
const mainNav  = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ─── Close mobile menu on nav link click ─── */
const navMenu    = document.getElementById('navMenu');
const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu, { toggle: false });
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('show')) bsCollapse.hide();
  });
});

/* ─── SCROLL REVEAL ─── 
   Hero elements (.hero-text, .hero-visual) are NOT given data-animate
   in HTML so they are always visible. Only off-screen sections animate. */
function initReveal() {
  const els = document.querySelectorAll('[data-animate]');

  // Force-show anything already in the viewport immediately
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      el.classList.add('in-view');
    }
  });

  // Watch the rest
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => {
    if (!el.classList.contains('in-view')) obs.observe(el);
  });
}

window.addEventListener('load', initReveal);

/* ─── SKILL BARS ─── */
window.addEventListener('load', () => {
  const fills = document.querySelectorAll('.prof-fill');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => barObs.observe(f));
});

/* ─── CONTACT FORM ─── */
const sendBtn   = document.getElementById('sendBtn');
const formAlert = document.getElementById('formAlert');
const fields    = {
  fname:   document.getElementById('fname'),
  lname:   document.getElementById('lname'),
  email:   document.getElementById('email'),
  subject: document.getElementById('subject'),
  message: document.getElementById('message'),
};

function showAlert(type, msg) {
  formAlert.className = `form-alert ${type}`;
  formAlert.textContent = msg;
  formAlert.classList.remove('d-none');
  setTimeout(() => formAlert.classList.add('d-none'), 5000);
}

sendBtn.addEventListener('click', () => {
  const { fname, email, subject, message } = fields;
  if (!fname.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
    showAlert('error', '⚠ Please fill in all required fields.'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showAlert('error', '⚠ Please enter a valid email address.'); return;
  }
  sendBtn.disabled = true;
  sendBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';
  setTimeout(() => {
    sendBtn.disabled = false;
    sendBtn.innerHTML = 'Send Message <i class="bi bi-send ms-2"></i>';
    showAlert('success', '✓ Message sent! I\'ll get back to you soon.');
    Object.values(fields).forEach(f => { f.value = ''; });
  }, 1800);
});

/* ─── FOOTER YEAR ─── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ─── TYPING EFFECT ─── */
const roles  = ['Full-Stack Developer', 'PHP / Laravel Engineer', 'Front-End Craftsman', 'Problem Solver'];
const roleEl = document.querySelector('.hero-role');

if (roleEl) {
  let ri = 0, ci = 0, deleting = false;
  function typeRole() {
    const word = roles[ri];
    roleEl.textContent = deleting ? word.substring(0, ci - 1) : word.substring(0, ci + 1);
    deleting ? ci-- : ci++;
    if (!deleting && ci === word.length) { deleting = true; setTimeout(typeRole, 1800); return; }
    if (deleting && ci === 0)            { deleting = false; ri = (ri + 1) % roles.length; }
    setTimeout(typeRole, deleting ? 55 : 95);
  }
  setTimeout(typeRole, 400);
}