import http from '../../../../core/http';
import { Sub } from '../types';
import {PaginatedResponse} from "../../../../redux/types.ts";

export const subscriptionApi = {

    getSubList: (pageNo: number = 1, pageSize: number = 10, name?: string): Promise<PaginatedResponse<Sub>> => {
        const params = 'name=' + (name ? name : '') + '&pageNo=' + pageNo + '&pageSize=' + pageSize;

        return http.get(`/subs?${params}`);
    },

    updateSub: (id: number, data: Partial<Sub>): Promise<Sub> => {
        return http.put(`/subs/${id}`, data);
    },

    deleteSub: (id: number): Promise<void> => {
        return http.delete(`/subs/${id}`);
    },

    createSub: (data: Partial<Sub>): Promise<Sub> => {
        return http.post(`/subs`, data);
    },
};