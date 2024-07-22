
$('#mySidenav').load('../common/sidenav.html');

// Example data for charts (replace with actual data)
var userProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'User Progress',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55],
    }]
};

var assessmentResultsData = {
    labels: ['Pass', 'Fail'],
    datasets: [{
        label: 'Assessment Results',
        backgroundColor: ['#28a745', '#dc3545'],
        borderColor: ['#28a745', '#dc3545'],
        borderWidth: 1,
        data: [70, 30],
    }]
};

// User Progress Chart
var userProgressCtx = document.getElementById('userProgressChart').getContext('2d');
var userProgressChart = new Chart(userProgressCtx, {
    type: 'bar',
    data: userProgressData,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// Assessment Results Chart
var assessmentResultsCtx = document.getElementById('assessmentResultsChart').getContext('2d');
var assessmentResultsChart = new Chart(assessmentResultsCtx, {
    type: 'pie',
    data: assessmentResultsData,
    options: {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Assessment Results'
        }
    }
});