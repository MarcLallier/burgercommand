import React, {Component} from 'react'

import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'


class BurgerBuilder extends Component {

  state = {
    ingredients : {
      salad : 0,
      beacon : 0,
      cheese : 0,
      meat : 0,
    }
  }

  render() {
    return (
      
      <Aux>
        <div>
          <Burger ingredients = {this.state.ingredients}/>
        </div>  
        <div>
          Build controls
        </div> 
      </Aux>
    )

  }
}

export default BurgerBuilder