import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import myReducer from './Redux/reducer/myReducer'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'

const store = createStore(
  myReducer,
  applyMiddleware(thunk)
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

reportWebVitals();