import "@babel/polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {rootSaga } from './sagas' 
import { composeWithDevTools } from 'redux-devtools-extension';

import Counter from './Counter'
import reducer from './reducers'

// const store = createStore(reducer)


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

const action = type => store.dispatch({type})

sagaMiddleware.run(rootSaga)
// sagaMiddleware.run(helloSaga1)

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')} 
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onNameNumberUpdate={()=>action('INCREMENT_AND_NAME')}
      getPostData={()=>action('GET_POST_DATA')}
      />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
