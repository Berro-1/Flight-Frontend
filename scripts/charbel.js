document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.title');
    const plane = document.querySelector('.leaf1'); // Airplane image
    const cloudsFar = document.querySelector('.leaf2');
    const cloudsNear1 = document.querySelector('.bush2'); // Clouds image
    const cloudsNear2 = document.querySelector('.bush1'); // Clouds image
    const mountainLeft = document.querySelector('.mount1');
    const mountainRight = document.querySelector('.mount2');
    const popup = document.querySelector('.popup'); // Popup GIF
    const searchBox = document.querySelector('.search-box'); // The target section
    const modal = document.getElementById("modal"); // Modal element
    const closeBtn = document.querySelector(".close"); // Close button in the modal

    let windowWidth = window.innerWidth;
    let isPlaneMoving = true;
    let popupShown = false; // Track if the popup has been shown
    let popupStartPosition = 0; // To record the start position for the popup movement

    // Event listener for the charbel gif
    if (popup) {
        popup.addEventListener('click', function() {
            modal.style.display = "flex"; // Show the modal
        });
    }

    // Event listener to close the modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none"; // Hide the modal
        });
    }

    // Event listener to close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal
        }
    });

    function updateElementPositions(scrollY) {
        if (isPlaneMoving) {
            let planeRightEdge = plane ? plane.getBoundingClientRect().right : 0;

            if (planeRightEdge < windowWidth) {
                if (plane) plane.style.transform = `translateX(${scrollY}px)`;

                // Check if the airplane reaches the 400px position
                if (planeRightEdge >= 550 && !popupShown) {
                    if (popup) popup.style.display = 'block'; // Show the popup
                    popupShown = true; // Mark popup as shown
                    popupStartPosition = scrollY - 200; // Set the start position for moving the popup
                }
            } else {
                // Unlock scrolling and stop airplane movement
                isPlaneMoving = false;
                document.body.style.overflowY = 'scroll';
            }
        }

        if (popupShown) {
            let maxScrollDistance = searchBox ? searchBox.offsetTop - popupStartPosition : 0; // Distance to search box
            let currentScrollDistance = scrollY - popupStartPosition; // Current scroll distance
            let translateYValue = Math.min(currentScrollDistance, maxScrollDistance) * 0.5; // Calculate translateY, limited to maxScrollDistance
            if (popup) popup.style.top = `${10 + translateYValue}px`; // Update top position

            // Stop Charbel if it reaches the search box
            if (translateYValue >= maxScrollDistance) {
                popup.style.display = 'none';
            }
        }

        // Adjust the movement speed of each element to create a parallax effect
        if (title) title.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.8}px))`;
        if (cloudsFar) cloudsFar.style.transform = `translateX(${-scrollY * 0.5}px)`; // Clouds movement
        if (cloudsNear1) cloudsNear1.style.transform = `translateX(${scrollY * 0.3}px)`; // Clouds movement
        if (cloudsNear2) cloudsNear2.style.transform = `translateX(${-scrollY * 0.3}px)`; // Clouds movement
        if (mountainLeft) mountainLeft.style.transform = `translateY(${scrollY * 0.2}px)`; // Mountains movement
        if (mountainRight) mountainRight.style.transform = `translateY(${scrollY * 0.1}px)`; // Mountains movement
    }

    window.addEventListener('scroll', function() {
        updateElementPositions(window.scrollY);
    });

    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth; // Update windowWidth on window resize
    });
});
