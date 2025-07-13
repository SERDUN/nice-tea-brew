import { z } from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';

export const TeaSchema = z.object({
    id: z.string().openapi({description: "Unique identifier for the brew"}),
    name: z.string().min(2).max(30).openapi({description: "Name of the beans used in the brew"}),
    rating: z.number().min(1).max(5).optional().openapi({description: "Rating of the brew, from 1 to 5"}),
    brewTemp: z.number().min(60).max(100).optional().openapi({description: "Rating of the brew, from 1 to 5"}),
    notes: z.string().max(20).optional().openapi({description: "Notes for this brew"}),
});

export type Tea = z.infer<typeof TeaSchema>;
