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




//ROSE PLAQUE OVERLAY
document.addEventListener('DOMContentLoaded', function () {
    const rosePlaqueButton = document.getElementById('rosePlaqueButton');

    if (rosePlaqueButton) {
        rosePlaqueButton.addEventListener('click', function (event) {
            event.preventDefault();

            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Show modal with information
            showModal({
                title: "Rose",
                content: "Rose (Damask)<br></br> <i>Rosa x damascena</i><br></br>Rose oil has been used topically in traditional Persian medicine practices for headache relief.",
                image: "../garden-bed-images/plaque-overlay.png"
            });
        });
    }

    function showModal(data) {
        // Create modal element
        const modal = document.createElement('div');
        modal.id = 'plaqueModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
            text-align: center;
            line-height: 5;
        `;

        modal.innerHTML = `
            <div style="background: url(${data.image}); background-size: cover; background-repeat: no-repeat; overflow-y: auto; text-align: center; margin-right: 20%; margin-left: 20%; margin-top: 0; margin-bottom: 0;">
                <h2 style="line-height: 1.5; text-align: center; color: white; font-size: 200%; margin-top: 10%; margin-bottom: 8%;">${data.title}</h2>
                <p style="padding: 10%; line-height: 1.2; font-size: 18px; color: white; ">${data.content}</p>
                <button onclick="this.parentElement.parentElement.remove()" style="background: url(../plant-pages-images/back-to-garden.png) no-repeat center center; background-size: cover; border: none; cursor: pointer; font-size: 200%; transition: all 0.3s; width: 200px; height: 50px; margin-top: 10%; margin-bottom: 10%;">&ZeroWidthSpace;</button>
            </div>
        `;



        document.body.appendChild(modal);
    }
});

//FEVERFEW PLAQUE OVERLAY
document.addEventListener('DOMContentLoaded', function () {
    const feverfewPlaqueButton = document.getElementById('feverfewPlaqueButton');

    if (feverfewPlaqueButton) {
        feverfewPlaqueButton.addEventListener('click', function (event) {
            event.preventDefault();

            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Show modal with information
            showModal({
                title: "Feverfew",
                content: "<i>Tanacetum parthenium</i><br></br>Feverfew has traditionally been used across Britain for migraine relief. Leaves of the plant were consumed directly, brewed into teas, or dried and consumed as powders.",
                image: "../garden-bed-images/plaque-overlay.png"
            });
        });
    }

    function showModal(data) {
        // Create modal element
        const modal = document.createElement('div');
        modal.id = 'plaqueModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
            text-align: center;
            line-height: 5;
        `;

        modal.innerHTML = `
            <div style="background: url(${data.image}); background-size: cover; background-repeat: no-repeat; overflow-y: auto; text-align: center; margin-right: 20%; margin-left: 20%; margin-top: 0; margin-bottom: 0;">
                <h2 style="line-height: 1.5; text-align: center; color: white; font-size: 200%; margin-top: 10%; margin-bottom: 8%;">${data.title}</h2>
                <p style="padding: 10%; line-height: 1.2; font-size: 18px; color: white; ">${data.content}</p>
                <button onclick="this.parentElement.parentElement.remove()" style="background: url(../plant-pages-images/back-to-garden.png) no-repeat center center; background-size: cover; border: none; cursor: pointer; font-size: 200%; transition: all 0.3s; width: 200px; height: 50px; margin-top: 10%; margin-bottom: 10%;">&ZeroWidthSpace;</button>
            </div>
        `;



        document.body.appendChild(modal);
    }
});

