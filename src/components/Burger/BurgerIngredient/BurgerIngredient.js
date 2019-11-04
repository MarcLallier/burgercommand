import React from 'react'
import propTypes from 'prop-types'

import './BurgerIngredient.css'

class BurgerIngredient extends Component {
  render() {
    let ingredient = null

    switch (this.props.type) {
  
      case ('bread-bottom') :
        ingredient = <div classname="BreadBottom"></div>
        break
      
      case ('bread-top') :
        ingredient = (
          <div classname="BreadTop">
            <div classname="Seeds1"></div>
            <div classname="Seeds2"></div>
          </div>
        )
        break
      
      case ('meat') : 
        ingredient = <div classname="BreadBottom"></div>
        break
  
      case ('cheese') : 
        ingredient = <div classname="Cheese"></div>
        break
  
      case ('salad') : 
        ingredient = <div classname="Salad"></div>
        break
  
      case ('beacon') : 
        ingredient = <div classname="Beacon"></div>
        break
  
    }
    return ingredient
  }
} 
 
  
BurgerIngredient.propTypes = {
  type : propTypes.string.isRequired
}

export default BurgerIngredient 