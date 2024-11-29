import { all } from 'redux-saga/effects';
import internsSaga from './internsSaga';

function* rootSaga() {
  yield all([internsSaga()]);
}

export default rootSaga;
