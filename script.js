document.addEventListener('DOMContentLoaded', function() {
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Toggle visibility on click
    dropbtn.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Log to see if the click event fires
        console.log("Button clicked");

        // Directly toggle display property for testing
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
            console.log("Dropdown content visible");
        }
    });
});
