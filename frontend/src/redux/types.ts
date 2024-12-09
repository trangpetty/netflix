export interface PaginatedResponse<T> {
    content: T[];
    currentPage: number;
    totalItems: number;
}