// ===== NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question?.addEventListener('click', () => {
    // Close other open items
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active');
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el);
});

// ===== BACKEND CONFIGURATION =====
// Google Apps Script backend URL
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbwLWVM6YOxkwtBAFdeN0VydknOhPjboeY4jTDpCtX5-vIoareupt88jQ3IgExTuWX8f/exec';
// Fallback: FormSubmit.co (works without any setup, just sends email)
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/support@test-in-prod.com';

// ===== UNIFIED FORM SUBMISSION =====
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function submitToBackend(formData) {
  const url = BACKEND_URL || FORMSUBMIT_URL;
  const isBackend = !!BACKEND_URL;

  // Add FormSubmit-specific fields if using fallback
  if (!isBackend) {
    formData._subject = formData._subject || 'New Submission - Test in Prod';
  }

  if (isBackend) {
    // Google Apps Script returns 302 redirect on successful POST.
    // Using redirect:'manual' catches this as an opaque-redirect (status 0),
    // which confirms the script executed. We treat this as success.
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'manual',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(formData)
    });
    // status 0 with type 'opaqueredirect' = GAS processed it and redirected (success)
    // status 200 = direct success response
    if (response.status === 0 || response.ok) {
      return { success: true };
    }
    throw new Error('Submission failed');
  } else {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error('Submission failed');
    return await response.json();
  }
}

function showSuccess(button, form, message) {
  button.textContent = message;
  button.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
  button.style.boxShadow = '0 4px 20px rgba(34, 197, 94, 0.4)';
  if (form.reset) form.reset();
}

function showError(button, message) {
  button.textContent = message || 'Error. Try Again.';
  button.style.background = '#ef4444';
}

function resetButton(button, originalText) {
  button.textContent = originalText;
  button.style.background = '';
  button.style.boxShadow = '';
  button.disabled = false;
}

// ===== WAITLIST FORMS (email-only) =====
function setupWaitlistForm(formId, emailId, formType) {
  const form = document.getElementById(formId);
  const emailInput = document.getElementById(emailId);

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    if (!validateEmail(email)) { alert('Please enter a valid email address.'); return; }

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Submitting...';
    button.disabled = true;

    try {
      await submitToBackend({ email, form_type: formType, _subject: `New ${formType === 'waitlist' ? 'Waitlist' : 'Early Access'} Signup` });
      showSuccess(button, form, 'Added! 🎉');
      emailInput.value = '';
    } catch (error) {
      console.error(`${formType} error:`, error);
      showError(button);
    }
    setTimeout(() => resetButton(button, originalText), 3000);
  });
}

setupWaitlistForm('waitlistForm', 'waitlistEmail', 'waitlist');
setupWaitlistForm('footerForm', 'footerEmail', 'early_access');

// ===== DEMO REQUEST FORM =====
const demoForm = document.getElementById('demoForm');
demoForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('demoEmail').value;
  if (!validateEmail(email)) { alert('Please enter a valid work email.'); return; }

  const button = demoForm.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.textContent = 'Sending...';
  button.disabled = true;

  try {
    await submitToBackend({
      form_type: 'demo_request',
      name: document.getElementById('demoName').value,
      email,
      company: document.getElementById('demoCompany').value,
      _subject: 'New Demo Request - Test in Prod'
    });
    showSuccess(button, demoForm, 'Request Sent! 🎉');
  } catch (error) {
    console.error('Demo request error:', error);
    showError(button);
  }
  setTimeout(() => resetButton(button, originalText), 3000);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('contactEmail').value;
  if (!validateEmail(email)) { alert('Please enter a valid email address.'); return; }

  const button = contactForm.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.textContent = 'Sending...';
  button.disabled = true;

  try {
    await submitToBackend({
      form_type: 'contact',
      name: document.getElementById('contactName').value,
      email,
      subject: document.getElementById('contactSubject').value,
      message: document.getElementById('contactMessage').value,
      _subject: 'New Contact Message - Test in Prod'
    });
    showSuccess(button, contactForm, 'Message Sent! 🎉');
  } catch (error) {
    console.error('Contact form error:', error);
    showError(button);
  }
  setTimeout(() => resetButton(button, originalText), 3000);
});

// ===== NAV BACKGROUND ON SCROLL =====
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.background = 'rgba(10, 10, 10, 0.95)';
  } else {
    nav.style.background = 'rgba(10, 10, 10, 0.8)';
  }
  
  lastScroll = currentScroll;
});

// ===== TYPING ANIMATION FOR CODE (Optional Enhancement) =====
// This could be added for a more dynamic hero code block
// Uncomment and customize if desired

/*
const codeContent = document.querySelector('.hero-code .code-content code');
const originalCode = codeContent.innerHTML;

function typeCode() {
  const lines = originalCode.split('\n');
  codeContent.innerHTML = '';
  let lineIndex = 0;
  
  function typeLine() {
    if (lineIndex < lines.length) {
      codeContent.innerHTML += lines[lineIndex] + '\n';
      lineIndex++;
      setTimeout(typeLine, 100);
    }
  }
  
  typeLine();
}
*/

// ===== PARALLAX EFFECT FOR HERO GRID =====
const heroGrid = document.querySelector('.hero-grid');

window.addEventListener('scroll', () => {
  if (heroGrid) {
    const scrolled = window.pageYOffset;
    heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== CONSOLE EASTER EGG =====
console.log(`
%c🧪 Test in Prod
%cAI QA Engineers that test like real users

Interested in working with us? 
We're hiring engineers who love breaking things.

→ careers@test-in-prod.com
`, 
'font-size: 24px; font-weight: bold; color: #8b5cf6;',
'font-size: 14px; color: #a1a1aa;'
);
