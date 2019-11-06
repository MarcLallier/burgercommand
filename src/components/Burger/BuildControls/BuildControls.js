import React from 'react'

import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad', type:'salad'},
  {label: 'Bacon', type:'bacon'},
  {label: 'Cheese', type:'cheese'},
  {label: 'Meat', type:'meat'},
]

const buildControls = (props) => (
  
  <div className="BuildControls">
    <p>Current price : <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl => (
      <BuildControl 
        added={() => props.ingredientAdded(ctrl.type)}
        disabled= {props.disabled[ctrl.type]} 
        removed={() => props.ingredientRemoved(ctrl.type)}
        key={ctrl.label} 
        label={ctrl.label} 
      />
    ))}
     <button 
      className="OrderButton"
      disabled={!props.purchasable}
      onClick={props.ordered}
      >
        Order now
      </button>    
  </div>

)

export default buildControls