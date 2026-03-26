// Image stack management
class ImageStack {
    constructor(container) {
        this.container = container;
        this.images = Array.from(container.querySelectorAll('.map-image'));
        this.currentIndex = 0;
        this.isScrolling = false;

        // Initialize the stack
        this.init();
    }

    init() {
        // Set initial active image
        this.showImage(0);

        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Add resize event listener
        window.addEventListener('resize', this.handleResize.bind(this));

        // Add wheel event for smooth scrolling
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    }

    handleScroll() {
        if (this.isScrolling) return;

        this.isScrolling = true;

        // Get the container position relative to viewport
        const rect = this.container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress (0-1)
        let progress = 0;

        // If container is in view, calculate progress based on position
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate how much of the container is visible
            const containerHeight = rect.height;
            const viewportCenter = windowHeight / 2;
            const containerCenter = rect.top + containerHeight / 2;

            // Progress from top to bottom (0 at top, 1 at bottom)
            progress = Math.max(0, Math.min(1, (containerCenter - rect.top) / containerHeight));
        }

        // Calculate which image should be active based on scroll position
        const newIndex = Math.floor(progress * (this.images.length - 1));

        if (newIndex !== this.currentIndex) {
            this.showImage(newIndex);
        }

        // Debounce scroll handler
        setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    }

    handleResize() {
        // Re-calculate positions on resize
        this.handleScroll();
    }

    handleWheel(e) {
        // Prevent default scrolling when wheel is over the container
        const rect = this.container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            // Only prevent default if we're actually in the container area
            e.preventDefault();
        }
    }

    showImage(index) {
        if (index < 0 || index >= this.images.length) return;

        // Hide current image
        const currentImage = this.images[this.currentIndex];
        if (currentImage) {
            currentImage.classList.remove('active');
        }

        // Show new image
        const newImage = this.images[index];
        if (newImage) {
            newImage.classList.add('active');
        }

        this.currentIndex = index;
    }

    // Method to manually change images (for testing)
    nextImage() {
        const newIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(newIndex);
    }

    prevImage() {
        const newIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(newIndex);
    }
}

// Scroll freezing functionality
function checkMapPosition() {
    const mapContainer = document.getElementById('mapContainer');
    const rect = mapContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if map is centered (within 50px of center)
    const isCentered = Math.abs(rect.top - (windowHeight / 2)) < 50;

    if (isCentered) {
        freezeScroll();
    } else {
        unfreezeScroll();
    }
}

function freezeScroll() {
    const body = document.body;
    const html = document.documentElement;

    // Store the scroll position
    const scrollTop = window.pageYOffset || html.scrollTop;

    // Add class to freeze scroll
    body.classList.add('scroll-freeze');
    html.classList.add('scroll-freeze');

    // Apply fixed positioning and maintain scroll position
    body.style.position = 'fixed';
    body.style.top = `-${scrollTop}px`;
    body.style.width = '100%';
}

function unfreezeScroll() {
    const body = document.body;
    const html = document.documentElement;

    // Remove freeze classes
    body.classList.remove('scroll-freeze');
    html.classList.remove('scroll-freeze');

    // Restore scroll position
    window.scrollTo(0, parseInt(body.style.top || '0') * -1);

    // Reset styles
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('mapContainer');

    if (mapContainer) {
        // Initialize image stack
        const imageStack = new ImageStack(mapContainer);

        // Add keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight') {
                imageStack.nextImage();
            } else if (e.key === 'ArrowLeft') {
                imageStack.prevImage();
            }
        });

        // Add click to toggle between images
        mapContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('map-image')) {
                // Toggle between first and second image on click
                const currentIndex = Array.from(mapContainer.querySelectorAll('.map-image'))
                    .findIndex(img => img.classList.contains('active'));
                const nextIndex = (currentIndex + 1) % 2;
                imageStack.showImage(nextIndex);
            }
        });
    }

    // Add scroll position checking for freeze effect
    window.addEventListener('scroll', checkMapPosition);

    // Initial check
    checkMapPosition();
});

