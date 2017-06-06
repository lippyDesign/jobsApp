import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk)),
  autoRehydrate()
);
// whitelist tells us to only care about likedJobs keys
// .purge() at the end to dump all saved state
// BIG GOTCHA with redux-persist is the fact that if we change the data format in the reducer
// (for example from {} to []) because user maybe haven't logged into the app in a while
persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

export default store;