//RUE PLAQUE OVERLAY
document.addEventListener('DOMContentLoaded', function () {
    const ruePlaqueButton = document.getElementById('ruePlaqueButton');

    if (ruePlaqueButton) {
        ruePlaqueButton.addEventListener('click', function (event) {
            event.preventDefault();

            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Show modal with information
            showModal({
                title: "Rue",
                content: "<i>Ruta graveleons</i><br></br>Rue has been used in traditional Chinese medicine and Tzeltal Maya traditional medicine for headache relief, typically through consumption of the leaves directly or as a tea.",
                image: "../garden-bed-images/plaque-overlay.png"
            });
        });
    }

    function showModal(data) {
        // Create modal element
        const modal = document.createElement('div');
        modal.id = 'plaqueModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
            text-align: center;
            line-height: 5;
        `;

        modal.innerHTML = `
            <div style="background: url(${data.image}); background-size: cover; background-repeat: no-repeat; overflow-y: auto; text-align: center; margin-right: 20%; margin-left: 20%; margin-top: 0; margin-bottom: 0;">
                <h2 style="line-height: 1.5; text-align: center; color: white; font-size: 200%; margin-top: 10%; margin-bottom: 8%;">${data.title}</h2>
                <p style="padding: 10%; line-height: 1.2; font-size: 18px; color: white; ">${data.content}</p>
                <button onclick="this.parentElement.parentElement.remove()" style="background: url(../plant-pages-images/back-to-garden.png) no-repeat center center; background-size: cover; border: none; cursor: pointer; font-size: 200%; transition: all 0.3s; width: 200px; height: 50px; margin-top: 10%; margin-bottom: 10%;">&ZeroWidthSpace;</button>
            </div>
        `;



        document.body.appendChild(modal);
    }
});

//CHAMOMILE PLAQUE OVERLAY
document.addEventListener('DOMContentLoaded', function () {
    const chamomilePlaqueButton = document.getElementById('chamomilePlaqueButton');

    if (chamomilePlaqueButton) {
        chamomilePlaqueButton.addEventListener('click', function (event) {
            event.preventDefault();

            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Show modal with information
            showModal({
                title: "Chamomile",
                content: "<i>Matricaria chammomila</i><br></br>Chamomile oil has been used topically in traditional Persian medicine for the relief of migraine-type headaches.",
                image: "../garden-bed-images/plaque-overlay.png"
            });
        });
    }

    function showModal(data) {
        // Create modal element
        const modal = document.createElement('div');
        modal.id = 'plaqueModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
            text-align: center;
            line-height: 5;
        `;

        modal.innerHTML = `
            <div style="background: url(${data.image}); background-size: cover; background-repeat: no-repeat; overflow-y: auto; text-align: center; margin-right: 20%; margin-left: 20%; margin-top: 0; margin-bottom: 0;">
                <h2 style="line-height: 1.5; text-align: center; color: white; font-size: 200%; margin-top: 10%; margin-bottom: 8%;">${data.title}</h2>
                <p style="padding: 10%; line-height: 1.2; font-size: 18px; color: white; ">${data.content}</p>
                <button onclick="this.parentElement.parentElement.remove()" style="background: url(../plant-pages-images/back-to-garden.png) no-repeat center center; background-size: cover; border: none; cursor: pointer; font-size: 200%; transition: all 0.3s; width: 200px; height: 50px; margin-top: 10%; margin-bottom: 10%;">&ZeroWidthSpace;</button>
            </div>
        `;



        document.body.appendChild(modal);
    }
});

console.log("yo")

//willow bark





// ARCTIC WILLOW LIGHTBOX WITH SCROLLYTELLY

// Open lightbox function
function openLightbox() {
    const willowLightbox = document.getElementById('willowLightbox');
    const willowIframe = document.getElementById('willow-lightbox-iframe');

    // Set the iframe source to your separate HTML page
    willowIframe.src = './pages/arctic-willow.html';

    // Show the lightbox
    willowLightbox.style.display = 'block';

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

// Close lightbox function
function closeLightbox() {
    const willowLightbox = document.getElementById('willowLightbox');
    const willowIframe = document.getElementById('willow-lightbox-iframe');

    // Hide the lightbox
    willowLightbox.style.display = 'none';

    // Re-enable background scrolling
    document.body.style.overflow = 'auto';

    // Clear iframe content to prevent loading issues
    willowIframe.src = '';
}

// Close lightbox when clicking outside the content
window.onclick = function (event) {
    const willowLightbox = document.getElementById('willowLightbox');
    if (event.target === willowLightbox) {
        closeLightbox();
    }
}

// Close with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});




//scroll to change map 
const track = document.getElementById("mapScrollTrack");
const layers = Array.from(document.querySelectorAll(".map-layer"));
let currentIndex = 0; // Initialize the current index for the layers.

function crossfadeTo(nextIndex) {
    if (nextIndex === currentIndex) {
        return;
    }

    // Show and foreground the incoming layer first.
    layers.forEach((layer, index) => {
        if (index === nextIndex) {
            layer.classList.add("visible", "front");
        } else {
            layer.classList.remove("front");
        }
    });

    // On the next frame, fade out non-active layers so there is never a blank frame.
    requestAnimationFrame(() => {
        layers.forEach((layer, index) => {
            if (index !== nextIndex) {
                layer.classList.remove("visible");
            }
        });
    });

    currentIndex = nextIndex;
}

function updateMapState() {
    const rect = track.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;

    if (totalScrollable <= 0) {
        return;
    }

    // Normalize this section's scroll position to 0..1 and switch at the midpoint.
    const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
    const nextIndex = progress < 0.5 ? 0 : 1;
    crossfadeTo(nextIndex);
}
console.log("hi");

// Initialize once, then keep state in sync with scroll and resize.
updateMapState();
window.addEventListener("scroll", updateMapState, { passive: true });
window.addEventListener("resize", updateMapState);

