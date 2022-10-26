import { React, useContext } from "react"

import ContextStorage from "../../Context"

import Card from "../Card"

function Favourites() {
  const { favourites, favouriteHandler } = useContext(ContextStorage)

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favourites.map((item) => (
          <Card
            key={item.id}
            favourited={true}
            clickOnFavourite={(obj) => favouriteHandler(obj)} // added to favourites
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Favourites
