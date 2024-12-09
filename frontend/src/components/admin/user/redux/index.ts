import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Profile, UserState } from '../types.ts';

const initialState: UserState = {
    users: [],
    profiles: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalItems: 0
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess(state, action: PayloadAction<{ users: User[]; currentPage: number; totalItems: number; }>) {
            state.loading = false;
            state.users = action.payload.users;
            state.currentPage = action.payload.currentPage;
            state.totalItems = action.payload.totalItems;
        },
        fetchUsersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateUserSuccess(state, action: PayloadAction<User>) {
            state.loading = false;
            const updatedUser = action.payload;
            state.users = state.users.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            );
        },
        updateUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchUserRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUserSuccess(state, action: PayloadAction<Profile[]>) {
            state.loading = false;
            state.profiles = action.payload;
        },
        fetchUserFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
