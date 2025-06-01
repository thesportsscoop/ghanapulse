document.addEventListener('DOMContentLoaded', () => {
    // Highlight active navigation link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    navLinks.forEach(link => {
        // Handle active class for navigation
        // If the current path starts with the link's href, mark it active
        // This covers /politics/ and /politics/some-post/ for the politics link
        if (currentPath.startsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        }
        // Special case for home page
        if (currentPath === '/' && link.getAttribute('href') === '/') {
            link.classList.add('active');
        }
    });

    // Logo/site name is already handled by href="/"
});