import Card from "../Card"

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  favouriteHandler,
  addToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    )

    return isLoading
      ? [...Array(8)].map(() => <Card loading={isLoading} />)
      : filteredItems.map((item) => (
          <Card
            clickOnFavourite={(obj) => favouriteHandler(obj)} // added to favourites
            clickOnPlus={(obj) => addToCart(obj)} // added to cart
            key={item.id}
            {...item}
          />
        ))
  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="img/delete-btn.svg"
              alt="clear"
            />
          )}
          <input
            type="text"
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  )
}

export default Home
