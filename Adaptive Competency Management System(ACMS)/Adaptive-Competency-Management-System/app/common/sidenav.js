// Function to logout user
function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = '../../app/Login/login.html';
}

