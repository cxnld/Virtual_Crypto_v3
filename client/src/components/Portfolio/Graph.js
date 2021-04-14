import { Line } from 'react-chartjs-2'

const Graph = () => {
    
    return (
        <Line
            data={{
                labels: ['day 1', 'day 2', 'day 3'],
                datasets: [{
                data: [15,7,17],
                pointRadius: 0.01,
                borderColor: 'rgba(48, 164, 223, 1)',
                backgroundColor: 'rgba(48, 164, 223, 0)',
                borderWidth: 1.2
                }]
            }}
            width={600}
            height={350}
            options={{ maintainAspectRatio: false, responsive: true, legend: false}}
        />
    )
}

export default Graph
