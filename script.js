// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Expandable service cards
document.querySelectorAll('[data-expand]').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('expanded'));
  card.addEventListener('keypress', e => { if (e.key === 'Enter') card.classList.toggle('expanded'); });
  card.setAttribute('tabindex', '0');
});

// Counters (animate on view)
const counters = document.querySelectorAll('.counter');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count || 0;
    const span = el.querySelector('span');
    let start = 0;
    const step = () => {
      start += Math.max(1, Math.ceil(target / 60));
      if (start >= target) { span.textContent = target; return; }
      span.textContent = start;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    io.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => io.observe(c));

// Simple slider
const slider = document.querySelector('[data-slider]');
if (slider) {
  const slides = Array.from(slider.querySelectorAll('.slide'));
  const prev = slider.querySelector('.slider-prev');
  const next = slider.querySelector('.slider-next');
  let i = 0, timer;

  const show = (n) => {
    slides.forEach(s => s.classList.remove('current'));
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('current');
  };
  const auto = () => {
    clearInterval(timer);
    timer = setInterval(() => show(i + 1), 5000);
  };
  prev.addEventListener('click', () => { show(i - 1); auto(); });
  next.addEventListener('click', () => { show(i + 1); auto(); });
  auto();
}

// Back to top
const toTop = document.querySelector('.to-top');
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Form validation (demo only)
const form = document.getElementById('quoteForm');
const statusEl = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const required = ['name','email','phone','site'];
    const missing = required.filter(k => !String(data[k] || '').trim());
    if (missing.length) {
      statusEl.hidden = false;
      statusEl.textContent = 'Please complete all required fields.';
      statusEl.style.color = '#b91c1c';
      return;
    }
    // In production, submit via fetch() to your API/email service.
    statusEl.hidden = false;
    statusEl.textContent = 'Thanks—your enquiry has been recorded (demo). We will be in touch shortly.';
    statusEl.style.color = '#065f46';
    form.reset();
  });
}

// Set current year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
