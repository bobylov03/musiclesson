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
    // FIX GALLERY LAYOUT
    // ============================================
    function fixGalleryLayout() {
        const galleryContent = document.querySelector('.gallery-content');
        const simpleSliderContainer = document.querySelector('.simple-slider-container');
        const videoContainer = document.querySelector('.video-container');
        
        if (!galleryContent) return;
        
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // For mobile: make everything full width
            if (simpleSliderContainer) {
                simpleSliderContainer.style.width = '100vw';
                simpleSliderContainer.style.marginLeft = 'calc(-50vw + 50%)';
                simpleSliderContainer.style.marginRight = 'calc(-50vw + 50%)';
                simpleSliderContainer.style.borderRadius = '0';
            }
            
            if (videoContainer) {
                videoContainer.style.width = '100vw';
                videoContainer.style.marginLeft = 'calc(-50vw + 50%)';
                videoContainer.style.marginRight = 'calc(-50vw + 50%)';
                videoContainer.style.borderRadius = '0';
            }
        } else {
            // For desktop: reset styles
            if (simpleSliderContainer) {
                simpleSliderContainer.style.width = '100%';
                simpleSliderContainer.style.marginLeft = '';
                simpleSliderContainer.style.marginRight = '';
                simpleSliderContainer.style.borderRadius = '20px';
            }
            
            if (videoContainer) {
                videoContainer.style.width = '100%';
                videoContainer.style.marginLeft = '';
                videoContainer.style.marginRight = '';
                videoContainer.style.borderRadius = '20px';
            }
        }
    }

    // ============================================
    // CONTACT FORM SUBMISSION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('Contact form found');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const instrument = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !instrument) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll simulate a successful submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent. Anna will contact you at ${email} soon to discuss ${instrument} lessons.`);
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1500);
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
                        img.src = src;
                        img.classList.add('loaded');
                        
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                        
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe all images
        document.querySelectorAll('img').forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            imageObserver.observe(img);
        });
    }

    // ============================================
    // INITIALIZE EVERYTHING
    // ============================================
    function initializePage() {
        console.log('Initializing page...');
        
        // Initialize custom slider
        initCustomSlider();
        
        // Fix gallery layout
        fixGalleryLayout();
        
        // Add loaded class to body
        document.body.classList.add('page-loaded');
        
        console.log('Page initialization complete');
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
        fixGalleryLayout();
    }, 250);
    
    // Add event listeners
    window.addEventListener('load', initializePage);
    window.addEventListener('resize', debouncedResizeHandler);
    
    // Also initialize on DOM ready
    setTimeout(initializePage, 100);
});

// Add minimal CSS fixes
const customSliderStyles = document.createElement('style');
customSliderStyles.textContent = `
    /* Custom slider styles */
    .simple-slider-container {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    
    .simple-slider {
        width: 100%;
        height: 450px;
        position: relative;
    }
    
    .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .slide.active {
        opacity: 1;
        z-index: 1;
    }
    
    .slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    
    /* Slider controls */
    .slider-controls {
        position: absolute;
        bottom: 25px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 25px;
        z-index: 10;
        padding: 0 25px;
    }
    
    .slider-prev, .slider-next {
        background: rgba(255, 255, 255, 0.15);
        border: 2px solid rgba(255, 255, 255, 0.3);
        color: white;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }
    
    .slider-prev:hover, .slider-next:hover {
        background: rgba(142, 68, 173, 0.9);
        border-color: rgba(142, 68, 173, 0.9);
        transform: scale(1.1);
    }
    
    .slider-dots {
        display: flex;
        gap: 12px;
    }
    
    .dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .dot.active {
        background: #8e44ad;
        transform: scale(1.2);
    }
    
    /* Fix for mobile */
    @media (max-width: 768px) {
        .gallery .container {
            padding-left: 0;
            padding-right: 0;
        }
        
        .simple-slider-container {
            width: 100vw !important;
            margin-left: calc(-50vw + 50%) !important;
            margin-right: calc(-50vw + 50%) !important;
            border-radius: 0 !important;
        }
        
        .simple-slider {
            height: 300px !important;
        }
        
        .slider-controls {
            bottom: 15px;
            gap: 20px;
            padding: 0 20px;
        }
        
        .slider-prev, .slider-next {
            width: 45px;
            height: 45px;
        }
        
        .video-container {
            width: 100vw !important;
            margin-left: calc(-50vw + 50%) !important;
            margin-right: calc(-50vw + 50%) !important;
            border-radius: 0 !important;
        }
    }
    
    @media (max-width: 480px) {
        .simple-slider {
            height: 250px !important;
        }
        
        .slider-prev, .slider-next {
            width: 40px;
            height: 40px;
        }
        
        .dot {
            width: 10px;
            height: 10px;
        }
    }
`;
document.head.appendChild(customSliderStyles);