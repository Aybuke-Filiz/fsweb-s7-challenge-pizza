import React from 'react';
import {Link} from 'react-router-dom';


function HomePage({ onHungryClick }) {
    return (
      <div>
        <h1>Teknolojik Yemekler</h1>
        <h2>Kod Acıktırır, Pizza Doyurur</h2>
        <Link to="/OrderPage"><button>Acıktım!</button></Link>
        <img src="pizza_image.jpg" alt="Pizza" />
      </div>
    );
  }
  
  export default HomePage;