// Initialize Swiper Slider
const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.innerHTML = navbar.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const instrument = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // In a real implementation, you would send this data to a server
        // For now, we'll simulate a successful submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you, ${name}! Your message has been sent. Anna will contact you at ${email} soon to discuss ${instrument} lessons.`);
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// WhatsApp link handler
const whatsappLink = document.querySelector('.btn-whatsapp');
if (whatsappLink) {
    // You should replace the phone number with your actual WhatsApp number
    // Currently using a placeholder: https://wa.me/1234567890
    // Format: https://wa.me/1XXXXXXXXXX (country code + number without + or 0)
    // Example for Canada: https://wa.me/14165551234
}

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
    }
});