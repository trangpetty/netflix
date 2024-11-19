import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from '../components/admin/user/redux/index';
// import subscriptionReducer from './subscriptionSlice';
import { userSaga } from '../components/admin/user/saga/index';
// import { subscriptionSaga } from './subscriptionSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userReducer,
        // subscription: subscriptionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(userSaga);
// sagaMiddleware.run(subscriptionSaga);

export default store;