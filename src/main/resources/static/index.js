// Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation scroll effect
    const navigation = document.getElementById('navigation');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    // Handle scroll effect for navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        const isActive = mobileNav.classList.contains('active');
        
        // Animate hamburger menu
        const hamburger = mobileMenuBtn.querySelector('.hamburger');
        if (isActive) {
            hamburger.style.transform = 'rotate(45deg)';
            hamburger.style.background = 'transparent';
        } else {
            hamburger.style.transform = 'rotate(0deg)';
            hamburger.style.background = 'var(--primary)';
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    mobileNav.classList.remove('active');
                    const hamburger = mobileMenuBtn.querySelector('.hamburger');
                    hamburger.style.transform = 'rotate(0deg)';
                    hamburger.style.background = 'var(--primary)';
                }
            }
        });
    });
    
    // Animated counters for statistics
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.floor(current);
                    setTimeout(updateCounter, 20);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                
                // Trigger stats animation when about section is visible
                if (entry.target.id === 'about') {
                    setTimeout(animateStats, 500);
                }
                
                // Add hover effects to feature cards
                if (entry.target.classList.contains('feature-item') || 
                    entry.target.classList.contains('user-card') || 
                    entry.target.classList.contains('ai-feature')) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, observerOptions);
    
    // Observe sections and cards for animations
    const sections = document.querySelectorAll('section, .feature-item, .user-card, .ai-feature');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const organization = formData.get('organization');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            background: ${type === 'success' ? 'var(--success-green)' : type === 'error' ? 'var(--destructive)' : 'var(--primary)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-card);
            transform: translateX(400px);
            transition: var(--transition-smooth);
            max-width: 400px;
        `;
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto hide after 5 seconds
        const hideTimeout = setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // Initialize animations on page load
    const animateElements = document.querySelectorAll('.animate-fade-in-up');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-item, .user-card, .ai-feature');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--shadow-card)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-feature)';
        });
    });
    
    // Smooth reveal animations
    const revealElements = document.querySelectorAll('.section-header, .feature-item, .user-card, .ai-feature, .system-layer');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        revealObserver.observe(element);
    });
});