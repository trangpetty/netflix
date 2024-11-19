import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

/**
 * Setup and return all middlewares needed for the development
 */
const getDevMiddlewares = () => {


    return [];
};

/**
 * Setup middlewares
 *
 * This must be run after the [redux#applyMiddleware] function
 */
export const setupMiddleware = () => {
    sagaMiddleware.run(rootSaga);
};

const middlewares = [sagaMiddleware, ...getDevMiddlewares()];

export default middlewares;
