export default function GoodItem(props) {
    const {id, brand, price, product} = props.itemData;

    // console.log(props)
    return (
        <div className="p-2 d-flex flex-column p-2 goods__item border border-primary">
            <div className="p-1 goods__row">ID товара: <span>{id ? id : 'ID неизвестен'}</span></div>
            <div className="p-1 goods__row">Название бренда: <span>{brand ? brand : "Без названия"}</span></div>
            <div className="p-1 goods__row">Цена: <span>{price ? price : "Цена не установлена"}</span></div>
            <div className="p-1 goods__row">Название: <span>{product ? product : "Название товара не известно"}</span></div>
        </div>
    )
}