$('#mySidenav').load('../../app/sidebar/sidebar.html');

    const pageSize = 10; // Number of users per page
    let currentPage = 1; // Initialize current page
    let totalPages = 0; // Variable to hold total pages
    let announcements = [];

const User = JSON.parse(localStorage.getItem('user'));
const RoleId = User.roleId;

// Function to fetch announcements from API with pagination support
function fetchAnnouncements() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/announcements/all'); // Replace with your actual API endpoint
    xhr.onload = function() {
        if (xhr.status === 200) {
            announcements = JSON.parse(xhr.responseText); // Store announcements in global variable
            totalPages = Math.ceil(announcements.length / pageSize); // Calculate total pages
            displayAnnouncements(announcements); // Display announcements for the current page
            updatePagination(); // Update pagination links
        } else {
            console.error('Error fetching announcements:', xhr.statusText);
            // Handle error as needed
        }
    };
    xhr.onerror = function() {
        console.error('Error fetching announcements. Network error.');
    };
    xhr.send();
}

// Function to display announcements for the current page
function displayAnnouncements(announcements) {
    var tableBody = document.getElementById('ManageAnnouncementsTableData');
    tableBody.innerHTML = ''; // Clear existing table rows

    // Calculate start and end indices for the current page
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize, announcements.length);
    var paginatedAnnouncements = announcements.slice(startIndex, endIndex);

    // Populate table with announcements for the current page
    paginatedAnnouncements.forEach(function(announcement) {
        var announcementId = announcement.Announcement_ID; // Store announcement id in a variable

        var row = '<tr data-announcement-id="' + announcementId + '">' +
            '<td>' + announcement.announcementId + '</td>' +
            '<td>' + announcement.name + '</td>' +
            '<td>' + announcement.description + '</td>' +
            '</tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Function to update pagination links
function updatePagination() {
    var pagination = document.getElementById('pagination');
    var paginationHtml = '';

    // Generate pagination HTML dynamically
    for (var i = 1; i <= totalPages; i++) {
        paginationHtml += '<li class="page-item ' + (currentPage === i ? 'active' : '') + '"><a class="page-link" href="#" onclick="gotoPage(' + i + ')">' + i + '</a></li>';
    }

    // Update the pagination container with the generated HTML
    pagination.innerHTML = paginationHtml;
}

// Function to navigate to a specific page
window.gotoPage = function(pageNumber) {
    currentPage = pageNumber; // Update current page
    fetchAnnouncements(); // Fetch and display announcements for the selected page
};

// Event listener for showing manage announcements (display table)
document.addEventListener('DOMContentLoaded', function() {
    var manageBtn = document.getElementById('manage-btn');
    if (manageBtn) {
        manageBtn.addEventListener('click', function() {
            displayManageAnnouncements();
        });
    }

    // Event listener for showing add new announcement form (display form)
    var addBtn = document.getElementById('add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            displayAddAnnouncementForm();
        });
    }

    // Event listener for search input changes
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
        updatePagination();
    }

    // Initial fetch and display of announcements
    fetchAnnouncements();
    document.getElementById('manage-btn').style.display = 'none';
});

// Function to handle form submission for adding a new announcement
document.addEventListener('DOMContentLoaded', function() {
    var addAnnouncementForm = document.getElementById('addAnnouncementForm');
    if (addAnnouncementForm) {
        addAnnouncementForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addAnnouncement(addAnnouncementForm); // Pass the form element to addAnnouncement function
        });
    }
});

// Function to add a new announcement via API
function addAnnouncement(formElement) {
    var formData = new FormData(formElement);
    var formDataObject = {
        name: formData.get('announcementname'),
        description: formData.get('Announcementdescription')
    };

    fetch('http://localhost:8080/announcements/addAnnouncement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add announcement');
        }
        formElement.reset();
        alert("Announcement added successfully");
        fetchAnnouncements();
        displayManageAnnouncements();
    })
    .catch(error => {
        console.error('Error adding announcement:', error);
    });
}

function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    // Filter announcements based on search input
    const filteredAnnouncements = announcements.filter(announcement => {
        const id = announcement.announcementId.toString().toLowerCase(); // Convert ID to string and lower case
        const name = announcement.name.trim().toLowerCase();
        const description = announcement.description.trim().toLowerCase();

        return id.includes(searchInput) || name.includes(searchInput) || description.includes(searchInput);
    });

    // Calculate total pages based on filtered results
    totalPages = Math.ceil(filteredAnnouncements.length / pageSize);
    currentPage = 1; // Reset to the first page

    // Display filtered announcements for the current page
    displayAnnouncements(filteredAnnouncements);
    updatePagination();
}

// Function to display add announcement form and hide other elements
function displayAddAnnouncementForm() {
    document.getElementById('AddAnnouncementForm').style.display = 'block';
    document.getElementById('DisplayAnnouncementsList').style.display = 'none';
    document.getElementById('AnnouncementTitle').style.display = 'none';
    document.getElementById('manage-btn').style.display = 'block';
    document.getElementById('pagination').style.display = 'none';
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('searchInput').style.display = 'none';
}

// Function to display manage announcements table and hide add announcement form
function displayManageAnnouncements() {
    document.getElementById('AddAnnouncementForm').style.display = 'none';
    document.getElementById('DisplayAnnouncementsList').style.display = 'table';
    document.getElementById('AnnouncementTitle').style.display = 'block';
    document.getElementById('manage-btn').style.display = 'none';
    document.getElementById('add-btn').style.display = 'block';
    window.location.reload();
}
if (RoleId === 5) {
    document.getElementById('add-btn').style.display = 'none';
 } else {
     document.getElementById('add-btn').style.display = 'block';      
 }