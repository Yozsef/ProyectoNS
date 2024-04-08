const xValues = ["1", "2", "3", "4", "5"];
const yValues = [1, 2, 3, 4, 5];
const barColors = Array(xValues.length).fill("#f5ce0a");

new Chart("myChart", {
    type: "horizontalBar",
    data: {
        labels: xValues.map(String),
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        legend: {display: false},
        scales: {
            xAxes: [{
                display: false // Disable x-axis labels
            }]
        }
    }
});
