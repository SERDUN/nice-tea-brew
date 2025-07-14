import { z } from 'zod';

export const TeaBrewingSchema = z.object({
    id: z.string(),
    name: z.string().min(2).max(30),
    rating: z.number().min(1).max(10).optional(),
    brewTemp: z.number().min(60).max(100).optional(),
    notes: z.string().max(20).optional(),
});


export const TeaBrewingCreateScheme = TeaBrewingSchema.omit({id: true});
export const TeaBrewingUpdateScheme = TeaBrewingSchema.partial().extend({id: z.string().optional()});
