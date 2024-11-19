import http from '../core/http';
import { User, Profile } from '../components/admin/user/types.ts';

export const userApi = {
    getUserList: (): Promise<User[]> => {
        return http.get('/users');
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

