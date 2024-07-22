$('#mySidenav').load('../common/sidenav.html');

var enrolledCourses;
async function fetchUsername() {
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser || !currentUser.employeeId) {
            throw new Error('User details not found in localStorage');
        }

        const apiUrl = `http://localhost:8080/employees/${currentUser.employeeId}`; // Replace with your API endpoint to fetch user details

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const userData = await response.json();

        if (userData.firstName) {
            const firstName = userData.firstName;
            document.getElementById('welcomeMessage').textContent = `Welcome, ${firstName}!`;
        } else {
            throw new Error('Firstname not found in API response');
        }
    } catch (error) {
        console.error('Error fetching username:', error.message);
        document.getElementById('welcomeMessage').textContent = 'Failed to load username';
    }
}


// Initialize UI when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchUsername(); // Fetch and display username (firstname)
    initializeUI(); // Initialize the UI with zero ongoing and completed courses
    updateOngoingCoursesList(); // Update ongoing courses count initially
     // Add event listener to the "Ongoing Courses" card
    const ongoingCoursesCard = document.getElementById('ongoingCoursesList');
    ongoingCoursesCard.addEventListener('click', function(event) {
        event.preventDefault();
        fetchOngoingCourses(); // Fetch ongoing courses and display them
    });
});

// Function to initialize the UI with zero ongoing and completed courses
function initializeUI() {
    const ongoingCoursesList = document.getElementById('ongoingCoursesList');
    const completedCoursesList = document.getElementById('completedCoursesList');
    const ongoingCoursesNotFound = document.getElementById('ongoingCoursesNotFound');
    const completedCoursesNotFound = document.getElementById('completedCoursesNotFound');

    ongoingCoursesList.textContent = '0'; // Set ongoing courses count to 0
    completedCoursesList.textContent = '0'; // Set completed courses count to 0
    ongoingCoursesNotFound.style.display = 'none'; // Hide "No ongoing courses found" message
    completedCoursesNotFound.style.display = 'none'; // Hide "No completed courses found" message
}

// Function to fetch courses based on search query
function fetchCourses(searchQuery) {
    const apiUrl = `http://localhost:8080/courses`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assuming data is an array of courses from the API
            const filteredCourses = data.filter(course => {
                return course.courseName.toLowerCase().includes(searchQuery.toLowerCase());
            });

            displayCourses(filteredCourses);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Display error message or handle accordingly
        });
}

// Function to display courses in the UI
function displayCourses(courses) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous search results

    if (courses.length > 0) {
        courses.forEach(course => {
            // Create card container
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.style.width = '18rem'; // Set card width as per your example

            // Create card image
            const cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.src = course.imageUrl; // Replace with actual URL from course object
            cardImg.alt = course.courseName; // Use course name as alt text
            card.appendChild(cardImg);

            // Create card body
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            // Create card title
            const courseTitle = document.createElement('h5');
            courseTitle.classList.add('card-title');
            courseTitle.textContent = course.courseName; // Course name
            cardBody.appendChild(courseTitle);

            // Create card text (description)
            const courseDescription = document.createElement('p');
            courseDescription.classList.add('card-text');
            courseDescription.textContent = course.description; // Course description
            cardBody.appendChild(courseDescription);

            // Create enroll button
            const enrollButton = document.createElement('a');
            enrollButton.classList.add('btn', 'btn-primary');
            enrollButton.textContent = 'Enroll';
            enrollButton.href = '#'; // Replace with enrollment link or action

            // Event listener for enroll button click
            enrollButton.addEventListener('click', function(event) {
                event.preventDefault();
                enrollCourse(course.courseId); // Enroll in the course when button is clicked
            });

            cardBody.appendChild(enrollButton);

            // Append card body to card
            card.appendChild(cardBody);

            // Append card to search results container
            searchResults.appendChild(card);
        });
    } else {
        // Display message when no courses found
        searchResults.innerHTML = '<h2>No courses found.</h2>';
    }
}

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', function() {
    const searchQuery = document.getElementById('courseSearchInput').value.trim();
    if (searchQuery !== '') {
        fetchCourses(searchQuery);
    }
});

