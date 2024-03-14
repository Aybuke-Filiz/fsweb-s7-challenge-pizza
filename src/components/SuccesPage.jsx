import React from 'react';
import "./succesPage.css"
import logo from "../Assets/mile1-assets/logo.svg"

function SuccesPage (){
    return(
        <div className='succes-container'>
        <img className="logo" src={logo}/>
        <h2 className='alt-metin'>TEBRİKLER!SİPARİŞİNİZ ALINDI!</h2>
        </div>
    )
}
export default SuccesPage