// Additional functionality for better UX
document.addEventListener('DOMContentLoaded', function () {
    // Add a small delay before starting to prevent initial flickering
    setTimeout(() => {
        const mapContainer = document.getElementById('mapContainer');
        if (mapContainer) {
            // Trigger scroll event to set initial state
            window.dispatchEvent(new Event('scroll'));
        }
    }, 100);
});


//map images stack
// Image stack management
class ImageStack {
    constructor(container) {
        this.container = container;
        this.images = Array.from(container.querySelectorAll('.map-image'));
        this.currentIndex = 0;
        this.isScrolling = false;

        // Initialize the stack
        this.init();
    }

    init() {
        // Set initial active image
        this.showImage(0);

        // Add scroll event listener
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Add resize event listener
        window.addEventListener('resize', this.handleResize.bind(this));

        // Add wheel event for smooth scrolling
        window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    }

    handleScroll() {
        if (this.isScrolling) return;

        this.isScrolling = true;

        // Get the container position relative to viewport
        const rect = this.container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress (0-1)
        let progress = 0;

        // If container is in view, calculate progress based on position
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate how much of the container is visible
            const containerHeight = rect.height;
            const viewportCenter = windowHeight / 2;
            const containerCenter = rect.top + containerHeight / 2;

            // Progress from top to bottom (0 at top, 1 at bottom)
            progress = Math.max(0, Math.min(1, (containerCenter - rect.top) / containerHeight));
        }

        // Calculate which image should be active based on scroll position
        const newIndex = Math.floor(progress * (this.images.length - 1));

        if (newIndex !== this.currentIndex) {
            this.showImage(newIndex);
        }

        // Debounce scroll handler
        setTimeout(() => {
            this.isScrolling = false;
        }, 100);
    }

    handleResize() {
        // Re-calculate positions on resize
        this.handleScroll();
    }

    handleWheel(e) {
        // Prevent default scrolling when wheel is over the container
        const rect = this.container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            // Only prevent default if we're actually in the container area
            e.preventDefault();
        }
    }

    showImage(index) {
        if (index < 0 || index >= this.images.length) return;

        // Hide current image
        const currentImage = this.images[this.currentIndex];
        if (currentImage) {
            currentImage.classList.remove('active');
        }

        // Show new image
        const newImage = this.images[index];
        if (newImage) {
            newImage.classList.add('active');
        }

        this.currentIndex = index;
    }

    // Method to manually change images (for testing)
    nextImage() {
        const newIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(newIndex);
    }

    prevImage() {
        const newIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(newIndex);
    }
}

// Scroll freezing functionality
function checkMapPosition() {
    const mapContainer = document.getElementById('mapContainer');
    const rect = mapContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if map is centered (within 50px of center)
    const isCentered = Math.abs(rect.top - (windowHeight / 2)) < 50;

    if (isCentered) {
        freezeScroll();
    } else {
        unfreezeScroll();
    }
}

function freezeScroll() {
    const body = document.body;
    const html = document.documentElement;

    // Store the scroll position
    const scrollTop = window.pageYOffset || html.scrollTop;

    // Add class to freeze scroll
    body.classList.add('scroll-freeze');
    html.classList.add('scroll-freeze');

    // Apply fixed positioning and maintain scroll position
    body.style.position = 'fixed';
    body.style.top = `-${scrollTop}px`;
    body.style.width = '100%';
}

function unfreezeScroll() {
    const body = document.body;
    const html = document.documentElement;

    // Remove freeze classes
    body.classList.remove('scroll-freeze');
    html.classList.remove('scroll-freeze');

    // Restore scroll position
    window.scrollTo(0, parseInt(body.style.top || '0') * -1);

    // Reset styles
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('mapContainer');

    if (mapContainer) {
        // Initialize image stack
        const imageStack = new ImageStack(mapContainer);

        // Add keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight') {
                imageStack.nextImage();
            } else if (e.key === 'ArrowLeft') {
                imageStack.prevImage();
            }
        });

        // Add click to toggle between images
        mapContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('map-image')) {
                // Toggle between first and second image on click
                const currentIndex = Array.from(mapContainer.querySelectorAll('.map-image'))
                    .findIndex(img => img.classList.contains('active'));
                const nextIndex = (currentIndex + 1) % 2;
                imageStack.showImage(nextIndex);
            }
        });
    }

    // Add scroll position checking for freeze effect
    window.addEventListener('scroll', checkMapPosition);

    // Initial check
    checkMapPosition();
});

