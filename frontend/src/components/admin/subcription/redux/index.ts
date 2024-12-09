import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sub, SubState } from '../types.ts';

const initialState: SubState = {
    subs: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalItems: 0
};

const subSlice = createSlice({
    name: 'sub',
    initialState,
    reducers: {
        fetchSubsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchSubsSuccess(state, action: PayloadAction<{ subs: Sub[]; currentPage: number; totalItems: number; }>) {
            state.loading = false;
            state.subs = action.payload.subs;
            state.currentPage = action.payload.currentPage;
            state.totalItems = action.payload.totalItems;
        },
        fetchSubsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateSubRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateSubSuccess(state, action: PayloadAction<Sub>) {
            state.loading = false;
            const updatedSub = action.payload;
            state.subs = state.subs.map(sub =>
                sub.id === updatedSub.id ? updatedSub : sub
            );
        },
        updateSubFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        createSubRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createSubSuccess(state, action: PayloadAction<Sub>) {
            state.loading = false;
            state.subs.push(action.payload)
        },
        createSubFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteSubRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteSubSuccess(state, action: PayloadAction<number>) {
            state.loading = false;
            state.subs = state.subs.filter((sub) => sub.id !== action.payload);
        },
        deleteSubFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchSubsRequest,
    fetchSubsSuccess,
    fetchSubsFailure,
    updateSubRequest,
    updateSubSuccess,
    updateSubFailure,
    createSubRequest,
    createSubSuccess,
    createSubFailure,
    deleteSubRequest,
    deleteSubSuccess,
    deleteSubFailure
} = subSlice.actions;

export default subSlice.reducer;
