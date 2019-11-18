import React, {Component} from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'


const withErrorHandler = (WrappedComponent, axios) => {

  return class extends Component {

      state = {
        error : null,
      }

    componentWillMount = () => {

      this.reqinterceptor = axios.interceptors.request.use(req => {
        this.setState({error : null})
        return req
      })

      this.resinterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error : error})
      })

    }

    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.reqinterceptor)
      axios.interceptors.request.eject(this.resinterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({error : null})
    }

    render () {
      return (
        <Aux>
          <Modal 
          modalClosed= {this.errorConfirmedHandler}
          show= {this.state.error} >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      )
    }
  }
}

export default withErrorHandler