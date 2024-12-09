import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchSubsRequest,
    fetchSubsSuccess,
    fetchSubsFailure,
    updateSubSuccess,
    updateSubFailure,
    updateSubRequest,
    createSubSuccess,
    createSubFailure,
    createSubRequest, deleteSubSuccess, deleteSubFailure, deleteSubRequest,
} from '../redux/index';
import { subscriptionApi } from '../services/index.ts';
import { Sub } from '../types.ts';

function* fetchSubsSaga(action: { payload: { pageNo: number; pageSize: number; name?: string } }) {
    try {
        const { pageNo, pageSize, name } = action.payload;
        const response = yield call(() => subscriptionApi.getSubList(pageNo, pageSize, name));

        yield put(
            fetchSubsSuccess({
                subs: response.data.content,
                currentPage: response.data.currentPage,
                totalItems: response.data.totalItems,
            })
        );
        // const response = yield call(() => subscriptionApi.getSubList());
        // const subs: Sub[] = response.data.content;
        //
        // yield put(fetchSubsSuccess(subs));
    } catch (error: any) {
        yield put(fetchSubsFailure(error.message));
    }
}

function* updateSubSaga(action: { payload: { id: number, data: Partial<Sub> } }) {
    try {

        const { id, data } = action.payload;
        const response = yield call(() => subscriptionApi.updateSub(id, data));

        yield put(updateSubSuccess(response.data));
    } catch (error: any) {
        yield put(updateSubFailure(error.message));
    }
}

function* createSubSaga(action: { payload: { data: Partial<Sub> } }) {
    try {
        const { data } = action.payload;
        const response = yield call(() => subscriptionApi.createSub(data));

        yield put(createSubSuccess(response.data));
    } catch (error: any) {
        yield put(createSubFailure(error.message));
    }
}

function* deleteSubSaga(action: { payload: number }) {
    try {
        const id = action.payload;
        yield call(() => subscriptionApi.deleteSub(id));

        yield put(deleteSubSuccess(id));
    } catch (error: any) {
        yield put(deleteSubFailure(error.response?.data?.message || error.message));
    }
}


export function* subscriptionSaga() {
    yield takeLatest(fetchSubsRequest.type, fetchSubsSaga);
    yield takeLatest(updateSubRequest.type, updateSubSaga);
    yield takeLatest(createSubRequest.type, createSubSaga);
    yield takeLatest(deleteSubRequest.type, deleteSubSaga);
}
