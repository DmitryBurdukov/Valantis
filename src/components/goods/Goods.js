import { useEffect, useState } from "react";

import Service from "../service/Service";
import GoodItem from "../goodItem/GoodItem";
import Spinner from "../spinner/Spinner";

import "./goods.scss";

function Goods({ isErrorFromProps, renderIds, activeFilter, filteredValue, loadingData, foolFilteredData}) {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(isErrorFromProps);
    console.log('GOODS              RENDER');
    console.log(renderIds)
    const service = new Service();
    const getGoods = (idsArray) => { // ЗАГРУЖАЕТ ДАННЫЕ ПО ЗАПРОСУ
        setLoading(true)
        service.get_items(idsArray)
            .then(data => {onGoodsLoaded(data.result)}) // СТРОИТ МАССИВ ДЛЯ РЕНДЕРИНГА И УБИРАЕТ ПОВТОРЯЮЩИЕСЯ ЭЛЕМЕНТЫ
            .catch((e) => {
                console.log('ERROR IN GOODS', e)
                // onError(true);
                setLoading(({loading}) => false)

                getGoods(idsArray)
            });
    }



    const onError = (value) => {
        // setError(value)
    }

    const onGoodsLoaded = (data) => {
        console.log(data)
        let checkItemsArray = [];
        const goodsItems = data.map(item => {
            if (checkItemsArray.indexOf(item['id']) === -1) {
                checkItemsArray.push(item.id)
                return (
                    <GoodItem key={item.id} itemData={item}/>
                )
            }
        })
        setGoods(goodsItems);
        setLoading(() => false);

    }

    // useEffect(() => {
        
    // }, [loading])

    useEffect(() => {
        if (renderIds.length > 0) {
            getGoods(renderIds);
        }
    }, [renderIds, activeFilter, filteredValue]);
    const spinner = loading || loadingData ? <Spinner/> : null;
    const error = isError ? 'Что-то пошло не так' : null;
    // const 
    const goodsArray = renderIds.length === 0 ? [] : (goods && !loading && !error) ? goods : null;
    return (
        <>
            <h1 className="title mt-4 mb-4">Перечень товаров</h1>
            {/* <h2>{activeFilter}</h2> */}
            {/* <h2>{filteredValue}</h2> */}
            <div className="d-flex p-2 flex-row justify-content-center container goods">
                {spinner}
                {goodsArray}
                {error}
            </div>
        </>
    )
}

export default Goods;