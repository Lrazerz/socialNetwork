import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducer';
import { initialStoreState } from './initialState';

const middleware = [thunk];

// todo types
const store = createStore(
  rootReducer,
  // initial state incorrect type
  // https://stackoverflow.com/questions/67296603/type-string-is-not-assignable-to-type-undefined-error-on-react-redux-initial
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  initialStoreState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
