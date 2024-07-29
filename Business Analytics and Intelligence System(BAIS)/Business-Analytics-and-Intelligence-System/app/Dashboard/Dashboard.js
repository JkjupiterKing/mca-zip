$('#mySidenav').load('../../app/sidebar/sidebar.html');

document.addEventListener('DOMContentLoaded', () => {
 // Function to fetch project data from API and update UI
 function fetchDataAndUpdateUI() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/projects/all'); // Replace with your actual API endpoint
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                var responseData = JSON.parse(xhr.responseText);

                // Update project count boxes
                updateProjectCounts(responseData);

                // Update charts
                updateCharts(responseData);

                // Update status pie chart
                updateStatusPieChart(responseData);

            } catch (error) {
                console.error('Error parsing JSON response:', error);
            }
        } else {
            console.error('Error fetching project data:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed');
    };
    xhr.send();
}

// Function to update project count boxes
function updateProjectCounts(projects) {
    var upcomingProjectsCount = 0;
    var ongoingProjectsCount = 0;
    var completedProjectsCount = 0;

    // Count projects based on status
    projects.forEach(function(project) {
        switch (project.status) {
            case 'Planned':
            case 'Pending':
            case 'Upcoming':
            case 'Not Started':    
                upcomingProjectsCount++;
                break;
            case 'In-Progress':
            case 'Ongoing':    
                ongoingProjectsCount++;
                break;
            case 'Completed':
                completedProjectsCount++;
                break;
            // Handle other statuses as needed
        }
    });

    // Update count boxes
    updateProjectCount('Upcoming Projects', upcomingProjectsCount);
    updateProjectCount('Ongoing Projects', ongoingProjectsCount);
    updateProjectCount('Completed Projects', completedProjectsCount);
}

// Function to update the count in the UI
function updateProjectCount(category, count) {
    var box = document.querySelector('.box.' + getCategoryClass(category));
    if (box) {
        var numberSpan = box.querySelector('.number');
        if (numberSpan) {
            numberSpan.textContent = count;
        }
    }
}

// Helper function to get class name based on category
function getCategoryClass(category) {
    switch (category) {
        case 'Upcoming Projects':
            return 'box1';
        case 'Ongoing Projects':
            return 'box2';
        case 'Completed Projects':
            return 'box3';
        default:
            return '';
    }
}
// Function to update chart data
function updateChartData(chart, labels, data, bgColor, borderColor) {
    chart.data.labels = labels;
    chart.data.datasets.forEach(function(dataset) {
        dataset.data = data;
        dataset.backgroundColor = bgColor;
        dataset.borderColor = borderColor;
    });
    chart.update();
}
// Function to update the charts (line, bar, pie charts)
function updateCharts(projects) {
    var projectTitles = projects.map(function(project) {
        return project.title;
    });

    var projectCounts = projects.map(function(project) {
        switch (project.status) {
            case 'Planned':
            case 'In Progress':
            case 'Completed':
                return 1; // You can change this logic based on your requirement
            default:
                return 0;
        }
    });

    // Update data for each chart
    updateChartData(upcomingProjectsChart, projectTitles, projectCounts, 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');
    updateChartData(ongoingProjectsChart, projectTitles, projectCounts, 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)');
    updateChartData(completedProjectsChart, projectTitles, projectCounts, 'rgba(255, 206, 86, 0.2)', 'rgba(255, 206, 86, 1)');
}

// Function to update status pie chart
function updateStatusPieChart(projects) {
    var statusLabels = ['Planned', 'In Progress', 'Completed', 'Pending', 'Upcoming'];
    var statusCounts = [0, 0, 0, 0, 0];

    // Count statuses
    projects.forEach(function(project) {
        switch (project.status) {
            case 'Planned':
                statusCounts[0]++;
                break;
            case 'In Progress':
                statusCounts[1]++;
                break;
            case 'Completed':
                statusCounts[2]++;
                break;
            case 'Pending':
                statusCounts[3]++;
                break;
            case 'Upcoming':
                statusCounts[4]++;
                break;
            // Handle other statuses as needed
        }
    });

    // Update data for status pie chart
    updatePieChartData(statusPieChart, statusLabels, statusCounts, [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
    ], [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
    ]);
}

// Function to update pie chart data
function updatePieChartData(chart, labels, data, bgColor, borderColor) {
    chart.data.labels = labels;
    chart.data.datasets.forEach(function(dataset, index) {
        dataset.data = data;
        dataset.backgroundColor = bgColor;
        dataset.borderColor = borderColor;
    });
    chart.update();
}

// Initialize Charts
const ctx1 = document.getElementById('upcomingProjectsChart').getContext('2d');
const ctx2 = document.getElementById('ongoingProjectsChart').getContext('2d');
const ctx3 = document.getElementById('completedProjectsChart').getContext('2d');
const ctx4 = document.getElementById('statusPieChart').getContext('2d');

const upcomingProjectsChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Number of Projects',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        // Add your chart options here
    }
});

const ongoingProjectsChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Number of Projects',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        // Add your chart options here
    }
});

const completedProjectsChart = new Chart(ctx3, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: 'Number of Projects',
            data: [],
            backgroundColor: ['rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 206, 86, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        // Add your chart options here
    }
});

const statusPieChart = new Chart(ctx4, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: 'Project Status Distribution',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
        // Add your chart options here
    }
});

// Fetch and update data initially
fetchDataAndUpdateUI();
});







