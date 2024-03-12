import React from 'react';



function HomePage({ onHungryClick }) {
    return (
      <div>
        <h1>Teknolojik Yemekler</h1>
        <h2>Kod Acıktırır, Pizza Doyurur</h2>
        <button onClick={onHungryClick}>Acıktım!</button>
        <img src="pizza_image.jpg" alt="Pizza" />
      </div>
    );
  }
  
  export default HomePage;