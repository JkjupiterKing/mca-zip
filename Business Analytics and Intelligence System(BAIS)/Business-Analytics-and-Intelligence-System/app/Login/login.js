
document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Rest of your login form handling code
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Here you can perform validation of username and password if needed
        // For simplicity, assuming validation is successful, redirect to dashboard page
        if (username.trim() !== '' && password.trim() !== '') {
            // Redirect to dashboard page (replace 'dashboard.html' with your actual dashboard page URL)
            window.location.href = '../../app/dashboard/dashboard.html';
        } else {
            alert('Please enter username and password.');
        }
    });
});


       
       
  