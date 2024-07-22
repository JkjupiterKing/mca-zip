$('#mySidenav').load('../../app/sidebar/sidebar.html');

document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch projects from API and display in the table
    function fetchProjects() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/projects/all');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var projects = JSON.parse(xhr.responseText);
                displayProjects(projects);
            } else {
                console.error('Error fetching projects:', xhr.statusText);
                // Handle error as needed
            }
        };
        xhr.onerror = function() {
            console.error('Error fetching projects. Network error.');
        };
        xhr.send();
    }

    // Function to display projects in the table
    function displayProjects(projects) {
        var tableBody = document.getElementById('ManageProjectsTableData');
        tableBody.innerHTML = '';

        projects.forEach(function(project) {
            var projectId = project.id;

            var row = '<tr data-project-id="' + projectId + '">' +
                '<td>' + project.title + '</td>' +
                '<td>' + project.description + '</td>' +
                '<td>' + project.status + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-primary btn-sm btn-update" data-project-id="' + projectId + '">Update</button> ' +
                '<button type="button" class="btn btn-danger btn-sm btn-delete" data-project-id="' + projectId + '">Delete</button>' +
                '</td>' +
                '</tr>';
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }


// Function to handle adding a new project
function addProject() {
    var addProjectForm = document.getElementById('AddProjectForm1');

    // Check if form element exists
    if (!addProjectForm) {
        console.error('AddProjectForm not found in the document.');
        return;
    }

    // Ensure addProjectForm is an HTMLFormElement
    if (!(addProjectForm instanceof HTMLFormElement)) {
        console.error('Element with id "AddProjectForm" is not a form element.');
        return;
    }

    // Create FormData object from the form
    var formData = new FormData(addProjectForm);

    // Extract data from FormData
    var projectData = {
        title: formData.get('projectTitle'),
        description: formData.get('projectDescription'),
        status: formData.get('status'),
    };

    // Validate the form data if needed
    if (!projectData.title || !projectData.description || !projectData.status) {
        console.error('Please fill out all fields.');
        alert("Please fill out all fields.");
        return;
    }

    // Make an AJAX POST request to add the project
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/projects/addproject');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.responseText);
            console.log('Project added successfully:', response);
            alert("Project added successfully");
            fetchProjects(); // Refresh projects list after addition
            displayManageProjects(); // Display manage projects view
            addProjectForm.reset(); // Reset form fields
        } else {
            console.error('Error adding project:', xhr.statusText);
            alert("Error adding project. Server returned error status: " + xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed. Status:', xhr.status);
        alert("Failed to add project. Network error. Check console for details.");
    };
    xhr.send(JSON.stringify(projectData));
}


    // Event listener for showing manage projects (display table)
    var manageBtn = document.getElementById('manage-btn');
    if (manageBtn) {
        manageBtn.addEventListener('click', function() {
            fetchProjects();
            displayManageProjects();
        });
    }

    // Event listener for showing add new project form (display form)
    var addBtn = document.getElementById('add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            displayAddProjectForm();
        });
    }

    // Event listener for add project form submission
    var addProjectBtn = document.getElementById('submitProject');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function(event) {
            event.preventDefault();
            addProject(); // Call addProject function on button click
        });
    }

    // Event listener for update and delete buttons (inside the table)
    var tableBody = document.getElementById('ManageProjectsTableData');
    if (tableBody) {
        tableBody.addEventListener('click', function(event) {
            var target = event.target;

            // Handle update button click
            if (target.classList.contains('btn-update')) {
                var projectId = target.getAttribute('data-project-id');
                if (projectId) {
                    openUpdateForm(projectId);
                } else {
                    console.error('Project ID is undefined or invalid.');
                }
            }

            // Handle delete button click
            if (target.classList.contains('btn-delete')) {
                var projectId = target.getAttribute('data-project-id');
                if (projectId && confirm('Are you sure you want to delete this Project?')) {
                    deleteProject(projectId);
                }
            }
        });
    }

    // Function to fetch project details by projectId
    function fetchProjectDetails(projectId, callback) {
        if (!projectId) {
            console.error('Invalid project ID:', projectId);
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/projects/' + projectId);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var project = JSON.parse(xhr.responseText);
                callback(project);
            } else {
                console.error('Error fetching project details:', xhr.statusText);
            }
        };
        xhr.onerror = function() {
            console.error('Error fetching project details. Network error.');
        };
        xhr.send();
    }

