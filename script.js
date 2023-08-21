// Wait for the page to fully load before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Get the elements that hold the numbers
    const numberElements = document.querySelectorAll(".box p");

    // Set the target numbers for each box
    const targetNumbers = [13878, 18817, 8.7];

    // Initialize the initialNumbers array with zeros
    const initialNumbers = [0, 0, 0];

    // Animation duration in milliseconds
    const animationDuration = 2500;

    // Delay before animation starts in milliseconds
    const animationDelay = 300; // 1 second delay

    // Calculate the step size for each box
    const stepSizes = targetNumbers.map((target, index) => {
        return target / (animationDuration / 100);
    });

    // Easing function: easeOutQuad
    Math.easeOutQuad = function (t) {
        return t * (2 - t);
    };

    // Function to update the numbers in the boxes
    function updateNumbers(timestamp) {
        if (!initialTime) initialTime = timestamp;
        const elapsedTime = timestamp - initialTime;

        for (let i = 0; i < numberElements.length; i++) {
            if (initialNumbers[i] < targetNumbers[i]) {
                const progress = Math.min(1, elapsedTime / animationDuration);
                const easedProgress = Math.easeOutQuad(progress);

                initialNumbers[i] = targetNumbers[i] * easedProgress;
                if (i < 2) {
                    numberElements[i].textContent = Math.floor(initialNumbers[i]);
                } else {
                    numberElements[i].textContent = initialNumbers[i].toFixed(1);
                }
            }
        }

        if (initialNumbers[0] < targetNumbers[0] && elapsedTime < animationDuration) {
            requestAnimationFrame(updateNumbers);
        }
    }

    // Initialize the animation
    let initialTime = null;
    setTimeout(() => {
        requestAnimationFrame(updateNumbers);
    }, animationDelay);
});
