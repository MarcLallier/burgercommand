import React from 'react'

import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger = (props) =>{

  const transformedIngredient = Object.keys(props.ingredients).map(ingredientKey => {
    return(
      [...Array(props.ingredients[ingredientKey])] .map((_,i)=>{
        return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
      })
    )
  })
  
  return(
    <div className="Burger">
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger