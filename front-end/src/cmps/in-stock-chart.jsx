
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service.js'
import { useEffect, useState } from "react"

export function InStockChart(){
    const [counter, setCounter] = useState([])

    useEffect(() => {
        toyService.getToysInStock().then(toys => setCounter(toyService.getFilteredToysByLabel(toys)))
    }, [])



    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"],
        datasets: [
            {
                label: 'Toys in stock',
                data: counter,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(49, 225, 247, 0.2)',
                    'rgb(64, 13, 81, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(49, 225, 247, 1)',
                    'rgb(64, 13, 81, 1)'
                ],
                borderWidth: 0.5,
            },
        ],
    };


    return <div style={{ width: '30%', margin: 'auto' }}>
        <h2>In Stock</h2>
        <Pie data={data} />
    </div>
}