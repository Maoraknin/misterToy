
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { useEffect, useState } from "react"
import { toyService } from '../services/toy.service.js'

export function PriceChart(){

    const [prices, setPrices] = useState([])

    useEffect(() => {
        console.log('prices:',prices)
        toyService.query().then(toys => toyService.getPriceMap(toys))
        // toyService.getToysInStock().then(toys => setCounter(toyService.getFilteredToysByLabel(toys)))
    }, [])

    
    ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
    
    const data = {
        labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 9, 3, 5, 2, 3, 5, 9],
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
        <h2>Price By Brand</h2>
        <PolarArea data={data} />
    </div>

    

}