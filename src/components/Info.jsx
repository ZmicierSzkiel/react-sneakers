import React, { useContext } from "react"
import ContextStorage from "../Context"

const Info = ({ image, title, description }) => {
  const { setCartOpened } = useContext(ContextStorage)
  return (
    <div className="cart-empty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120" src={image} alt="Empty Cart" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="green-btn">
        <img src="/img/arrow.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info
