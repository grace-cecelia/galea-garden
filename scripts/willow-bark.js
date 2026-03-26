//willow bark scroll animation 
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('barkScrollTrack');
    const layers = document.querySelectorAll('.bark-layer');
    let currentLayer = 0;

console.log(container); 
console.log(layers);

    // Initialize first layer as visible
    if (layers.length > 0) {
        layers[0].classList.add('visible');
    }

    function updateLayers() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const containerTop = container.getBoundingClientRect().top + window.scrollY;
        const containerHeight = container.offsetHeight;

        console.log(scrollY);
console.log(containerTop);

// Calculate which layer should be visible
        const progress = Math.max(0, Math.min(1, (scrollY - containerTop) / containerHeight));
        const targetLayer = Math.floor(progress * (layers.length - 1));

        console.log(progress);
        if (targetLayer !== currentLayer) {
            layers[currentLayer].classList.remove('visible');
            layers[targetLayer].classList.add('visible');
            currentLayer = targetLayer;
        }
    }


    // Handle scroll events with throttling
    let ticking = false;

    function requestTick() {
        console.log("hiii");
        if (!ticking) {
            requestAnimationFrame(() => {
                updateLayers();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Add event listeners
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);

    // Initial update
    updateLayers();
});