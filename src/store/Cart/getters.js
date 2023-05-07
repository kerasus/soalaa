import { Cart } from 'src/models/Cart'

export function cart (state) {
  return new Cart(state.cart)
}
