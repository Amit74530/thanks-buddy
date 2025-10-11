/* Thanks Buddy — main interactive script
   Place before </body> or include as external <script defer src="..."></script>
*/
document.addEventListener('DOMContentLoaded', () => {
  /* -------------------- NAV / HAMBURGER -------------------- */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = hamburgerBtn.querySelectorAll('span');

      if (spans.length === 3) {
        if (navMenu.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });

    // Close mobile menu when clicking any nav link
    const navLinks = document.querySelectorAll('.nav-btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburgerBtn.querySelectorAll('span');
        if (spans.length === 3) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }

  /* -------------------- FORM HANDLERS (safe if forms missing) -------------------- */
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Thank you for subscribing to our mission! We'll keep you updated on our initiatives.");
      this.reset();
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Thank you for your message! We'll get back to you soon.");
      this.reset();
    });
  }

  /* -------------------- HERO VIDEO FALLBACK -------------------- */
  const heroVideo = document.querySelector('.hero-video');

  function setHeroFallback() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80')";
      heroSection.style.backgroundSize = 'cover';
      heroSection.style.backgroundPosition = 'center';
    }
    if (heroVideo) heroVideo.style.display = 'none';
  }

  if (heroVideo) {
    // Mute for autoplay on many browsers
    try { heroVideo.muted = true; } catch (e) { /* ignore */ }

    // Check basic playback capability
    const canPlayMp4 = typeof heroVideo.canPlayType === 'function' && heroVideo.canPlayType('video/mp4') !== '';
    const canPlayWebm = typeof heroVideo.canPlayType === 'function' && heroVideo.canPlayType('video/webm') !== '';

    if (!canPlayMp4 && !canPlayWebm) {
      setHeroFallback();
    } else {
      // Listen for errors and fallback if any occur
      heroVideo.addEventListener('error', () => setHeroFallback());

      // Try autoplay (may be rejected by browser); if it fails we won't force-hide
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // autoplay blocked — keep video element (poster will show) or rely on user play
        });
      }
    }
  }

  /* -------------------- FADE-IN ON SCROLL -------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // reveal once
        }
      });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => fadeInObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    fadeEls.forEach(el => el.classList.add('visible'));
  }
}); // <-- Add this closing brace to end the main DOMContentLoaded listener

// Alternative Impact Stats Counter with Different Speeds
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.impact-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-count');
        
        // Different durations based on target number
        let duration;
        if (target <= 100) {
          duration = 1500; // 1.5 seconds for small numbers
        } else if (target <= 1000) {
          duration = 2000; // 2 seconds for medium numbers
        } else {
          duration = 2500; // 2.5 seconds for large numbers
        }
        
        let start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          
          const current = Math.floor(easeOutQuart * target);
          el.textContent = current.toLocaleString();
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target.toLocaleString();
          }
        };
        
        // Start counting from 0
        el.textContent = '0';
        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { 
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});


//join the movement button//
// Join Movement Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const subscribeForm = document.getElementById('subscribe-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');
    const continueBtn = document.querySelector('.btn-continue');

    // Form submission
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate form submission
        simulateSubmission(name, email);
    });

    // Close modal events
    closeModal.addEventListener('click', closeSuccessModal);
    continueBtn.addEventListener('click', closeSuccessModal);
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('show')) {
            closeSuccessModal();
        }
    });

    function simulateSubmission(name, email) {
        // Show loading state
        const submitBtn = subscribeForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Subscribing...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            // Reset button
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success modal
            showSuccessModal(name);
            
            // Reset form
            subscribeForm.reset();
        }, 1500);
    }

    function showSuccessModal(name) {
        // Personalize message if name is provided
        const modalMessage = successModal.querySelector('.modal-body p');
        if (name && name.trim() !== '') {
            modalMessage.innerHTML = `Thank you <strong>${name}</strong> for joining Thanks Buddy! You're now part of our growing community of eco-warriors. We'll send you a welcome email shortly with your first set of eco-tips.`;
        }
        
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeSuccessModal() {
        successModal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Reset modal message
        const modalMessage = successModal.querySelector('.modal-body p');
        modalMessage.innerHTML = `Thank you for joining Thanks Buddy! You're now part of our growing community of eco-warriors. We'll send you a welcome email shortly with your first set of eco-tips.`;
    }

    // Add floating label functionality
    const floatingInputs = document.querySelectorAll('.form-control');
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
});