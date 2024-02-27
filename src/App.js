import Header from './components/header/Header';
import Service from './components/service/Service';

import './App.css';

function App() {

  const service = new Service().get_ids()
                               .then(data => console.log(data.result))
                               .catch(() => console.log('catch'));
  return (
    <div className="App">
        <Header/>
    </div>
  );
}

export default App;