// Function to enroll in a course
function enrollCourse(courseId) {
    const apiUrl = `http://localhost:8080/enrollments/addenrollment`;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || !currentUser.employeeId) {
        console.error('Current user not found or missing employeeId in localStorage');
        alert('Failed to enroll in the course. Please log in again.');
        return;
    }

    if (!courseId) {
        console.error('Invalid courseId:', courseId);
        alert('Failed to enroll in the course. Invalid course selected.');
        return;
    }

    const enrollmentData = {
        course: { courseId: courseId },
        employee: { employeeId: currentUser.employeeId }, // Retrieve employee ID from localStorage
        enrollmentDate: new Date().toISOString() // Current date/time
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(enrollmentData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to enroll in the course');
        }
        alert('Enrollment successful!');
        updateOngoingCoursesList(); // Update ongoing courses list after enrollment
    })
    .catch(error => {
        console.error('Error enrolling in course:', error);
        alert('Failed to enroll in the course. Please try again.');
    });
}

// Function to update ongoing courses count
async function updateOngoingCoursesList() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.employeeId) {
        console.error('Current user not found or missing employeeId in localStorage');
        // Handle error appropriately, such as redirecting to login
        return;
    }
    const apiUrl = `http://localhost:8080/enrollments?employeeId=${currentUser.employeeId}&isCompleted=false`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch ongoing courses');
        }

        const enrolledCourses = await response.json();
        const ongoingCoursesList = document.getElementById('ongoingCoursesList');
        ongoingCoursesList.textContent = enrolledCourses.length.toString(); // Update ongoing courses count
        localStorage.setItem('ongoingCoursesCount', enrolledCourses.length.toString()); // Store in localStorage
    } catch (error) {
        console.error('Error updating ongoing courses list:', error);
        // Display error message or handle accordingly
    }
}


// Function to fetch ongoing courses and display them in searchResults
function fetchOngoingCourses() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.employeeId) {
        console.error('Current user not found or missing employeeId in localStorage');
        // Handle error appropriately, such as redirecting to login
        return;
    }

    const apiUrl = `http://localhost:8080/enrollments?employeeId=${currentUser.employeeId}&isCompleted=false`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch ongoing courses');
            }
            return response.json();
        })
        .then(ongoingCourses => {
            displayCourses(ongoingCourses); // Display ongoing courses in searchResults
        })
        .catch(error => {
            console.error('Error fetching ongoing courses:', error);
            // Display error message or handle accordingly
        });
}

// Function to display courses in the UI (similar to your existing displayCourses function)
function displayCourses(courses) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous search results

    if (courses.length > 0) {
        courses.forEach(course => {
            // Create card container
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.style.width = '18rem'; // Set card width as per your example

            // Create card image
            const cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.src = course.imageUrl; // Replace with actual URL from course object
            cardImg.alt = course.courseName; // Use course name as alt text
            card.appendChild(cardImg);

            // Create card body
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            // Create card title
            const courseTitle = document.createElement('h5');
            courseTitle.classList.add('card-title');
            courseTitle.textContent = course.courseName; // Course name
            cardBody.appendChild(courseTitle);

            // Create card text (description)
            const courseDescription = document.createElement('p');
            courseDescription.classList.add('card-text');
            courseDescription.textContent = course.description; // Course description
            cardBody.appendChild(courseDescription);

            // Create enroll button
            const enrollButton = document.createElement('a');
            enrollButton.classList.add('btn', 'btn-primary');
            enrollButton.textContent = 'Enroll';
            enrollButton.href = '#'; // Replace with enrollment link or action

            // Event listener for enroll button click
            enrollButton.addEventListener('click', function(event) {
                event.preventDefault();
                enrollCourse(course.courseId); // Enroll in the course when button is clicked
            });

            cardBody.appendChild(enrollButton);

            // Append card body to card
            card.appendChild(cardBody);

            // Append card to search results container
            searchResults.appendChild(card);
        });
    } else {
        // Display message when no courses found
        searchResults.innerHTML = '<h2>No ongoing courses found.</h2>';
    }
}