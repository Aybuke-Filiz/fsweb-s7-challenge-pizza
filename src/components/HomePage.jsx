import React from 'react';
import {Link} from 'react-router-dom';
import "./HomePage.css"
import { Button } from 'reactstrap';
import logo from "../Assets/mile1-assets/logo.svg"

const customButtonStyle = {
  marginTop: '1rem',
  display: 'inline-block',
  padding: '10px 40px',
  borderRadius: '20px',
  backgroundColor: '#fdc913',
  color: 'black',
  textDecoration: 'none',
  fontSize: 'large',
};

function HomePage() {
    return (
      <div className="anasayfa-container">
        <img className="logo" src={logo}/>
        <h2 className="acıktım-container">KOD ACIKTIRIR, </h2>
        <h2 className='acıktım-container'>PİZZA DOYURUR</h2>
        <Link to="/OrderPage"><Button style={customButtonStyle}>ACIKTIM</Button></Link>
      </div>
    );
  }
  
  export default HomePage;