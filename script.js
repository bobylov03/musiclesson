// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scripts...');
    
    // ============================================
    // SIMPLE CUSTOM SLIDER
    // ============================================
    function initCustomSlider() {
        const slider = document.getElementById('simpleSlider');
        if (!slider) {
            console.log('Custom slider not found');
            return;
        }
        
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        const dots = document.querySelectorAll('.dot');
        
        if (slides.length === 0) {
            console.log('No slides found');
            return;
        }
        
        let currentSlide = 0;
        let autoSlideInterval;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the requested slide
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            
            // Update the active dot
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        }
        
        // Function to go to next slide
        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        }
        
        // Function to go to previous slide
        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            showSlide(prevIndex);
        }
        
        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoSlide();
            });
        });
        
        // Add click event to next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });
        }
        
        // Add click event to prev button
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });
        }
        
        // Auto slide functionality
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoSlide();
            }
        });
        
        // Initialize the slider
        showSlide(0);
        startAutoSlide();
        
        console.log('Custom slider initialized with', slides.length, 'slides');
    }
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    if (menuToggle && navbar) {
        console.log('Mobile menu elements found');
        
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navbar.classList.contains('active');
            
            if (isActive) {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = 'auto';
                body.style.position = '';
                body.style.width = '';
                console.log('Menu closed');
            } else {
                navbar.classList.add('active');
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                body.style.overflow = 'hidden';
                body.style.position = 'fixed';
                body.style.width = '100%';
                console.log('Menu opened');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = 'auto';
                body.style.position = '';
                body.style.width = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbar.classList.contains('active') && 
                !navbar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = 'auto';
                body.style.position = '';
                body.style.width = '';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                body.style.overflow = 'auto';
                body.style.position = '';
                body.style.width = '';
            }
        });
    }

    // ============================================
    // MODAL FUNCTIONALITY
    // ============================================
    const modal = document.getElementById('bookingModal');
    const bookLessonBtn = document.getElementById('bookLessonBtn');
    const closeModal = document.getElementById('closeModal');
    const bookingForm = document.getElementById('lessonBookingForm');
    const successMessage = document.getElementById('successMessage');
    const bookingFormContainer = document.getElementById('bookingForm');
    const userEmailSpan = document.getElementById('userEmail');
    
    if (modal && bookLessonBtn) {
        // Open modal when clicking "Book a Lesson"
        bookLessonBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal when clicking X
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // ============================================
    // FORM SUBMISSION - BOOKING FORM
    // ============================================
    if (bookingForm) {
        console.log('Booking form found');
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['studentName', 'email', 'phone', 'instrument', 'location', 'studentAge', 'experience'];
            const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
            
            if (missingFields.length > 0) {
                alert('Please fill in all required fields marked with *.');
                return;
            }
            
            // Display success message
            if (bookingFormContainer) bookingFormContainer.style.display = 'none';
            if (successMessage) successMessage.style.display = 'block';
            if (userEmailSpan) userEmailSpan.textContent = data.email;
            
            // Send email using Formspree (replace with your Formspree endpoint)
            sendEmailToFormspree(data, 'booking');
            
            // Reset form after 5 seconds and close modal
            setTimeout(function() {
                bookingForm.reset();
                if (bookingFormContainer) bookingFormContainer.style.display = 'block';
                if (successMessage) successMessage.style.display = 'none';
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }, 5000);
        });
    }
    
    // ============================================
    // FORM SUBMISSION - CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('Contact form found');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            const requiredFields = ['name', 'email', 'phone', 'instrument', 'location'];
            const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
            
            if (missingFields.length > 0) {
                alert('Please fill in all required fields marked with *.');
                return;
            }
            
            // Send email using Formspree
            sendEmailToFormspree(data, 'contact');
            
            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                alert(`Thank you, ${data.name}! Your message has been sent. Anna will contact you at ${data.email} soon to discuss ${data.instrument} lessons.`);
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1500);
        });
    }
    
    // ============================================
    // SEND EMAIL FUNCTION USING FORMSPREE
    // ============================================
    function sendEmailToFormspree(data, formType) {
        // Replace with your actual Formspree endpoint
        const formspreeEndpoint = 'https://formspree.io/f/mdazpwlp'; // CHANGE THIS TO YOUR FORMSPREE ENDPOINT
        
        // Format the message based on form type
        let subject, body;
        
        if (formType === 'booking') {
            subject = `New Lesson Booking Request from ${data.studentName}`;
            body = `
Student Name: ${data.studentName}
Parent Name: ${data.parentName || 'Not provided'}
Email: ${data.email}
Phone: ${data.phone}
Instrument: ${data.instrument}
Location: ${data.location}
Student Age: ${data.studentAge}
Experience Level: ${data.experience}
Preferred Schedule: ${data.schedule || 'Not specified'}
Musical Goals: ${data.goals || 'Not specified'}
            `;
        } else if (formType === 'contact') {
            subject = `New Contact Form Submission from ${data.name}`;
            body = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Instrument: ${data.instrument}
Location: ${data.location}
Message: ${data.message || 'Not provided'}
            `;
        }
        
        // Prepare Formspree data
        const formData = new FormData();
        formData.append('_subject', subject);
        formData.append('message', body);
        formData.append('_replyto', data.email);
        formData.append('_format', 'plain');
        
        // Send to Formspree
        fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Email sent successfully via Formspree');
            } else {
                console.error('Error sending email via Formspree');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Fallback: Send data to console (for debugging)
            console.log('Form submission data (not sent):', {
                to: 'annabobylyova@gmail.com',
                subject: subject,
                body: body
            });
        });
    }
    
    // ============================================
    // GOOGLE MAPS FUNCTIONALITY
    // ============================================
    const bracebridgeBtn = document.getElementById('bracebridgeMap');
    if (bracebridgeBtn) {
        bracebridgeBtn.addEventListener('click', function() {
            // Open exact studio address in Google Maps
            window.open('https://www.google.com/maps/search/?api=1&query=14+Manitoba+Street+Bracebridge+ON+Canada', '_blank');
        });
    }
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    body.style.overflow = 'auto';
                    body.style.position = '';
                    body.style.width = '';
                }
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // STICKY HEADER
    // ============================================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Initial check
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        }
    }

    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src') || img.src;
                    
                    if (src && !img.classList.contains('loaded')) {
                        // Add loading animation
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.5s ease';
                        
                        img.onload = () => {
                            img.classList.add('loaded');
                            img.style.opacity = '1';
                        };
                        
                        // Set the actual source
                        if (img.getAttribute('data-src')) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Also observe regular images for fade-in effect
        document.querySelectorAll('img:not([data-src])').forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.onload = () => {
                    img.style.opacity = '1';
                };
            }
        });
    }

    // ============================================
    // INITIALIZE EVERYTHING
    // ============================================
    function initializePage() {
        console.log('Initializing page...');
        
        // Initialize custom slider
        initCustomSlider();
        
        // Fix hero background for mobile
        fixHeroBackground();
        
        // Add loaded class to body
        document.body.classList.add('page-loaded');
        
        console.log('Page initialization complete');
    }
    
    // ============================================
    // FIX HERO BACKGROUND FOR MOBILE
    // ============================================
    function fixHeroBackground() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Check if on mobile
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // On mobile, use a simpler background for better performance
            hero.style.backgroundAttachment = 'scroll';
            hero.style.backgroundSize = 'cover';
            hero.style.backgroundPosition = 'center center';
        }
    }
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounced resize handler
    const debouncedResizeHandler = debounce(() => {
        console.log('Window resized');
        fixHeroBackground();
    }, 250);
    
    // Add event listeners
    window.addEventListener('load', initializePage);
    window.addEventListener('resize', debouncedResizeHandler);
    
    // Also initialize on DOM ready
    setTimeout(initializePage, 100);
});

// ============================================
// ADDITIONAL SEO ENHANCEMENTS
// ============================================
// Add structured data for breadcrumbs
const breadcrumbSchema = document.createElement('script');
breadcrumbSchema.type = 'application/ld+json';
breadcrumbSchema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://shineonstage.ca/"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Music Lessons",
            "item": "https://shineonstage.ca/#lessons"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Contact",
            "item": "https://shineonstage.ca/#contact"
        }
    ]
});
document.head.appendChild(breadcrumbSchema);

// Add structured data for reviews
const reviewSchema = document.createElement('script');
reviewSchema.type = 'application/ld+json';
reviewSchema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Shine On Stage Music Lessons",
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "24",
        "bestRating": "5",
        "worstRating": "1"
    },
    "review": [
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "Sarah Johnson"
            },
            "datePublished": "2024-01-15",
            "reviewBody": "Anna is an amazing piano teacher! My daughter has made incredible progress and loves her lessons.",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            }
        },
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "Michael Chen"
            },
            "datePublished": "2024-02-20",
            "reviewBody": "Professional violin instruction with a focus on performance. Highly recommended!",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            }
        }
    ]
});
document.head.appendChild(reviewSchema);

// ============================================
// ADD MINIMAL CSS FIXES VIA JAVASCRIPT
// ============================================
const customStyles = document.createElement('style');
customStyles.textContent = `
    /* Ensure hero image covers properly on all devices */
    .hero {
        background-size: cover !important;
        background-position: center center !important;
        background-repeat: no-repeat !important;
    }
    
    /* Improve mobile tap targets */
    @media (max-width: 768px) {
        .btn, .badge, .navbar a {
            min-height: 44px;
            min-width: 44px;
        }
        
        .slider-prev, .slider-next {
            min-height: 44px;
            min-width: 44px;
        }
        
        .dot {
            min-height: 12px;
            min-width: 12px;
        }
    }
    
    /* Print styles */
    @media print {
        .header, .footer, .cta-buttons, .modal, .menu-toggle {
            display: none !important;
        }
        
        .hero {
            background: none !important;
            color: #000 !important;
            padding: 20px 0 !important;
        }
        
        .hero h1, .subtitle {
            color: #000 !important;
        }
        
        .section {
            padding: 40px 0 !important;
            page-break-inside: avoid;
        }
        
        a[href]:after {
            content: " (" attr(href) ")";
        }
    }
    
    /* Accessibility improvements */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    /* Focus styles for accessibility */
    button:focus, 
    input:focus, 
    select:focus, 
    textarea:focus,
    a:focus {
        outline: 2px solid #8e44ad;
        outline-offset: 2px;
    }
    
    /* Skip to main content link for accessibility */
    .skip-to-content {
        position: absolute;
        top: -40px;
        left: 0;
        background: #8e44ad;
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 1001;
        transition: top 0.3s;
    }
    
    .skip-to-content:focus {
        top: 0;
    }
`;
document.head.appendChild(customStyles);

// ============================================
// ADD SKIP TO CONTENT LINK FOR ACCESSIBILITY
// ============================================
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-to-content';
skipLink.textContent = 'Skip to main content';
skipLink.setAttribute('aria-label', 'Skip to main content');

// Add main content id to hero section
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
    heroContent.id = 'main-content';
}

// Insert skip link at the beginning of body
document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Defer non-critical images
if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
        // Load background images after initial page load
        const bgImages = document.querySelectorAll('[data-bg]');
        bgImages.forEach(img => {
            const bgUrl = img.getAttribute('data-bg');
            if (bgUrl) {
                img.style.backgroundImage = `url(${bgUrl})`;
                img.removeAttribute('data-bg');
            }
        });
    });
}
