document.addEventListener('DOMContentLoaded', function () {
    const imageStack = document.getElementById('imageStack');
    const imageItems = document.querySelectorAll('.image-item');
    const indicator = document.getElementById('indicator');

    let currentIndex = 0;
    const totalImages = imageItems.length;

    // Images 5, 6, 7, 8 (displayed) = indices 4, 5, 6, 7 (0-based) - allow simultaneous scrolling with page
    const simultaneousScrollIndices = [4, 5, 6, 7];
    const pageScrollSpeedMultiplier = 6; // Speed up page scrolling on images 5-8

    // Gallery scroll is only enabled after headache person reaches middle of page
    let galleryScrollEnabled = false;
    const headachePerson = document.querySelector('.headache-person');

    // Initialize first image
    updateIndicator();

    // Monitor when headache person reaches one-third from top of viewport
    window.addEventListener('scroll', function () {
        if (!galleryScrollEnabled && headachePerson) {
            const rect = headachePerson.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const triggerPoint = window.innerHeight / 4;

            // Check if element center is at or below one-third point of viewport
            if (elementCenter >= triggerPoint) {
                galleryScrollEnabled = true;
            }
        }
    });

    // Handle scroll events
    let isScrolling = false;

    imageStack.addEventListener('wheel', function (e) {
        // Only allow gallery scrolling after headache person reaches middle of page
        if (!galleryScrollEnabled) {
            return;
        }

        const inSimultaneousMode = simultaneousScrollIndices.includes(currentIndex);
        const delta = e.deltaY;

        // Allow backwards page scroll when on image 1 and scrolling up
        if (currentIndex === 0 && delta < 0) {
            // Don't prevent default - allow page to scroll backwards
            return;
        }

        // Prevent default for all other modes to handle gallery scrolling
        e.preventDefault();

        if (isScrolling) return;
        isScrolling = true;

        if (delta > 0) {
            // Scroll down - next image
            currentIndex = Math.min(currentIndex + 1, totalImages - 1);
        } else {
            // Scroll up - previous image
            currentIndex = Math.max(currentIndex - 1, 0);
        }

        updateStack();
        updateIndicator();

        // In simultaneous mode, also scroll the page with speed multiplier
        if (inSimultaneousMode) {
            window.scrollBy(0, delta * pageScrollSpeedMultiplier);
        }

        // Reset scrolling flag after animation
        setTimeout(() => {
            isScrolling = false;
        }, 300);
    }, { passive: false });

    // Handle touch swipe for mobile
    let startY = 0;

    imageStack.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });

    imageStack.addEventListener('touchend', function (e) {
        // Only allow gallery scrolling after headache person reaches middle of page
        if (!galleryScrollEnabled) {
            return;
        }

        const inSimultaneousMode = simultaneousScrollIndices.includes(currentIndex);
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            // Allow backwards page scroll when on image 1 and swiping down (backwards)
            if (currentIndex === 0 && diff < 0) {
                // Don't navigate gallery - allow page to scroll backwards naturally
                return;
            }

            if (isScrolling) return;
            isScrolling = true;

            if (diff > 0) {
                // Swipe up - next image
                currentIndex = Math.min(currentIndex + 1, totalImages - 1);
            } else {
                // Swipe down - previous image
                currentIndex = Math.max(currentIndex - 1, 0);
            }

            updateStack();
            updateIndicator();

            // In simultaneous mode, also scroll the page with speed multiplier
            if (inSimultaneousMode) {
                window.scrollBy(0, diff * pageScrollSpeedMultiplier);
            }

            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 300);
        }
    });

    function updateStack() {
        imageItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function updateIndicator() {
        indicator.textContent = `${currentIndex + 1} / ${totalImages}`;
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateStack();
            updateIndicator();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            currentIndex = Math.min(currentIndex + 1, totalImages - 1);
            updateStack();
            updateIndicator();
        }
    });
});


// adding scroll to headache types
document.addEventListener("DOMContentLoaded", () => {


    const steps = document.querySelectorAll(".story-step");
    const visuals = document.querySelectorAll(".visual");


    function setActiveVisual(visualNumber) {
        visuals.forEach(v => v.classList.remove("active"));


        const target = document.getElementById("visual-" + visualNumber);
        if (target) target.classList.add("active");
    }


    function onScroll() {
        const marker = window.scrollY + window.innerHeight * 0.5;


        steps.forEach(step => {
            const top = step.offsetTop;
            const bottom = top + step.offsetHeight;


            if (marker >= top && marker < bottom) {
                const visualNumber = step.getAttribute("data-visual");
                setActiveVisual(visualNumber);
            }
        });
    }


    window.addEventListener("scroll", onScroll);
    onScroll(); // run once at the start
});

// Fade-in on scroll
document.addEventListener('DOMContentLoaded', function () {
    const fadeInElements = document.querySelectorAll('.fade-in');

    function checkFadeIn() {
        const triggerBottom = window.innerHeight * 0.8; // Trigger when element is 80% into the viewport

        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFadeIn);
    checkFadeIn(); // Check on load
});
