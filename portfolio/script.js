// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('successModal');
const closeModal = document.querySelector('.close');

// Navbar Functionality
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth Scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Form Validation
function validateForm(formData) {
    const errors = [];
    
    // Name validation
    if (!formData.name.trim()) {
        errors.push('Nama harus diisi');
    } else if (formData.name.trim().length < 2) {
        errors.push('Nama minimal 2 karakter');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        errors.push('Email harus diisi');
    } else if (!emailRegex.test(formData.email)) {
        errors.push('Format email tidak valid');
    }
    
    // Message validation
    if (!formData.message.trim()) {
        errors.push('Pesan harus diisi');
    } else if (formData.message.trim().length < 10) {
        errors.push('Pesan minimal 10 karakter');
    }
    
    return errors;
}

// Show Error Messages
function showErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Add new error messages
    errors.forEach(error => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #e91e63;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            padding: 0.5rem;
            background: rgba(233, 30, 99, 0.1);
            border-radius: 0.375rem;
            border-left: 3px solid #e91e63;
        `;
        errorDiv.textContent = error;
        contactForm.insertBefore(errorDiv, contactForm.querySelector('.btn'));
    });
}

// Show Success Modal
function showSuccessModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Auto close after 3 seconds
    setTimeout(() => {
        hideSuccessModal();
    }, 3000);
}

// Hide Success Modal
function hideSuccessModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        showErrors(errors);
        return;
    }
    
    // Remove any existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Simulate form submission (in real app, this would be an API call)
    const submitButton = contactForm.querySelector('.btn');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Mengirim...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Simulate API delay
    setTimeout(() => {
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        
        // Clear form
        contactForm.reset();
        
        // Show success modal
        showSuccessModal();
        
        // Log form data (in real app, this would be sent to server)
        console.log('Form submitted:', formData);
    }, 1500);
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Intersection Observer for Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .about-text, .contact-info, .contact-form');
    animateElements.forEach(el => observer.observe(el));
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current nav link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Typing Animation for Hero Text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize Typing Animation
function initTypeWriter() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
}

// Parallax Effect for Hero Section
function handleParallax() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
}

// Smooth Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.project-card, .skill-item');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('fade-in-up');
        }
    });
}

// Copy Email to Clipboard
function copyEmail() {
    const email = 'manus@example.com';
    navigator.clipboard.writeText(email).then(() => {
        // Show temporary notification
        const notification = document.createElement('div');
        notification.textContent = 'Email disalin ke clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b9d;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

// Add CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .nav-link.active {
            color: var(--primary-pink) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add animation styles
    addAnimationStyles();
    
    // Initialize scroll animations
    setupScrollAnimations();
    
    // Initialize typing animation
    // initTypeWriter();
    
    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            closeMobileMenu();
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Modal close events
    closeModal.addEventListener('click', hideSuccessModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideSuccessModal();
        }
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
        revealOnScroll();
        // handleParallax(); // Uncomment for parallax effect
    });
    
    // Add click event to email in contact section
    const emailElement = document.querySelector('.contact-item span');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.addEventListener('click', copyEmail);
    }
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add pulse animation to skills on hover
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.style.display === 'block') {
        hideSuccessModal();
    }
    
    // Navigate with arrow keys (optional enhancement)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = ['home', 'about', 'projects', 'contact'];
        const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        if (currentSection) {
            const currentIndex = sections.indexOf(currentSection);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % sections.length;
            } else {
                nextIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
            }
            
            smoothScroll(`#${sections[nextIndex]}`);
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    handleNavbarScroll();
    updateActiveNavLink();
    revealOnScroll();
}, 16)); // ~60fps

// Console welcome message
console.log(`
🌸 Welcome to Manus Portfolio! 🌸
Built with ❤️ using HTML, CSS, and JavaScript
Theme: Pink Minimalist Design
Features: Responsive, Animated, Interactive
`);

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        smoothScroll,
        toggleMobileMenu,
        handleFormSubmit
    };
}



// Enhanced Features

// Scroll Progress Indicator
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-progress"></div>';
    document.body.appendChild(scrollIndicator);
    
    const scrollProgress = scrollIndicator.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Typing Effect for Hero Title
