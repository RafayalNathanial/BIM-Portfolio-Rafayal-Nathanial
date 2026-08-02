// ============================
// Contact form validation
// Client-side only — wire "action" below to a real backend
// (e.g. Formspree, EmailJS, or your own API) to actually send mail.
// ============================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { el: document.getElementById('email'), error: document.getElementById('emailError') },
    subject: { el: document.getElementById('subject'), error: document.getElementById('subjectError') },
    message: { el: document.getElementById('message'), error: document.getElementById('messageError') },
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validators = {
    name: (v) => v.trim().length >= 2 ? '' : 'Please enter your name.',
    email: (v) => emailPattern.test(v.trim()) ? '' : 'Please enter a valid email.',
    subject: (v) => v.trim().length >= 3 ? '' : 'Please enter a subject.',
    message: (v) => v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.',
  };

  const validateField = (key) => {
    const { el, error } = fields[key];
    const msg = validators[key](el.value);
    error.textContent = msg;
    el.closest('.form-group').classList.toggle('invalid', Boolean(msg));
    return !msg;
  };

  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].error.textContent) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const allValid = Object.keys(fields).map(validateField).every(Boolean);

    if (!allValid) {
      status.textContent = 'Please fix the errors above.';
      status.className = 'form-status error';
      return;
    }

    // No backend wired up yet — simulate a successful send.
    status.textContent = 'Message sent! I will get back to you soon.';
    status.className = 'form-status success';
    form.reset();
  });
});
