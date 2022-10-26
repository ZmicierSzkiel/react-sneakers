import React, { useState } from "react"
import styles from "./Card.module.scss"
import ContentLoader from "react-content-loader"
import ContextStorage from "../../Context"
import { useContext } from "react"

function Card({
  id,
  clickOnFavourite,
  clickOnPlus,
  title,
  imageUrl,
  price,
  favourited = false,
  loading = false,
}) {
  // states
  const { isItemInCart } = useContext(ContextStorage)
  const [isFavourite, setIsFavourite] = useState(favourited)
  const obj = { id, parentId: id, title, imageUrl, price }

  //events
  const addHandler = () => {
    clickOnPlus(obj)
  }

  const onClickFavourite = () => {
    clickOnFavourite(obj)
    setIsFavourite(!isFavourite)
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
          <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
          <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
          <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
          <rect x="118" y="155" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favourite} onClick={onClickFavourite}>
            {clickOnFavourite && (
              <img
                src={isFavourite ? "img/liked.svg" : "img/unliked.svg"}
                alt="unliked"
              />
            )}
          </div>
          <img width={133} height={112} src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} р.</b>
            </div>
            {clickOnPlus && (
              <img
                className={styles.addBtn}
                src={isItemInCart(id) ? "img/added-btn.svg" : "img/add-btn.svg"}
                alt={isItemInCart(id) ? "added-btn" : "add-btn"}
                onClick={addHandler}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
