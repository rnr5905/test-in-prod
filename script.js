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

// ===== WAITLIST FORM HANDLING =====
const handleFormSubmit = async (formId, emailId) => {
  const form = document.getElementById(formId);
  const emailInput = document.getElementById(emailId);
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    
    // Show success state
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Added! 🎉';
    button.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
    emailInput.value = '';
    
    // Reset after 3 seconds
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 3000);
    
    // Here you would normally send to your backend
    console.log('Waitlist signup:', email);
  });
};

handleFormSubmit('waitlistForm', 'waitlistEmail');
handleFormSubmit('footerForm', 'footerEmail');

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
