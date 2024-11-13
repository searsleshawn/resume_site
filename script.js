document.addEventListener('DOMContentLoaded', function() {
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Check if dropbtn and dropdownContent exist to avoid errors
    if (dropbtn && dropdownContent) {
        // Toggle visibility on click
        dropbtn.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Log to see if the click event fires
            console.log("Button clicked");

            // Toggle display property for the dropdown
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'block';
                console.log("Dropdown content visible");
            }
        });
    } else {
        console.warn("Dropdown button or content not found");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');

    // Function to check cursor position and toggle button visibility
    function toggleBackToTopButton(event) {
        const windowHeight = window.innerHeight;
        const thresholdY = windowHeight * 0.70; // 65% from the top, i.e., bottom 35%

        // Show the button if the cursor is within the bottom 35% of the screen
        if (event.clientY >= thresholdY) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    }

    // Add event listener for mouse movement
    window.addEventListener('mousemove', toggleBackToTopButton);

    // Smooth scroll to the top when the button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
