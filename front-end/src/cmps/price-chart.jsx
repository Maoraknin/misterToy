
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

export function PriceChart() {

  const [priceMap, setPriceMap] = useState({})

  useEffect(() => {
    loadChart()
  }, [])

  async function loadChart() {
    const toys = await toyService.query()
    try {
      setPriceMap(toyService.getPriceMap(toys))
    } catch (err) {
      console.error('Had a problem load chart', err)
    }

  }



  function getLabelsFromMap(map) {
    const labels = []
    for (const key in map) {
      labels.push(key)
    }
    return labels

  }


  function getAvregesFromMap(map) {
    const avreges = []
    for (const key in map) {
      const sum = map[key].reduce((acc, price) => {
        return acc += price

      }, 0)
      avreges.push(Math.ceil(sum / map[key].length))
    }
    return avreges

  }


  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  const data = {
    labels: getLabelsFromMap(priceMap),
    datasets: [
      {
        label: 'Avrage price',
        data: getAvregesFromMap(priceMap),
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


  return <div style={{ width: '30%', margin: 'auto', minWidth: '350px' }}>
    <h2 className='graph-title'>Price By Brand</h2>
    <PolarArea data={data} />
  </div>



}