function createTypingEffect() {
    const heroTitle = document.querySelector('.hero-text h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Parallax Effect for Background Elements
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Enhanced Intersection Observer for Animations
function setupEnhancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add staggered animation for skill items
                if (entry.target.classList.contains('skills-grid')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('fade-in-up');
                        }, index * 100);
                    });
                }
                
                // Add staggered animation for project cards
                if (entry.target.classList.contains('projects-grid')) {
                    const projectCards = entry.target.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in-up');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skills-grid, .projects-grid, .about-text, .contact-info, .contact-form');
    animateElements.forEach(el => observer.observe(el));
}

// Mouse Cursor Trail Effect
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-pink);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].style.left = trail[i - 1].style.left;
            trail[i].style.top = trail[i - 1].style.top;
        }
        
        trail[0].style.left = mouseX + 'px';
        trail[0].style.top = mouseY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Enhanced Form Validation with Real-time Feedback
function setupEnhancedFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateFieldRealTime(input);
        });
        
        input.addEventListener('blur', () => {
            validateFieldRealTime(input);
        });
    });
}

function validateFieldRealTime(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let message = '';
    
    // Remove existing validation styling
    field.classList.remove('valid', 'invalid');
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                message = 'Nama minimal 2 karakter';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Format email tidak valid';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                message = 'Pesan minimal 10 karakter';
            }
            break;
    }
    
    // Add validation styling
    if (value.length > 0) {
        field.classList.add(isValid ? 'valid' : 'invalid');
        
        // Show/hide validation message
        let validationMsg = field.parentNode.querySelector('.validation-message');
        if (!validationMsg) {
            validationMsg = document.createElement('div');
            validationMsg.className = 'validation-message';
            field.parentNode.appendChild(validationMsg);
        }
        
        if (!isValid) {
            validationMsg.textContent = message;
            validationMsg.style.color = 'var(--dark-pink)';
        } else {
            validationMsg.textContent = '✓ Valid';
            validationMsg.style.color = 'var(--primary-pink)';
        }
    }
}

// Smooth Page Transitions
function initPageTransitions() {
    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    });
}

// Enhanced Navbar Behavior
function enhanceNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Interactive Background Particles
function createBackgroundParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--primary-pink);
        border-radius: 50%;
        opacity: 0.3;
        animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
}

// Enhanced Project Card Interactions
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add tilt effect
            card.style.transform = 'translateY(-15px) scale(1.02) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-15px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing features
    addAnimationStyles();
    setupScrollAnimations();
    
    // Initialize new enhanced features
    createScrollIndicator();
    // createTypingEffect(); // Uncomment if you want typing effect
    initParallax();
    setupEnhancedAnimations();
    // createCursorTrail(); // Uncomment if you want cursor trail
    setupEnhancedFormValidation();
    initPageTransitions();
    enhanceNavbar();
    // createBackgroundParticles(); // Uncomment if you want particles
    enhanceProjectCards();
    
    // Add CSS for enhanced features
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        .valid {
            border-color: var(--primary-pink) !important;
            box-shadow: 0 0 0 2px rgba(255, 64, 129, 0.2) !important;
        }
        
        .invalid {
            border-color: var(--dark-pink) !important;
            box-shadow: 0 0 0 2px rgba(197, 17, 98, 0.2) !important;
        }
        
        .validation-message {
            font-size: var(--font-size-sm);
            margin-top: var(--spacing-xs);
            transition: all var(--transition-normal);
        }
        
        .navbar {
            transition: transform var(--transition-normal) !important;
        }
        
        .project-card {
            perspective: 1000px;
            transform-style: preserve-3d;
        }
        
        @keyframes particleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(enhancedStyles);
});

// Update console message
console.log(`
🌸 Welcome to Farah Nirmala Putri's Portfolio! 🌸
Built with ❤️ using HTML, CSS, and JavaScript
Theme: Enhanced Pink Minimalist Design
Features: Responsive, Animated, Interactive, Modern
New Features: Scroll Progress, Enhanced Animations, Real-time Validation
`);

