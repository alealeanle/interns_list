import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import internsSlice from '@models/internsSlice';
import rootSaga from '@saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    interns: internsSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

store.dispatch({ type: 'interns/fetchInterns' });

export default store;
