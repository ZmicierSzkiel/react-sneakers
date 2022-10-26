import axios from "axios"
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Drawer from "./components/Drawer"
import Home from "./components/pages/Home"
import Favourites from "./components/pages/Favourites"
import Orders from "./components/pages/Orders"

import ContextStorage from "./Context"

function App() {
  //states

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  //events
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)

        const [cartResponse, favResponse, itemsResponse] = await Promise.all([
          axios.get("https://6318b864f6b281877c74b06a.mockapi.io/cart"),
          axios.get("https://6318b864f6b281877c74b06a.mockapi.io/favourites"),
          axios.get("https://6318b864f6b281877c74b06a.mockapi.io/items"),
        ])

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavourites(favResponse.data)
        setItems(itemsResponse.data)
      } catch (err) {
        alert("Ошибка при загрузке данных :(")
        console.error(err)
      }
    }

    fetchData()
  }, [])

  const addToCart = async (obj) => {
    const findItem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id)
    )
    try {
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        )
        await axios.delete(
          `https://6318b864f6b281877c74b06a.mockapi.io/cart/${findItem.id}`
        )
      } else {
        setCartItems((prev) => [...prev, obj])

        const { data } = await axios.post(
          "https://6318b864f6b281877c74b06a.mockapi.io/cart",
          obj
        )
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          })
        )
      }
    } catch (err) {
      alert("Ошибка при добавлении в корзину")
      console.error(err)
    }
  }

  const removeItemHandler = async (id) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      )
      await axios.delete(
        `https://6318b864f6b281877c74b06a.mockapi.io/cart/${id}`
      )
    } catch (err) {
      alert("Не удалось удалить товар")
      console.error(err)
    }
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const favouriteHandler = async (obj) => {
    try {
      if (favourites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://6318b864f6b281877c74b06a.mockapi.io/favourites/${obj.id}`
        )
        setFavourites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      } else {
        const { data } = await axios.post(
          "https://6318b864f6b281877c74b06a.mockapi.io/favourites",
          obj
        )
        setFavourites((prev) => [...prev, data])
      }
    } catch (err) {
      alert("Не удалось добавить в избранное")
      console.error(err)
    }
  }

  const isItemInCart = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <ContextStorage.Provider
      value={{
        items,
        cartItems,
        favourites,
        isItemInCart,
        favouriteHandler,
        setCartOpened,
        setCartItems,
        addToCart,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          closeCart={() => setCartOpened(false)}
          onRemove={removeItemHandler}
          setCartItems={setCartItems}
          opened={cartOpened}
        />
        <Header clickOnCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                favouriteHandler={favouriteHandler}
                addToCart={addToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </ContextStorage.Provider>
  )
}

export default App
