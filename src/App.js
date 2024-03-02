import {useCallback, useEffect, useState, useRef} from 'react';

import Header from './components/header/Header';
import Goods from './components/goods/Goods';
import Service from './components/service/Service';

import './App.css';

function App() {
	const service = new Service();
 	const [renderIds, setRenderIds] = useState([]);
	const [isError, setError] = useState(false);
	const [offset, setOffset] = useState(0);
	const [offsetFilter, setOffsetFilter] = useState(0);
	const [loading, setLoading] = useState(false)
	
	const [filter, setFilter] = useState(false);
	const [filterName, setFilterName] = useState(null);
	const [filteredValue, setFilteredValue] = useState('');
	const [foolFilteredData, setFoolFilteredData] = useState([]);

	const onRequest = (offset = 0, limit = 50) => {

		if (!filterName && !filteredValue ) {
			setError(false)
			service.get_ids(offset, limit)
			.then(data => {
				onGoodListLoaded(data.result)
				})
			.catch((e) => {
				console.log(e);
				onRequest(offset, limit)})
		}
	}

	const onGoodListLoaded = (listIds) => {
		setRenderIds(listIds);
	}

	const onFilterChoise = (e) => {
		e.preventDefault();
		const filter = e.target.getAttribute('data-filter');
		setFilterName(filter);
		if (!e.target.getAttribute('data-filter')) {
			setFilteredValue(() => null);
			setFilter(() => true)
	}
	}

    const onError = (value) => {
        setError(value)
    }

	const onInput = (e, value) => {
		e.preventDefault();
		if (value && filterName) {
			const ans = filterName === 'price' ? +value : value;
			setOffsetFilter(() => 0)
			setFilteredValue(() => ans);
		}

	}

	const cutArrayToShow = (array, offset, limit) => {
		const showedArray = array.slice(offset, offset + limit);
		return showedArray;
	}

	const onFilterRequest = useCallback((filter, filterValue = '') => {
		console.log("FILTER REQUEST")
        if (filter && filterValue) {
            service.filter(filter, filterValue)
					.then(data => {
						setFoolFilteredData(() => data.result); //ПОЛНЫЙ массив с полученными данными
						})
					.catch((e) => {
						onFilterRequest(filter, filterValue);
						setError(e);
					})
        }
	}, [foolFilteredData])

	useEffect(() => {
		onRequest(offset, 50)
	}, [offset, filter]);

	useEffect(() => {
		if (filterName && filteredValue) {
			onFilterRequest(filterName, filteredValue);
		}
	}, [filterName, filteredValue])

	const offsetType = filterName && filteredValue ? offsetFilter : offset;
	const activePrevButton = offsetType > 0 ? true : false;
	const renderElementsArray = (filterName && filteredValue !=='') ? cutArrayToShow(foolFilteredData, offsetFilter, 50) : renderIds;
	return (
    <div className="App">
        <Header key='header'
				onFilterChoise={onFilterChoise}
				onFilterValueChange={onInput}
				/>
        <Goods key='goods'
			   renderIds={renderElementsArray} 
			   isError={isError}
			   activeFilter={filterName}
			   filteredValue={filteredValue}
			   loadingData={loading}
			   />
		<div className="triggers__wrapper container">
			<button className="btn btn-primary btn_prev" 
					onClick={() => {
							if (!filterName && !filteredValue) {
								offsetType >= 50 ? 
								setOffset(() => offsetType - 50) : 
								setOffset(() => 0)
							} else {
								offsetType >= 50 ? 
								setOffsetFilter(() => offsetType - 50) : 
								setOffsetFilter(() => 0)
							}
						}}
					disabled={!activePrevButton}>
				Предыдущая
			</button>
			<button className="btn btn btn-primary btn_next" 
					onClick={() => {
						if (!filterName && !filteredValue) {
							setOffset(() => offsetType + 50)
						} else {
							setOffsetFilter(() => offsetType + 50)
						}
					}}
					disabled={filterName && filteredValue && offsetType + 50 > foolFilteredData.length || renderIds.length === 0 }>
				Следующая
			</button>
		</div>
		
    </div>
  );
}

export default App;