// Additional functionality for better UX
document.addEventListener('DOMContentLoaded', function () {
    // Add a small delay before starting to prevent initial flickering
    setTimeout(() => {
        const mapContainer = document.getElementById('mapContainer');
        if (mapContainer) {
            // Trigger scroll event to set initial state
            window.dispatchEvent(new Event('scroll'));
        }
    }, 100);
});


//troubleshooting
// Debugging function to help identify issues
function debugLog(message, data = null) {
    console.log(`[DEBUG] ${message}`, data);
}

class ImageStack {
    constructor(container) {
        this.container = container;
        this.images = Array.from(container.querySelectorAll('.map-image'));
        this.currentIndex = 0;
        this.isScrolling = false;
        this.scrollTimeout = null;

        debugLog('ImageStack initialized', {
            container: container,
            images: this.images,
            imageCount: this.images.length
        });

        if (this.images.length < 2) {
            console.error('Not enough images for stack');
            return;
        }

        // Initialize with first image active
        this.setActiveImage(0);

        this.initScrollHandler();
    }

    initScrollHandler() {
        debugLog('Initializing scroll handler');

        // Use requestAnimationFrame for better performance
        const handleScroll = () => {
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }

            this.scrollTimeout = setTimeout(() => {
                this.updateActiveImage();
            }, 10); // Reduced debounce time
        };

        // Add scroll listener to window
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Also listen for resize events
        window.addEventListener('resize', handleScroll);

        // Initial update
        this.updateActiveImage();
    }

    setActiveImage(index) {
        debugLog('Setting active image', { index, current: this.currentIndex });

        if (index < 0 || index >= this.images.length) {
            console.error('Invalid image index:', index);
            return;
        }

        // Remove active class from all images
        this.images.forEach(img => {
            img.classList.remove('active');
        });

        // Add active class to selected image
        this.images[index].classList.add('active');
        this.currentIndex = index;

        debugLog('Active image set', {
            index,
            element: this.images[index],
            className: this.images[index].className
        });
    }

    updateActiveImage() {
        debugLog('Updating active image based on scroll position');

        if (!this.container) return;

        // Get container position
        const rect = this.container.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const containerTop = rect.top + window.pageYOffset;
        const containerBottom = containerTop + rect.height;
        const containerCenter = containerTop + (rect.height / 2);

        debugLog('Container positions', {
            top: containerTop,
            bottom: containerBottom,
            center: containerCenter,
            windowHeight: windowHeight
        });

        // Calculate scroll progress through container
        const scrollPosition = window.pageYOffset;
        const progress = Math.min(1, Math.max(0,
            (scrollPosition - containerTop + windowHeight / 2) / (rect.height)
        ));

        debugLog('Scroll progress', { progress });

        // Determine which image should be active
        const newIndex = Math.floor(progress * (this.images.length - 1));

        if (newIndex !== this.currentIndex) {
            debugLog('Changing active image', { from: this.currentIndex, to: newIndex });
            this.setActiveImage(newIndex);

            // Update debug info
            this.updateDebugInfo();
        }
    }

    updateDebugInfo() {
        const debug = document.getElementById('debug-info');
        if (debug) {
            debug.innerHTML = `
                <strong>Debug Info:</strong><br>
                Current Index: ${this.currentIndex}<br>
                Scroll Position: ${Math.floor(window.pageYOffset)}<br>
                Container Top: ${Math.floor(this.container.getBoundingClientRect().top + window.pageYOffset)}<br>
                Container Height: ${this.container.offsetHeight}
            `;
        }
    }

    // Add a method to manually test
    testImageChange() {
        debugLog('Testing image change');
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.setActiveImage(nextIndex);
    }
}

