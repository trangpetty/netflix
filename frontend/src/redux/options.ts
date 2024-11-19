import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const Transform = createTransform(
    (inboundState: any, key) => {
        return inboundState;
    },
    (outBoundState: any, key) => {
        return outBoundState;
    }
);

export const persistConfig = {
    timeout: import.meta.env.MODE === 'development' ? 0 : 3000,
    key: `admin:root`,
    storage,
    whitelist: [],
    transforms: [Transform],
};
