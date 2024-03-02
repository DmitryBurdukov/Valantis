import { useState, useRef, useEffect } from "react";
import "./header.scss";

export default function Header({onFilterChoise, onFilterValueChange}) {
    let priceFilter = useRef(null),
        productFilter = useRef(null),
        brandFilter = useRef(null),
        disableFilter = useRef(null),
        filterValue = useRef('');

    const removeClasses = (array, classNames) => {
        array.forEach(item => item.classList.remove(classNames))
    }

    useEffect(() => {
        const refs = [priceFilter.current, productFilter.current, brandFilter.current, disableFilter.current];
        refs.forEach(item => {  
            item.addEventListener('click', (e) => {
                removeClasses(refs, 'active');
                item.classList.add('active')
            })
        })
    }, [priceFilter.current, productFilter.current, brandFilter.current, disableFilter.current])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary container">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Логотип</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"
                        onClick={(e) => onFilterChoise(e)}>
                        <span>Фильтровать по:</span>
                        <li className="nav-item">
                            <button className="nav-link" 
                                aria-current="page" 
                                data-filter="price"
                                ref={priceFilter}>
                                Цена
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" 
                                data-filter="product"
                                ref={productFilter}>
                                Название
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" 
                                data-filter="brand"
                                ref={brandFilter}>
                                Бренд
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" 
                                data-filter={null}
                                ref={disableFilter}
                                >
                                Сбросить все фильтры
                            </button>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" action=''>
                        <input className="form-control me-2" 
                            type="search" 
                            placeholder="Введите данные" 
                            aria-label="Search"
                            onChange={(e) => {filterValue.current = e.target.value}}
                        />
                        <button className="btn btn-outline-success" 
                                type="submit"
                                onClick={
                                    (e) => {onFilterValueChange(e, filterValue.current); e.target.value = ''}
                                }
                            >Найти
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
            
}