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
import { userApi } from '../../../../api/user';
import {Profile, User} from '../types.ts';

function* fetchUsersSaga() {
    try {
        const response = yield call(() => userApi.getUserList());
        const users: User[] = response.data.content;

        yield put(fetchUsersSuccess(users));
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
        const errorMessage = error.message || 'Failed to fetch user profile.';
        yield put(fetchUserFailure(errorMessage));
    }
}

export function* userSaga() {
    yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
    yield takeLatest(updateUserRequest.type, updateUserSaga);
    yield takeLatest(fetchUserRequest.type, fetchUserSaga);
}
