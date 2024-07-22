// Load sidebar using jQuery
$('#mySidenav').load('../../app/sidebar/sidebar.html');

document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch roles from API and populate the dropdown
    function fetchRolesAndPopulateDropdown() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/roles/all'); // Replace with your actual API endpoint to fetch roles
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var selectDropdown = document.getElementById('role');
                selectDropdown.innerHTML = ''; // Clear existing options

                // Populate options with fetched roles
                data.forEach(function(role) {
                    var option = document.createElement('option');
                    option.value = role.roleId;
                    option.textContent = role.roleName;
                    selectDropdown.appendChild(option);
                });
            } else {
                console.error('Error fetching roles:', xhr.statusText);
                // Handle error as needed
            }
        };
        xhr.onerror = function() {
            console.error('Request failed');
            // Handle network errors
        };
        xhr.send();
    }

    // Call the function to fetch roles and populate dropdown on page load
    fetchRolesAndPopulateDropdown();

    function fetchRolesAndPopulateUpdateDropdown() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/roles/all'); // Replace with your actual API endpoint to fetch roles
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var selectDropdown = document.getElementById('updaterole');
                selectDropdown.innerHTML = ''; // Clear existing options

                // Populate options with fetched roles
                data.forEach(function(role) {
                    var option = document.createElement('option');
                    option.value = role.roleId;
                    option.textContent = role.roleName;
                    selectDropdown.appendChild(option);
                });
            } else {
                console.error('Error fetching roles:', xhr.statusText);
                // Handle error as needed
            }
        };
        xhr.onerror = function() {
            console.error('Request failed');
            // Handle network errors
        };
        xhr.send();
    }

    // Function to fetch users from API and display in the table
    function fetchUsers() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/users/all'); // Replace with your actual API endpoint to fetch users
        xhr.onload = function() {
            if (xhr.status === 200) {
                var users = JSON.parse(xhr.responseText);
                displayUsers(users); // Call function to display users
            } else {
                console.error('Error fetching users:', xhr.statusText);
                // Handle error as needed
            }
        };
        xhr.onerror = function() {
            console.error('Error fetching users. Network error.');
        };
        xhr.send();
    }

    // Function to display users in the table
    function displayUsers(users) {
        var tableBody = document.getElementById('ManageUsersTableData');
        tableBody.innerHTML = ''; // Clear existing table rows

        // Populate table with fetched users
        users.forEach(function(user) {
            var userId = user.userId; // Store user id in a variable

            var row = '<tr data-user-id="' + userId + '">' +
              '<td>' + user.username + '</td>' + 
              '<td>' + user.email + '</td>' +
              '<td>' + user.phone + '</td>' +
              '<td>' + user.role.roleName + '</td>' +
              '<td>' + user.address + '</td>' + 
              '<td>' +
                '<button type="button" class="btn btn-primary btn-sm btn-update" data-user-id="' + userId + '">Update</button> ' +
                '<button type="button" class="btn btn-danger btn-sm btn-delete" data-user-id="' + userId + '">Delete</button>' +
              '</td>' +
              '</tr>';
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    // Function to handle form submission for adding a new user (if form exists)
    var addUserForm = document.getElementById('AddUserForm1');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addUser(); // Call addUser function to handle form submission
        });
    }

    // Function to handle adding a new user
    function addUser() {
        var formData = new FormData(addUserForm);
        var userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: {
                roleId: formData.get('role') // Assuming role ID is in the form data
            },
            address: formData.get('address')
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/users/adduser');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log('User created successfully:', response);
                alert("User added successfully");
                fetchUsers(); // Refresh user list
                displayManageUsers(); // Display manage users table
                addUserForm.reset(); // Clear the form after successful addition
            } else {
                console.error('Error creating user:', xhr.statusText);
                addUserForm.reset();
            }
        };
        xhr.onerror = function() {
            console.error('Request failed');
        };
        xhr.send(JSON.stringify(userData));
    }

    // Function to display add user form
    function displayAddUserForm() {
        document.getElementById('AddUserForm').style.display = 'block'; // Show the add user form
        document.getElementById('add-btn').style.display = 'none'; // Hide the add user button
        document.getElementById('searchInput').style.display = 'none'; // Hide the search bar
        document.getElementById('ProjectManagementTitle').style.display = 'none'; // Hide the project management title
        document.getElementById('DisplayUsersList').style.display = 'none'; // Hide manage users table
    }

    // Function to display manage users table
    function displayManageUsers() {
        document.getElementById('AddUserForm').style.display = 'none'; // Hide the add user form
        document.getElementById('add-btn').style.display = 'block'; // Show the add user button
        document.getElementById('searchInput').style.display = 'block'; // Show the search bar
        document.getElementById('ProjectManagementTitle').style.display = 'block'; // Show the project management title
        document.getElementById('DisplayUsersList').style.display = 'table'; // Show manage users table
    }

    // Event listener for showing manage users (display table)
    var manageBtn = document.getElementById('manage-btn');
    if (manageBtn) {
        manageBtn.addEventListener('click', function() {
            fetchUsers(); // Reload users when manage button is clicked
            displayManageUsers(); // Display manage users table
        });
    }

    // Event listener for showing add new user form (display form)
    var addBtn = document.getElementById('add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            displayAddUserForm(); // Display add user form
        });
    }

    // Event delegation for update and delete buttons (inside the table)
    var tableBody = document.getElementById('ManageUsersTableData');
    if (tableBody) {
        tableBody.addEventListener('click', function(event) {
            var target = event.target;

            // Handle update button click
            if (target.classList.contains('btn-update')) {
                var userID = target.getAttribute('data-user-id');
                if (userID) {
                    openUpdateForm(userID); // Call openUpdateForm with the correct userID
                } else {
                    console.error('User ID is undefined or invalid.');
                }
            }

            // Handle delete button click
            if (target.classList.contains('btn-delete')) {
                var userID = target.getAttribute('data-user-id');
                if (userID && confirm('Are you sure you want to delete this User?')) {
                    deleteUser(userID); // Implement deleteUser function if needed
                }
            }
        });
    }

    // Function to fetch user details by userId
    function fetchUserDetails(userId, callback) {
        if (!userId) {
            console.error('Invalid user ID:', userId);
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/users/' + userId); // Replace with your actual API endpoint to fetch user details
        xhr.onload = function() {
            if (xhr.status === 200) {
                var user = JSON.parse(xhr.responseText);
                callback(user); // Invoke callback with user details
            } else {
                console.error('Error fetching user details:', xhr.statusText);
                // Handle error as needed
            }
        };
        xhr.onerror = function() {
            console.error('Error fetching user details. Network error.');
        };
        xhr.send();
    }

    // Function to update user details through API
    function updateUser(userData) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:8080/users/update/' + userData.userId); // Replace with your actual API endpoint to update user
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('User updated successfully:', xhr.responseText);
                var updateModal = new bootstrap.Modal(document.getElementById('UpdateUserModal'));
                updateModal.hide(); // Hide the modal after successful update
                fetchUsers(); // Refresh user list
                displayManageUsers(); // Display manage users table
            } else {
                console.error('Error updating user:', xhr.statusText);
                // Handle error as needed
            }
        };
        xhr.onerror = function() {
            console.error('Error updating user. Network error.');
        };
        xhr.send(JSON.stringify(userData));
    }

    // Event listener for update form submission
    document.getElementById('UpdateUserForm').addEventListener('submit', function(event) {
        console.log('event',event);
        event.preventDefault();
        var formData = new FormData(this);
        var userData = {
            userId: formData.get('updateuserid'),
            username: formData.get('updateusername'),
            email: formData.get('updateEmail'),
            phone: formData.get('updatePhone'),
            role: {
                roleId: formData.get('updateRole') // Assuming role ID is submitted in the form
            },
            address: formData.get('updateAddress')
        };
        console.log('userData',userData);
        updateUser(userData); // Update user details through API
    });

