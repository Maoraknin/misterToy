import React from 'react';

import { InStockChart } from '../cmps/in-stock-chart.jsx'
import { PriceChart } from '../cmps/price-chart.jsx'


export function Dashboard() {

    return <section className='flex dashboard'>
        <InStockChart/>
        <PriceChart/>

    </section>
}
