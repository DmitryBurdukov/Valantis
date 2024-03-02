import {useCallback, useEffect, useState} from 'react';

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
	
	// const [visibleFilteredData, setVisibleFilteredData] = useState([]);
	const [filter, setFilter] = useState(false);
	const [filterName, setFilterName] = useState(null);
	const [filteredValue, setFilteredValue] = useState('');
	const [foolFilteredData, setFoolFilteredData] = useState([]);

	// console.log(renderIds)
	const onRequest = (offset = 0, limit = 50) => {
		console.log('APP				REQUEST-REQUEST-REQUEST')

		if (!filterName && !filteredValue ) {
			setError(false)
			service.get_ids(offset, limit)
			.then(data => {
				onGoodListLoaded(data.result)
				})
			.catch((e) => {
				// console.log('ERROR IN APP>>>',e);
				onRequest(offset, limit)})
		}
	}

	const onGoodListLoaded = (listIds) => {
		// console.log('APP				RENDER-listIds')
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
			console.log(value)
			const ans = filterName === 'price' ? +value : value;
			setOffsetFilter(() => 0)
			setFilteredValue(() => ans);
		}

	}



	const cutArrayToShow = (array, offset, limit) => {
		console.log(array)
		const showedArray = array.slice(offset, offset + limit);
		console.log(showedArray);
		return showedArray;
	}

	const onFilterRequest = useCallback((filter, filterValue = '') => {
		// setLoading(true);
		// setError(false)
        if (filter && filterValue) {
            service.filter(filter, filterValue)
					.then(data => {console.log(data.result)
						setFoolFilteredData(() => data.result); //ПОЛНЫЙ массив с полученными данными
						})
					.catch((e) => {
						// setError(true)
						console.log('ERROR IN APP FILTER>>>',e);
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
    // console.log(foolFilteredData)

	// console.log('APP				RENDER')
	// console.log(foolFilteredData)
	const offsetType = filterName && filteredValue ? offsetFilter : offset;
	const activePrevButton = offsetType > 0 ? true : false;

	// console.log('offsetFilter', offsetFilter);
	// console.log('offset', offset);

	const renderElementsArray = (filterName && filteredValue) ? cutArrayToShow(foolFilteredData, offsetFilter, 50) : renderIds;
	
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
			//    foolFilteredData={foolFilteredData}
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
					disabled={!activePrevButton }>
					{/* {offsetType} */}
					Предыдущая
			</button>
			<button className="btn btn btn-primary btn_next" onClick={() => {
							if (!filterName && !filteredValue) {
								setOffset(() => offsetType + 50)
							} else {
								setOffsetFilter(() => offsetType + 50)
							}
							}}
					disabled={filterName && filteredValue && offsetType + 50 > foolFilteredData.length
					|| renderIds.length === 0 }>
						{/* {offsetType} */}
						Следующая</button>
		</div>
		
    </div>
  );
}

export default App;
