import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  setInterns,
  addIntern,
  saveEditIntern,
  deleteIntern,
} from '@models/internsSlice';

const JSON_SERVER_URL = 'http://localhost:5000/interns';

function* fetchInterns() {
  try {
    const response = yield call(axios.get, JSON_SERVER_URL);
    yield put(setInterns(response.data));
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

function* addInternSaga(action) {
  try {
    const response = yield call(axios.post, JSON_SERVER_URL, action.payload);
    yield put(addIntern(response.data));
  } catch (error) {
    console.error('Ошибка при добавлении интерна:', error);
  }
}

function* editInternSaga(action) {
  try {
    const response = yield call(
      axios.put,
      `${JSON_SERVER_URL}/${action.payload.id}`,
      action.payload,
    );
    yield put(saveEditIntern(response.data));
  } catch (error) {
    console.error('Ошибка при редактировании интерна:', error);
  }
}

function* deleteInternSaga(action) {
  try {
    yield call(axios.delete, `${JSON_SERVER_URL}/${action.payload}`);
    yield put(deleteIntern(action.payload.id));
    const response = yield call(axios.get, JSON_SERVER_URL);
    yield put(setInterns(response.data));
  } catch (error) {
    console.error('Ошибка при удалении интерна:', error);
  }
}

export default function* internsSaga() {
  yield takeEvery('interns/fetchInterns', fetchInterns);
  yield takeEvery('interns/addInternSaga', addInternSaga);
  yield takeEvery('interns/editInternSaga', editInternSaga);
  yield takeEvery('interns/deleteInternSaga', deleteInternSaga);
}
