import {useEffect, useState} from 'react';

import Header from './components/header/Header';
import Goods from './components/goods/Goods';
import Service from './components/service/Service';

import './App.css';

function App() {
	const service = new Service();
 	const [renderIds, setRenderIds] = useState([]);
	const [isError, setError] = useState(false);
	const [offset, setOffset] = useState(0);

	console.log(renderIds)
	const onRequest = (offset = 0, limit = 50) => {
		setError(false)
		service.get_ids(offset, limit)
		.then(data => {
			onGoodListLoaded(data.result)
			})
		.catch((e) => {
			console.log('ERROR IN APP>>>',e);
			onRequest(offset, limit)})
	}

    const onError = (value) => {
        setError(value)
    }

	const onGoodListLoaded = (listIds) => {
		setRenderIds(listIds);
	}

	useEffect(() => {
		console.log('EFFECT')
		onRequest(offset, 50)
	}, [offset])

  return (
    <div className="App">
        <Header/>
        <Goods renderIds={renderIds} isError={isError}/>
		<button className="btn btn_next" onClick={() => setOffset(offset + 50)}>{offset}</button>
    </div>
  );
}

export default App;
