import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    updateUserSuccess,
    updateUserFailure,
    updateUserRequest,
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure
} from '../redux/index';
import { userApi } from '../services/index.ts';
import {Profile, User} from '../types.ts';

function* fetchUsersSaga(action: { payload: { pageNo: number; pageSize: number; email?: string } }) {
    try {
        const { pageNo, pageSize, email } = action.payload;
        const response = yield call(() => userApi.getUserList(pageNo, pageSize, email));
        yield put(
            fetchUsersSuccess({
                users: response.data.content,
                currentPage: response.data.currentPage,
                totalItems: response.data.totalItems,
            })
        );
    } catch (error: any) {
        yield put(fetchUsersFailure(error.message));
    }
}

function* updateUserSaga(action: { payload: { id: number, data: Partial<User> } }) {
    try {

        const { id, data } = action.payload;
        const response = yield call(() => userApi.updateUser(id, data));

        yield put(updateUserSuccess(response.data));
    } catch (error: any) {
        yield put(updateUserFailure(error.message));
    }
}

function* fetchUserSaga(action: { payload: { id: number } }) {
    try {
        const { id } = action.payload;
        const response = yield call(() => userApi.getUserById(id));

        const profiles: Profile[] = response.data;
        yield put(fetchUserSuccess(profiles));
    } catch (error: any) {
        const errorMessage = error.message || 'Failed to fetch user context.';
        yield put(fetchUserFailure(errorMessage));
    }
}

export function* userSaga() {
    yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
    yield takeLatest(updateUserRequest.type, updateUserSaga);
    yield takeLatest(fetchUserRequest.type, fetchUserSaga);
}
