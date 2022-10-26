import { React, useEffect, useState } from "react"
import axios from "axios"
import Card from "../Card"

function Orders() {
  // states

  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await axios.get(
          "https://6318b864f6b281877c74b06a.mockapi.io/orders"
        )
        setOrders(data.map((obj) => obj.items).flat())
        setIsLoading(false)
      }
      fetchData()
    } catch (error) {
      alert("Не удалось загрузить ваши заказы :(")
      console.error(error)
    }
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {isLoading
          ? [...Array(8)].map(() => <Card loading={isLoading} />)
          : orders.map((item) => (
              <Card key={item.id} {...item} loading={isLoading} />
            ))}
      </div>
    </div>
  )
}

export default Orders
