var animation = bodymovin.loadAnimation({
    container: document.getElementById("path-test-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "garden_path_bodymovin_003.json"
})


// Ensure scroll events are properly attached
//const stack = document.querySelector('.image-stack');
//stack.addEventListener('scroll', function() {
//console.log('Scrolling:', this.scrollTop);
//});

// Or use wheel events
//stack.addEventListener('wheel', function(e) {
//e.preventDefault();
//this.scrollBy(0, e.deltaY);
//});
document.getElementById('person-with-headache-image').style.filter = 'none';
document.getElementById('person-with-headache-image').style.transform = 'none';

// Function to check if headache image is centered on screen
function checkHeadachImageCentered() {
    const headacheImg = document.querySelector('.headache-person img');
    if (!headacheImg) return false;

    const rect = headacheImg.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const imageCenter = rect.top + rect.height / 2;
    
    // Check if image center is within ~100px of viewport center
    const offset = 100;
    return Math.abs(imageCenter - viewportCenter) < offset;
}

// Monitor scroll to disable/enable based on headache image position
window.addEventListener('scroll', function() {
    if (checkHeadachImageCentered()) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}, { passive: true });

// Initial check on page load
window.addEventListener('load', function() {
    if (checkHeadachImageCentered()) {
        document.body.style.overflow = 'hidden';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const imageStack = document.getElementById('imageStack');
    const imageItems = document.querySelectorAll('.image-item');
    const indicator = document.getElementById('indicator');

    let currentIndex = 0;
    const totalImages = imageItems.length;
    
    // Images 4-7 (indices 4-7) allow simultaneous scrolling
    const simultaneousScrollIndices = [4, 5, 6, 7];

    // Initialize first image
    updateIndicator();

    // Handle scroll events
    let isScrolling = false;

    imageStack.addEventListener('wheel', function (e) {
        const inSimultaneousMode = simultaneousScrollIndices.includes(currentIndex);
        
        // Only prevent default if NOT in simultaneous scroll mode
        if (!inSimultaneousMode) {
            e.preventDefault();
            
            if (isScrolling) return;
            isScrolling = true;

            const delta = e.deltaY;

            if (delta > 0) {
                // Scroll down - next image
                currentIndex = Math.min(currentIndex + 1, totalImages - 1);
            } else {
                // Scroll up - previous image
                currentIndex = Math.max(currentIndex - 1, 0);
            }

            updateStack();
            updateIndicator();

            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 300);
        }
        // In simultaneous mode, allow default scroll behavior (page scrolls normally)
    });

    // Handle touch swipe for mobile
    let startY = 0;

    imageStack.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });

    imageStack.addEventListener('touchend', function (e) {
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                // Swipe up - next image
                currentIndex = Math.min(currentIndex + 1, totalImages - 1);
            } else {
                // Swipe down - previous image
                currentIndex = Math.max(currentIndex - 1, 0);
            }

            updateStack();
            updateIndicator();
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

    // Optional: Add keyboard navigation
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

    //reactivate page scroll on later images
