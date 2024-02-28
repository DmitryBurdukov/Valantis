import { useEffect, useState } from "react";

import Service from "../service/Service";
import GoodItem from "../goodItem/GoodItem";
import Spinner from "../spinner/Spinner";

import "./goods.scss";

function Goods(props) {
    const {renderIds} = props;
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(props.isError);

    const service = new Service();

    const getGoods = (idsArray) => {
        service.get_items(idsArray)
            .then(data => onGoodsLoaded(data.result))
            .catch((e) => {
                console.log('ERROR IN GOODS', e)
                // onError(true);
                // setLoading(false)
                getGoods(idsArray)
            });
    }

    const onError = (value) => {
        setError(value)
    }

    const onGoodsLoaded = (data) => {
        console.log(data)
        let checkItemsArray = [];
        const godsItems = data.map(item => {
            if (checkItemsArray.indexOf(item['id']) === -1) {
                checkItemsArray.push(item.id)
                return (
                    <GoodItem key={item.id} itemData={item}/>
                )
            }
        })
        setGoods(godsItems);
        setLoading(false);
    }

    useEffect(() => {
        if (renderIds.length > 0) {
            getGoods(renderIds);
        }
    }, [renderIds]);

    const spinner = loading ? <Spinner/> : null;
    const error = isError ? 'Что-то пошло не так' : null;
    return (
        <>
            <h1 className="title mt-4 mb-4">Перечень товаров</h1>

            <div className="d-flex p-2 flex-row justify-content-center container goods">
                {/* <div className="p-2 d-flex flex-column p-2 goods__item border border-primary">
                    <div className="p-1 goods__id">ID товара: <span>id</span></div>
                    <div className="p-1 goods__brand">Название бренда: <span>brand</span></div>
            <div className="p-1 goods__price">Цена: <span>price</span></div>
            <div className="p-1 goods__product">Название: <span>product</span></div>
                </div> */}
                {spinner}
                {goods}
                {error}
            </div>
        </>
    )
}

export default Goods;