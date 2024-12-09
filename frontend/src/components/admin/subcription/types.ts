export interface Sub {
    id: number;
    name: string;
    price: number;
    resolution: string;
    maxScreens: number;
    maxDownloadDevices: number;
    createAt: Date;
    updateAt: Date;
}

export interface SubState {
    subs: Sub[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalItems: number;
}