// Function to open update form/modal with user details
function openUpdateForm(userId) {
    fetchUserDetails(userId, function(user) {
        console.log('user',user);
        // Populate update form with user details
        document.getElementById('updateuserid').value = user.userId;
        document.getElementById('updateusername').value = user.username;
        document.getElementById('updateEmail').value = user.email;
        document.getElementById('updatePhone').value = user.phone;
        document.getElementById('updateAddress').value = user.address;

        // Populate roles dropdown for update form
        fetchRolesAndPopulateUpdateDropdown(); // Call function to fetch roles and populate dropdown

        // Show the update user modal (assuming you have a Bootstrap modal)
        var updateModal = new bootstrap.Modal(document.getElementById('UpdateUserModal'));
        updateModal.show();
    });
}


    // Function to delete user
    function deleteUser(userId) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://localhost:8080/users/delete/' + userId); // Replace with your actual API endpoint
        xhr.onload = function() {
            if (xhr.status === 204) {
                console.log('User deleted successfully.');
                alert("user deleted successfully");
                removeUserRow(userId);
            } else {
                console.error('Error deleting user:', xhr.statusText);
                alert("error in deleting the user.");
            }
        };
        xhr.onerror = function() {
            console.error('Request failed.');
            alert("error in deleting the user.");
        };
        xhr.send();
    }

    // Function to remove user row from table
    function removeUserRow(userId) {
        var rowToRemove = document.querySelector('tr[data-user-id="' + userId + '"]');
        if (rowToRemove) {
            rowToRemove.remove();
        } else {
            console.error('User row not found in table:', userId);
        }
    }

    // Event listener for search input change
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var searchTerm = searchInput.value.toLowerCase();
            var rows = document.querySelectorAll('#ManageUsersTableData tr[data-user-id]');
            
            rows.forEach(function(row) {
                var username = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
                if (username.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Initialize by fetching and displaying users
    fetchUsers();
});
