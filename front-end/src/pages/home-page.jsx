

import toyImg from '../assets/img/toy-shop.png'
import mapImg from '../assets/img/map.png'
import chartImg from '../assets/img/chart.png'
import { Link } from "react-router-dom";
import 'animate.css';


export function HomePage() {
    return (
        <>
            <section className='home flex column full'>
                <h2 className="home-title animate__animated animate__backInDown">Wellcome to my Toy Shop</h2>
                <div className="home-img-container flex animate__animated animate__backInUp">
                <Link to="/about" ><img src={mapImg}/></Link>
                <Link to="/toy" ><img className='toy-shop-img' src={toyImg}/></Link>
                <Link to="/dashboard" ><img src={chartImg}/></Link>
                    
                    
                    
                </div>
            </section>
        </>
    )

}