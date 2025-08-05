




class Carousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentIndex = 0;
        this.slidesToShow = this.getSlidesToShow(); // This will be 1
        this.maxIndex = Math.max(0, this.slides.length - this.slidesToShow);

        this.init();
        this.handleResize();
        this.updateCarousel(); // Call initially to set correct position
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        let startX = 0;
        let isDragging = false;
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                diff > 0 ? this.nextSlide() : this.prevSlide();
            }

            isDragging = false;
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        this.startAutoPlay();
    }

    getSlidesToShow() {
        return 1; // Always show one slide
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.slidesToShow = this.getSlidesToShow();
            this.maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
            this.updateCarousel();
        });
    }

    updateCarousel() {
        // Calculate translateX based on the full width of the track,
        // as each slide now takes up 100% of the track.
        const translateX = -this.currentIndex * this.track.offsetWidth;
        this.track.style.transform = `translateX(${translateX}px)`;

        // Add/remove 'active' class for scaling effect
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });


        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex ? '0.5' : '1';
        this.prevBtn.disabled = this.currentIndex === 0; // Disable button when at start
        this.nextBtn.disabled = this.currentIndex >= this.maxIndex; // Disable button when at end
    }

    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
            this.resetAutoPlay();
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
            this.resetAutoPlay();
        }
    }

    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => {
            this.currentIndex = (this.currentIndex >= this.maxIndex) ? 0 : this.currentIndex + 1;
            this.updateCarousel();
        }, 5000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayTimer);
        this.startAutoPlay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}































// JavaScript for tagline animation
const taglines = document.querySelectorAll('.tagline');
let currentTaglineIndex = 0;

function showNextTagline() {
    // Remove 'active-tagline' from the current tagline
    taglines[currentTaglineIndex].classList.remove('active-tagline');

    // Move to the next tagline, loop back to the beginning if at the end
    currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;

    // Add 'active-tagline' to the new current tagline
    taglines[currentTaglineIndex].classList.add('active-tagline');
}

// Show the first tagline immediately
taglines[currentTaglineIndex].classList.add('active-tagline');

// Set an interval to change taglines every 8 seconds (matching image fade duration)
setInterval(showNextTagline, 8000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255,255,255,0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});
// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);
document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});
// Animated counter for stats
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.innerHTML = current + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(number => {
                const finalValue = parseInt(number.textContent);
                number.textContent = '0';
                if (number.textContent.includes('+')) {
                    number.dataset.suffix = '+';
                }
                animateValue(number, 0, finalValue, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}





// Form submission
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show success message (you can replace this with actual form submission logic)
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});
// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        // hero.style.transform = `translateY(${scrolled * 0.5}px)`; // Removed for now to avoid conflict with bg slideshow
    }
});









document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (toggleBtn && closeBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        // Optional: close menu when a link is clicked
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
});



















class SecondCarousel {
    constructor() {
        this.track = document.getElementById('secondTrack');
        this.slides = document.querySelectorAll('.second-slide');
        this.prevBtn = document.getElementById('secondPrev');
        this.nextBtn = document.getElementById('secondNext');
        this.currentIndex = 0;
        this.slidesToShow = 1; // Default to 1 for mobile, adjusted on resize
        this.maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
        this.init();
        this.handleResize();
        this.update();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        let startX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const deltaX = startX - endX;

            if (Math.abs(deltaX) > 50) { // Threshold for a swipe
                if (deltaX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            isDragging = false;
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            }
            if (e.key === 'ArrowRight') {
                this.next();
            }
        });

        this.auto();
    }

    handleResize() {
        window.addEventListener('resize', () => {
            // Determine slidesToShow based on window width
            if (window.innerWidth <= 480) { // Small mobile devices
                this.slidesToShow = 1;
            } else if (window.innerWidth <= 768) { // Tablets and larger mobile
                this.slidesToShow = 1; // Still 1 for this design based on CSS
            } else if (window.innerWidth <= 1200) { // Laptops
                this.slidesToShow = 1; // Still 1 for this design based on CSS
            } else { // Desktops
                this.slidesToShow = 1; // Still 1 for this design based on CSS
            }

            this.maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
            this.currentIndex = Math.min(this.currentIndex, this.maxIndex); // Ensure current index is valid after resize
            this.update();
        });
        // Initial call to set correct slidesToShow on load
        window.dispatchEvent(new Event('resize'));
    }

    update() {
        // Calculate the transform value
        // We are translating by the width of a single slide multiplied by the current index.
        // this.track.offsetWidth gives the total width of the track, so we divide by the number of slides
        // to get the width of a single slide assuming they are full width of the track.
        // However, since second-slide has flex: 0 0 100%, each slide takes 100% of its parent's width (the track).
        // So, we just need the width of the track, which effectively is the width of one slide's display area.
        const slideWidth = this.track.offsetWidth / this.slidesToShow;
        const translateXValue = -this.currentIndex * slideWidth;
        this.track.style.transform = `translateX(${translateXValue}px)`;

        // Add/remove 'active' class for styling
        this.slides.forEach((s, i) => {
            s.classList.toggle('active', i === this.currentIndex);
        });

        // Update button opacity and disabled state
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex ? '0.5' : '1';
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
    }

    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.update();
            this.reset(); // Reset auto-play timer on manual interaction
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.update();
            this.reset(); // Reset auto-play timer on manual interaction
        }
    }

    auto() {
        // Clear any existing timer to prevent multiple intervals running
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.currentIndex = (this.currentIndex >= this.maxIndex) ? 0 : this.currentIndex + 1;
            this.update();
        }, 5000); // Change slide every 5 seconds
    }

    reset() {
        clearInterval(this.timer);
        this.auto();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SecondCarousel();
});








