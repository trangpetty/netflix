import http from '../../../../core/http';
import { User, Profile } from '../types';
import {PaginatedResponse} from "../../../../redux/types.ts";

export const userApi = {
    getUserList: (pageNo: number = 1, pageSize: number = 10, email?: string): Promise<PaginatedResponse<User>> => {
        const params = 'email=' + (email ? email : '') + '&pageNo=' + pageNo + '&pageSize=' + pageSize;
        return http.get(`/users?${params}`);
    },

    getUserById: (id: number): Promise<Profile> => {
        return http.get(`/users/${id}`);
    },

    updateUser: (id: number, data: Partial<User>): Promise<User> => {
        return http.put(`/users/${id}`, data);
    },

    deleteUser: (id: number): Promise<void> => {
        return http.delete(`/users/${id}`);
    },
};