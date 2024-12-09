import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from '../components/admin/user/redux/index';
import subscriptionReducer from '../components/admin/subcription/redux/index';
import { userSaga } from '../components/admin/user/saga/index';
import { subscriptionSaga } from '../components/admin/subcription/saga/index';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userReducer,
        sub: subscriptionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(userSaga);
sagaMiddleware.run(subscriptionSaga);

export default store;