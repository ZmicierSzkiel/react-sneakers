import { useContext } from "react"
import ContextStorage from "../Context"

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(ContextStorage)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  return { cartItems, setCartItems, totalPrice }
}
