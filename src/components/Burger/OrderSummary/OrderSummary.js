import React from 'react'
import Aux from '../../../hoc/Aux'


const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(ingredientKey => {
    return <li key={ingredientKey}>
            <span style={{textTransform : "capitalize"}}>{ingredientKey}: {props.ingredients[ingredientKey]}</span>
          </li>
  })
  return (
    
    <Aux>
      <h3>Yor order</h3>
      <p>A delicious burger with following ingredients : </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to check-out ?</p>
    </Aux>

  )
}


export default orderSummary