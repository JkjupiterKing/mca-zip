$('#mySidenav').load('../../app/sidebar/sidebar.html');

document.addEventListener('DOMContentLoaded', () => {
    const ctx1 = document.getElementById('upcomingProjectsChart').getContext('2d');
    const ctx2 = document.getElementById('ongoingProjectsChart').getContext('2d');
    const ctx3 = document.getElementById('completedProjectsChart').getContext('2d');
    const ctx4 = document.getElementById('statusPieChart').getContext('2d');

    const data = {
        labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5'],
        datasets: [{
            label: 'Number of Projects',
            data: [5, 10, 15, 20, 25],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    const pieChart = new Chart(ctx4, {
        type: 'pie',
        data: data,
    });

    const upcomingProjectsChart = new Chart(ctx1, {
        type: 'line',
        data: data,
    });

    const ongoingProjectsChart = new Chart(ctx2, {
        type: 'bar',
        data: data,
    });

    const completedProjectsChart = new Chart(ctx3, {
        type: 'pie',
        data: data,
    });
});





