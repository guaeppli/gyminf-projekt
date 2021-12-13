import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import useGlobaState from './store/useGlobalState'
import Context from './store/Context'

const Index = () => {
  const store = useGlobaState()
  return (
    <Context.Provider value ={store}>
      <App />
    </Context.Provider>
  )
}


ReactDOM.render(
  <React.StrictMode>
      <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

