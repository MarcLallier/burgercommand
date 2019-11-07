import React from 'react'

import burgerLogo from '../../assets/images/burgerLogo.png'
//importer l'image plutot que d'ecrire le chemin de la source en dure dans la balise img. Car au deploiement de l'appli, 
//l'image est copieé dans de nouveaux dossier
//donc vaut mieux mettre une variable


import './Logo.css'

const logo = (props) => (

  <div className="Logo" style={{height:props.height}}>
    <img src={burgerLogo} alt="MyBurger"/>
  </div>

)


export default logo 