// Global variables for debugging
let imageStack = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    debugLog('DOM Content Loaded');

    const mapContainer = document.getElementById('mapContainer');

    if (mapContainer) {
        debugLog('Map container found', { element: mapContainer });

        // Create image stack instance
        imageStack = new ImageStack(mapContainer);

        // Add debug info element
        const debugInfo = document.createElement('div');
        debugInfo.id = 'debug-info';
        debugInfo.className = 'debug-info';
        document.body.appendChild(debugInfo);

        // Add keyboard navigation for testing
        document.addEventListener('keydown', function (e) {
            if (e.key === 't' || e.key === 'T') {
                debugLog('Manual test triggered');
                imageStack.testImageChange();
            }
        });

        // Add click to toggle between images
        mapContainer.addEventListener('click', function () {
            debugLog('Map clicked');
            if (imageStack) {
                const nextIndex = (imageStack.currentIndex + 1) % imageStack.images.length;
                imageStack.setActiveImage(nextIndex);
            }
        });

        // Add a test button for debugging
        const testButton = document.createElement('button');
        testButton.textContent = 'Test Image Change';
        testButton.style.position = 'fixed';
        testButton.style.top = '10px';
        testButton.style.left = '10px';
        testButton.style.zIndex = '1000';
        testButton.onclick = () => {
            if (imageStack) imageStack.testImageChange();
        };
        document.body.appendChild(testButton);

    } else {
        console.error('Map container not found');
    }
});

// Add scroll event listener for debugging
window.addEventListener('scroll', function () {
    // This will help us see when scroll events fire
    if (window.pageYOffset % 100 === 0) {
        debugLog('Scroll position:', window.pageYOffset);
    }
});


// Debugging function to help identify issues
function debugLog(message, data = null) {
    console.log(`[DEBUG] ${message}`, data);
}

