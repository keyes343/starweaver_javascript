import './App.css';

import Planets from '../Planets';
import SinglePlanet from './SinglePlanet';

import {BrowserRouter,Route,Router} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { c } from './index';
import axios from 'axios';

const initialState = {
  allPlanets: false
}

const reducer = (state,action={type:'',payload:''}) => {
  const { type,payload } = action;
  let newState = {...state};
  switch(type){
    case 'allPlanets': newState.allPlanets = payload; break;
    default: break;
  }
  return newState;
}

export const state_ = React.createContext();
export const dispatch_ = React.createContext();

const App = () => {
  const history = createBrowserHistory();

  const [state,dispatch] = React.useReducer(reducer,initialState);

  const fetchData = React.useCallback(async() => {
    if(!state.allPlanets){
      const fetched = await axios.get( 'https://swapi.dev/api/planets/' );
      if(fetched){
        const values = fetched.data.results;

        dispatch({
          type: 'allPlanets',
          payload: values,
        })
      }else{
        alert("Couldn't fetch data")
      }
    }
  },[state.allPlanets])

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return ( 
    <state_.Provider value={state} >
      <dispatch_.Provider value={dispatch} >
        <div >
          <Router history={history} >
            <BrowserRouter >
              <Route exact path='/' >
                <h1>Star Wars Planets</h1>
                <Planets />
              </Route>

              <Route path='/:planet' >
                <SinglePlanet />
              </Route>
            </BrowserRouter>
          </Router>
        </div>
      </dispatch_.Provider>
    </state_.Provider>
   );
}

export const UseState = () =>{
  const ctx = React.useContext(state_);
  return ctx;
}
export const UseDispatch = () =>{
  const ctx = React.useContext(dispatch_);
  return ctx;
}
 
export default App;
