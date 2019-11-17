import React from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(ingredientKey => {
    return <li key={ingredientKey}>
            <span style={{textTransform : "capitalize"}}>{ingredientKey}: {props.ingredients[ingredientKey]}</span>
          </li>
  })
  return (
    
    <Aux>
      
      <h3>Your order</h3>
      <p>A delicious burger with following ingredients : </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
      <p>Continue to check-out ?</p>
      <Button  
      btnType="Danger" 
      clicked={props.purchaseCancelled}>
        Cancel
      </Button>
      <Button  
      btnType="Success" 
      clicked={props.purchaseContinued}>
        Continue
      </Button>
     
    </Aux>

  )
}


export default orderSummary