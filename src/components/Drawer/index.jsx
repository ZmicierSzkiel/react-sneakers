import Info from "../Info"

import styles from "./Drawer.module.scss"

import { useState } from "react"
import { useCart } from "../../hooks/useCart"
import axios from "axios"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ closeCart, onRemove, items = [], opened }) {
  //events
  const { cartItems, setCartItems, totalPrice } = useCart()

  const [isOrdered, setIsOrdered] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const orderHandler = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        "https://6318b864f6b281877c74b06a.mockapi.io/orders",
        { items: cartItems }
      )
      setOrderId(data.id)
      setIsOrdered(true)
      setCartItems([])
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(
          `https://6318b864f6b281877c74b06a.mockapi.io/cart/${item.id}`
        )
        await delay(1000)
      }
    } catch (error) {
      alert("Ошибка при создании заказа :(")
    }
    setIsLoading(false)
  }

  return (
    <div
      className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}
      onClick={closeCart}
    >
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="delete-btn cu-p"
            src="/img/delete-btn.svg"
            alt="delete"
            onClick={closeCart}
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cart-item d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                    className="cart-item-img"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{item.title}</p>
                    <b>{item.price} р.</b>
                  </div>
                  <img
                    onClick={() => onRemove(item.id)}
                    className="delete-btn"
                    src="/img/delete-btn.svg"
                    alt="delete"
                  />
                </div>
              ))}
            </div>
            <div className="cart-total-block">
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b> {totalPrice} р.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{Math.round(totalPrice * 0.05)} р.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={orderHandler}
                className="green-btn"
              >
                Оформить заказ
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrdered ? "Заказ оформлен" : "Корзина пустая"}
            image={isOrdered ? "/img/ordered.jpg" : "/img/empty-cart.jpg"}
            description={
              isOrdered
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
            }
          />
        )}
      </div>
    </div>
  )
}

export default Drawer
