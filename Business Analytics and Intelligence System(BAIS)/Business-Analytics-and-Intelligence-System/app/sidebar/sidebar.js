
// Get user information from localStorage
const storedUser = JSON.parse(localStorage.getItem('user'));
const userRoleId = storedUser.roleId; // Extract roleId from user object

// Elements to show/hide based on user role
const allLinks = document.querySelectorAll('.sidebar .links li:not(.logout-link)');
const employeeManagementLink = document.querySelector('.sidebar .links li.Employee-management-link');

// Display links based on roleId
if (userRoleId === 1) {
    // Show all links for roleId 1
    allLinks.forEach(link => link.style.display = 'flex');
} else if (userRoleId === 2) {
    allLinks.forEach(link => link.style.display = 'flex');
} else if (userRoleId === 3) {
    allLinks.forEach(link => link.style.display = 'flex');
} else if (userRoleId === 4) {
    allLinks.forEach(link => link.style.display = 'flex');
} else if (userRoleId === 5) {
    // Show only Employee-management-links for roleId 5
    allLinks.forEach(link => {
        if (link.classList.contains('Employee-management-link')) {
            link.style.display = 'flex';
        } else {
            link.style.display = 'none';
        }
    });
} else {
    // Hide all links if no valid roleId found
    allLinks.forEach(link => link.style.display = 'none');
}

 // Handle logout link click
 const logoutLink = document.querySelector('.logout-link a');
 if (logoutLink) {
     logoutLink.addEventListener('click', function(event) {
         event.preventDefault(); // Prevent the default link behavior
         
         // Remove user from localStorage
         localStorage.removeItem('user');

         // Redirect to login page
         window.location.href = '../../app/Login/login.html';
     });
 }

 
