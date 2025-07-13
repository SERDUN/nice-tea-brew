export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

export function paginate<T>(
    items: T[],
    page: number = 1,
    pageSize: number = 10
): PaginatedResult<T> {
    const startIndex = (page - 1) * pageSize;
    const data = items.slice(startIndex, startIndex + pageSize);
    return {data, total: items.length, page, pageSize};
}