import { useState, useRef, useEffect } from "react";
import "./header.scss";

export default function Header({onFilterChoise, onFilterValueChange}) {
    const [filteredValue, setFilteredValue] = useState('');
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
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">фыв</span>
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"
                        onClick={(e) => onFilterChoise(e)}>
                        <span>Фильтровать по:</span>
                        <li className="nav-item">
                            <button className="nav-link active" 
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
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                        {/* <li classNameName="nav-item">
                        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li> */}
                    </ul>
                    <form className="d-flex" role="search" action=''>
                        <input className="form-control me-2" 
                               type="search" 
                               placeholder="Введите данные" 
                               aria-label="Search"
                            //    value={filterValue}
                               onChange={(e) => {filterValue.current = e.target.value}}
                                    />
                        <button className="btn btn-outline-success" 
                                type="submit"
                                onClick={
                                    (e) => {onFilterValueChange(e, filterValue.current); e.target.value = ''}
                                }
                                >Найти</button>
                    </form>
                    </div>
                </div>
            </nav>
    )
            
}