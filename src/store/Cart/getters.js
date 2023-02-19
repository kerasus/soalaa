import { Cart } from 'src/models/Cart'

const getters = {
  cart: (state) => {
    return new Cart(state.cart)
  }
}

export default getters
