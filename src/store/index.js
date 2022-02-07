import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import appReducer from "./reducers/appReducer";


const enhancers = [];

if (process.env.NODE_ENV === 'development') {

  if (typeof devToolsExtension === 'function') {
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }
}


const reducer = combineReducers({app: appReducer});
const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      ...enhancers
    )
  );
export default store