// Global variables for debugging
let imageStack = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    debugLog('DOM Content Loaded');
    
    const mapContainer = document.getElementById('mapContainer');
    
    if (mapContainer) {
        debugLog('Map container found', { element: mapContainer });
        
        // Create image stack instance
        class ImageStack {
            constructor(container) {
                this.container = container;
                this.images = Array.from(container.querySelectorAll('.map-image'));
                this.currentIndex = 0;
                this.isScrolling = false;
                this.scrollTimeout = null;
                
                debugLog('ImageStack initialized', {
                    container: container,
                    images: this.images,
                    imageCount: this.images.length
                });
                
                if (this.images.length < 2) {
                    console.error('Not enough images for stack');
                    return;
                }
                
                // Initialize with first image active
                this.setActiveImage(0);
                
                this.initScrollHandler();
            }
            
            initScrollHandler() {
                debugLog('Initializing scroll handler');
                
                // Use requestAnimationFrame for better performance
                const handleScroll = () => {
                    if (this.scrollTimeout) {
                        clearTimeout(this.scrollTimeout);
                    }
                    
                    this.scrollTimeout = setTimeout(() => {
                        this.updateActiveImage();
                    }, 10); // Reduced debounce time
                };
                
                // Add scroll listener to window
                window.addEventListener('scroll', handleScroll, { passive: true });
                
                // Also listen for resize events
                window.addEventListener('resize', handleScroll);
                
                // Initial update
                this.updateActiveImage();
            }
            
            setActiveImage(index) {
                debugLog('Setting active image', { index, current: this.currentIndex });
                
                if (index < 0 || index >= this.images.length) {
                    console.error('Invalid image index:', index);
                    return;
                }
                
                // Remove active class from all images
                this.images.forEach(img => {
                    img.classList.remove('active');
                });
                
                // Add active class to selected image
                this.images[index].classList.add('active');
                this.currentIndex = index;
                
                debugLog('Active image set', { 
                    index, 
                    element: this.images[index],
                    className: this.images[index].className 
                });
            }
            
            updateActiveImage() {
                debugLog('Updating active image based on scroll position');
                
                if (!this.container) return;
                
                // Get container position
                const rect = this.container.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                const containerTop = rect.top + window.pageYOffset;
                const containerBottom = containerTop + rect.height;
                const containerCenter = containerTop + (rect.height / 2);
                
                debugLog('Container positions', {
                    top: containerTop,
                    bottom: containerBottom,
                    center: containerCenter,
                    windowHeight: windowHeight
                });
                
                // Calculate scroll progress through container
                const scrollPosition = window.pageYOffset;
                const progress = Math.min(1, Math.max(0, 
                    (scrollPosition - containerTop + windowHeight / 2) / (rect.height)
                ));
                
                debugLog('Scroll progress', { progress });
                
                // Determine which image should be active
                const newIndex = Math.floor(progress * (this.images.length - 1));
                
                if (newIndex !== this.currentIndex) {
                    debugLog('Changing active image', { from: this.currentIndex, to: newIndex });
                    this.setActiveImage(newIndex);
                    
                    // Update debug info
                    this.updateDebugInfo();
                }
            }
            
            updateDebugInfo() {
                const debug = document.getElementById('debug-info');
                if (debug) {
                    debug.innerHTML = `
                        <strong>Debug Info:</strong><br>
                        Current Index: ${this.currentIndex}<br>
                        Scroll Position: ${Math.floor(window.pageYOffset)}<br>
                        Container Top: ${Math.floor(this.container.getBoundingClientRect().top + window.pageYOffset)}<br>
                        Container Height: ${this.container.offsetHeight}
                    `;
                }
            }
            
            // Add a method to manually test
            testImageChange() {
                debugLog('Testing image change');
                const nextIndex = (this.currentIndex + 1) % this.images.length;
                this.setActiveImage(nextIndex);
            }
        }

        // Create instance of ImageStack
        imageStack = new ImageStack(mapContainer);
        
        // Add debug info element
        const debugInfo = document.createElement('div');
        debugInfo.id = 'debug-info';
        debugInfo.className = 'debug-info';
        document.body.appendChild(debugInfo);
        
        // Add keyboard navigation for testing
        document.addEventListener('keydown', function(e) {
            if (e.key === 't' || e.key === 'T') {
                debugLog('Manual test triggered');
                imageStack.testImageChange();
            }
        });
        
        // Add click to toggle between images
        mapContainer.addEventListener('click', function() {
            debugLog('Map clicked');
            if (imageStack) {
                const nextIndex = (imageStack.currentIndex + 1) % imageStack.images.length;
                imageStack.setActiveImage(nextIndex);
            }
        });
        
        // Add a test button for debugging
        const testButton = document.createElement('button');
        testButton.textContent = 'Test Image Change';
        testButton.style.position = 'fixed';
        testButton.style.top = '10px';
        testButton.style.left = '10px';
        testButton.style.zIndex = '1000';
        testButton.onclick = () => {
            if (imageStack) imageStack.testImageChange();
        };
        document.body.appendChild(testButton);
        
    } else {
        console.error('Map container not found');
    }
});

// Add scroll event listener for debugging
window.addEventListener('scroll', function() {
    // This will help us see when scroll events fire
    if (window.pageYOffset % 100 === 0) {
        debugLog('Scroll position:', window.pageYOffset);
    }
});

//willow bark animation
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('barkScrollTrack');

    if (!container) {
        console.error('Container not found');
        return;
    }

    const images = Array.from(container.querySelectorAll('.bark-layer'));

    if (images.length < 2) {
        console.error('Not enough images for stack');
        return;
    }

    // Initialize first image as visible
    images[0].classList.add('visible');

    let currentImageIndex = 0;

    function updateImage() {
        const scrollPosition = window.scrollY;
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const containerHeight = containerRect.height;

        // Calculate which image should be visible
        const progress = Math.max(0, Math.min(1, (scrollPosition - containerTop) / containerHeight));
        const newIndex = Math.floor(progress * (images.length - 1));

        if (newIndex !== currentImageIndex) {
            images[currentImageIndex].classList.remove('visible');
            images[newIndex].classList.add('visible');
            currentImageIndex = newIndex;
        }
    }

    // Handle scroll events
    window.addEventListener('scroll', updateImage);

    // Initial update
    updateImage();

    console.log('Image stack initialized with', images.length, 'images');
});