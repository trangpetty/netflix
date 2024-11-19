export interface User {
    id: number;
    email: string;
    role: number;
    dob: Date;
}

export interface Profile {
    id: number;
    userID: number;
    name: string;
    ageRating: number;
    language: string;
    avatar: string;
    createAt: Date;
}

export interface UserState {
    users: User[];
    profiles: Profile[];
    loading: boolean;
    error: string | null;
}

export interface FetchUsersResponse {
    users: User[];
}

export interface UpdateUserPayload {
    id: number;
    email: string;
    role: number;
    dob: Date;
}

export interface DeleteUserPayload {
    id: number;
}
