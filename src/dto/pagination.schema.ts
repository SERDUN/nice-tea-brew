import { z } from 'zod';

export const PaginationQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).default(10),
});

export type Pagination = z.infer<typeof PaginationQuerySchema>;
