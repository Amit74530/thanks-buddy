// Thanks Buddy — Consolidated Main Script
document.addEventListener('DOMContentLoaded', function() {
  /* ===== MOBILE NAVIGATION ===== */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const spans = this.querySelectorAll('span');
      
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-btn').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburgerBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  /* ===== FADE-IN ANIMATIONS ===== */
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  /* ===== IMPACT COUNTERS ===== */
  const counters = document.querySelectorAll('.impact-number');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute('data-count');
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(element, target) {
    let duration;
    if (target <= 100) duration = 1500;
    else if (target <= 1000) duration = 2000;
    else duration = 2500;

    let start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * target);
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    }
    
    element.textContent = '0';
    requestAnimationFrame(updateCounter);
  }

  /* ===== JOIN MOVEMENT FORM ===== */
  const subscribeForm = document.getElementById('subscribe-form');
  const successModal = document.getElementById('success-modal');
  
  if (subscribeForm && successModal) {
    const closeModal = successModal.querySelector('.close-modal');
    const continueBtn = successModal.querySelector('.btn-continue');

    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmission(this);
    });

    // Modal close events
    [closeModal, continueBtn].forEach(btn => {
      if (btn) btn.addEventListener('click', closeSuccessModal);
    });

    successModal.addEventListener('click', function(e) {
      if (e.target === this) closeSuccessModal();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && successModal.classList.contains('show')) {
        closeSuccessModal();
      }
    });

    // Floating labels
    const floatingInputs = subscribeForm.querySelectorAll('.form-control');
    floatingInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (this.value === '') {
          this.parentElement.classList.remove('focused');
        }
      });
      
      // Check initial state
      if (input.value !== '') {
        input.parentElement.classList.add('focused');
      }
    });
  }

  function handleFormSubmission(form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    const name = form.querySelector('input[type="text"]').value;

    // Show loading state
    submitBtn.querySelector('.btn-text').textContent = 'Subscribing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      submitBtn.querySelector('.btn-text').textContent = originalText;
      submitBtn.disabled = false;
      showSuccessModal(name);
      form.reset();
      
      // Remove focused class from inputs
      form.querySelectorAll('.input-container').forEach(container => {
        container.classList.remove('focused');
      });
    }, 1500);
  }

  function showSuccessModal(name) {
    const modalMessage = successModal.querySelector('.modal-body p');
    if (name && name.trim() !== '') {
      modalMessage.innerHTML = `Thank you <strong>${name}</strong> for joining Thanks Buddy! You're now part of our growing community of eco-warriors.`;
    }
    
    successModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSuccessModal() {
    successModal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Reset modal message
    const modalMessage = successModal.querySelector('.modal-body p');
    modalMessage.textContent = `Thank you for joining Thanks Buddy! You're now part of our growing community of eco-warriors. We'll send you a welcome email shortly with your first set of eco-tips.`;
  }

  /* ===== HERO VIDEO FALLBACK ===== */
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', function() {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        heroSection.style.backgroundImage = 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)';
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroVideo.style.display = 'none';
      }
    });

    // Try to play video
    try {
      heroVideo.muted = true;
      heroVideo.play().catch(() => {
        // Autoplay blocked - video will show poster
      });
    } catch (e) {
      // Video error handled by error event
    }
  }

  /* ===== SIMPLE FORM HANDLERS (fallback) ===== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert("Thank you for your message! We'll get back to you soon.");
      this.reset();
    });
  }
});

/*====benefits sidebar===*/
/* ===== BENEFITS TOGGLE FOR MOBILE ===== */
function initBenefitsToggle() {
    const benefitsToggle = document.getElementById('benefitsToggle');
    const benefitsSidebar = document.getElementById('benefitsSidebar');
    
    if (benefitsToggle && benefitsSidebar) {
        benefitsToggle.addEventListener('click', function() {
            benefitsSidebar.classList.toggle('mobile-visible');
            
            // Update button text and icon
            const toggleText = this.querySelector('.toggle-text');
            const toggleIcon = this.querySelector('.toggle-icon');
            
            if (benefitsSidebar.classList.contains('mobile-visible')) {
                toggleText.textContent = 'Hide Benefits';
                toggleIcon.textContent = '▲';
                this.style.marginBottom = '0';
            } else {
                toggleText.textContent = 'Show Benefits';
                toggleIcon.textContent = '▼';
                this.style.marginBottom = '2rem';
            }
        });
        
        // Close benefits when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 968) {
                const isClickInsideBenefits = benefitsSidebar.contains(event.target);
                const isClickOnToggle = benefitsToggle.contains(event.target);
                
                if (!isClickInsideBenefits && !isClickOnToggle && benefitsSidebar.classList.contains('mobile-visible')) {
                    benefitsSidebar.classList.remove('mobile-visible');
                    benefitsToggle.querySelector('.toggle-text').textContent = 'Show Benefits';
                    benefitsToggle.querySelector('.toggle-icon').textContent = '▼';
                    benefitsToggle.style.marginBottom = '2rem';
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 968) {
                // Reset on desktop
                benefitsSidebar.classList.remove('mobile-visible');
                benefitsToggle.querySelector('.toggle-text').textContent = 'Show Benefits';
                benefitsToggle.querySelector('.toggle-icon').textContent = '▼';
            }
        });
    }
}

// Initialize the toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBenefitsToggle();
    // ... your other existing code
});