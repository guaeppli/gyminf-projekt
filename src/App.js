import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Visualisation from './pages/Visualisation'
import Explanation from './pages/Home'


function App() {


  return (

    <div className='App'>
      <body>
        <header id='main-header'>
          <div className='container'>
            <h1>Paging-Algorithmen</h1>
          </div>
        </header>


        <Router>
          <nav id='navbar' >
            <div className='container'>
              <ul>
                <li><Link to="/">Erklärungen</Link></li>
                <li><Link to="/visualisation">Visualisierung</Link></li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path='/' component={Explanation}></Route>
            <Route exact path='/visualisation' component={Visualisation}></Route>
          </Switch>

        </Router >

        

          <footer id='main-footer'>
            <p>Created by Gustavo Aeppli</p>
          </footer> 

      </body>

    </div >

  );
}

export default App


