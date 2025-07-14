import { z } from 'zod';

export const TeaSchema = z.object({
    id: z.string(),
    name: z.string().min(2).max(30),
    rating: z.number().min(1).max(10).optional(),
    brewTemp: z.number().min(60).max(100).optional(),
    notes: z.string().max(20).optional(),
});


export const BrewCreateDtoScheme = TeaSchema.omit({id: true});
export const TeaUpdateDtoScheme = TeaSchema.partial().extend({id: z.string().optional()});

export type Tea = z.infer<typeof TeaSchema>;
export type BrewCreateDto = z.infer<typeof BrewCreateDtoScheme>;
export type BrewUpdateDto = z.infer<typeof TeaUpdateDtoScheme>;
