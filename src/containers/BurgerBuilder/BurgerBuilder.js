import React, {Component} from 'react'
import axios from '../../axios-orders'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



const INGREDIENT_PRICES = {
  salad : 0.5,
  bacon : 0.4,
  cheese : 0.7,
  meat : 1.3,
}



class BurgerBuilder extends Component {

  state = {
    ingredients : null,
    totalPrice : 4,
    purchasable : false,
    purchasing : false,
    loading : false,
    error : false,
  }

  componentDidMount = () => {
    axios.get('https://react-my-burger-2c69e.firebaseio.com/ingredients.json')
    .then(res => {
      this.setState({ingredients : res.data })
    })
    .catch(err => this.setState({error : true}))
  }

  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
    .map(ingredientKey =>{
      return ingredients[ingredientKey] //me permets de recuperer les valeurs de chaque propriete des ingredients
    })
    .reduce((sum , el) =>{
      return sum + el //el est la valeur a laquelle j'accede dans ingredients[ingredientKey] 
    },0)
    this.setState({purchasable : sum > 0})
  }

  addIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount 
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({totalPrice : newPrice, ingredients : updatedIngredients})
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0){
      return
    }
    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount 
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    this.setState({totalPrice : newPrice, ingredients : updatedIngredients})
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing : true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing : false})
  }

  purchaseContinueHandler = () => {
    this.setState({loading : true})
   //alert("You continue !")
   const order = {
     ingredients : this.state.ingredients,
     price : this.state.totalPrice, //le prix devrait etre calculé du coté serveur pour question securite de manipulation de code avant envoi vers back
     customer : {
       name : 'MARC',
       adress : {
       street : '2 rue du chateau',
       zipCode : '57000',
       country : 'France'
       },
       email : 'marc@yahoo.fr'
     },
     deliverMethod : 'fastest'
   }
   axios.post('/orders.json', order) //les endpoints firebase sont le nom du noeud(ici "orders") et .json
   .then(res => this.setState({loading : false, purchasing : false}))
   .catch(err => this.setState({loading : false, purchasing : false}))
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

      if (this.state.ingredients) {
        burger = (
          <Aux>
            <Burger ingredients = {this.state.ingredients}/>
            <BuildControls 
              ingredientAdded = {this.addIngredientHandler}
              ingredientRemoved = {this.removeIngredientHandler}
              disabled = {disabledInfo}
              price={this.state.totalPrice}
              purchasable={this.state.purchasable}
              ordered={this.purchaseHandler}
            />
          </Aux>
          );
          orderSummary = <OrderSummary 
          ingredients = {this.state.ingredients} 
          purchaseCancelled = {this.purchaseCancelHandler}
          purchaseContinued = {this.purchaseContinueHandler}
          price = {this.state.totalPrice}
          />
      }

      if (this.state.loading) {
        orderSummary = <Spinner />
      }
        
    return ( 
      
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
      </Aux>
    )

  }
}

export default withErrorHandler(BurgerBuilder, axios)