// Function to update project details through API
function updateProject(projectData) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:8080/projects/update/' + projectData.id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Project updated successfully:', xhr.responseText);
            fetchProjects(); // Refresh projects list after update
            displayManageProjects(); // Display manage projects view
        } else {
            console.error('Error updating project:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Error updating project. Network error.');
    };
    xhr.send(JSON.stringify(projectData));
}


    // Event listener for update form submission
    var updateProjectForm = document.getElementById('UpdateProjectForm');
    if (updateProjectForm) {
        updateProjectForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var formData = new FormData(updateProjectForm);
            var projectData = {
                id: formData.get('updateProjectId'),
                title: formData.get('updateProjectTitle'),
                description: formData.get('updateProjectDescription'),
                status: formData.get('updateStatus'),
            };
            updateProject(projectData);
            fetchProjects();
        });
    }

    // Function to open update form/modal with project details
    function openUpdateForm(projectId) {
        fetchProjectDetails(projectId, function(project) {
            document.getElementById('updateProjectId').value = project.id;
            document.getElementById('updateProjectTitle').value = project.title;
            document.getElementById('updateProjectDescription').value = project.description;
            document.getElementById('updateStatus').value = project.status;

            var updateModal = new bootstrap.Modal(document.getElementById('UpdateProjectModal'));
            updateModal.show();
        });
    }

// Function to delete project
function deleteProject(projectId) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:8080/projects/delete/' + projectId);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Project deleted successfully.');
            alert("Project deleted successfully");
            removeProjectRow(projectId); // Remove the project row from UI
            fetchProjects();
        } else {
            console.error('Error deleting project:', xhr.statusText);
            alert("Error deleting project. Server returned error status: " + xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed.');
        alert("Failed to delete project. Network error. Check console for details.");
    };
    xhr.send();
}


    // Function to remove project row from table
    function removeProjectRow(projectId) {
        var rowToRemove = document.querySelector('tr[data-project-id="' + projectId + '"]');
        if (rowToRemove) {
            rowToRemove.remove();
        } else {
            console.error('Project row not found in table:', projectId);
        }
    }

    // Function to display add project form and hide other elements
    function displayAddProjectForm() {
        // Show add project form
        document.getElementById('AddProjectForm').style.display = 'block';
        
        // Hide manage projects table and associated elements
        document.getElementById('DisplayProjectsList').style.display = 'none';
        document.getElementById('searchBar').style.display = 'none';
        document.getElementById('ProjectManagementTitle').style.display = 'none';
        
        // Hide add project button
        var addBtn = document.getElementById('add-btn');
        if (addBtn) {
            addBtn.style.display = 'none';
        }
    }

    // Function to display manage projects table and hide add project form
    function displayManageProjects() {
        // Hide add project form
        document.getElementById('AddProjectForm').style.display = 'none';
        
        // Show manage projects table and associated elements
        document.getElementById('DisplayProjectsList').style.display = 'table';
        document.getElementById('searchBar').style.display = 'block';
        document.getElementById('ProjectManagementTitle').style.display = 'block';
        
        // Show add project button
        var addBtn = document.getElementById('add-btn');
        if (addBtn) {
            addBtn.style.display = 'block';
        }
    }

    // Event listener for search input change
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var searchTerm = searchInput.value.toLowerCase();
            var rows = document.querySelectorAll('#ManageProjectsTableData tr[data-project-id]');

            rows.forEach(function(row) {
                var title = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Initialize by fetching and displaying projects
    fetchProjects();
});


