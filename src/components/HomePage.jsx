import React from 'react';
import {Link} from 'react-router-dom';
import "./HomePage.css"


function HomePage() {
    return (
      <div>
        <h1>Teknolojik Yemekler</h1>
        <h2>KOD ACIKTIRIR,PİZZA DOYURUR</h2>
        <Link to="/OrderPage"><button>ACIKTIM</button></Link>
        <div class="container">
        <img src="https://previews.123rf.com/images/5phonrf/5phonrf2306/5phonrf230600017/205740529-hot-pizza-in-box-with-spicy-salami-sausage-mozzarella-cheese-tomato-sauce-and-green-basil-just.jpg" alt="Pizza" />
        </div>
      </div>
    );
  }
  
  export default HomePage;