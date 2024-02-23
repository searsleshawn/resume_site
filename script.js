document.addEventListener('DOMContentLoaded', function() {
    var dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        var content = dropdown.querySelector('.dropdown-content');

        dropdown.addEventListener('mouseover', function() {
            content.style.height = content.scrollHeight + 'px';
        });

        dropdown.addEventListener('mouseout', function() {
            content.style.height = 0;
        });

        // Add an event listener to adjust the height when the window is resized
        window.addEventListener('resize', function() {
            content.style.height = content.scrollHeight + 'px';
        });
    });
});