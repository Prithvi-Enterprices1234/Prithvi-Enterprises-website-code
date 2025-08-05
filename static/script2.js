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














  // Disable right-click
document.addEventListener('contextmenu', event => event.preventDefault());



document.onkeydown = function(e) {
    if (e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) || // Ctrl+Shift+C
        (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) // Ctrl+U
    ) {
      return false;
    }
  };










