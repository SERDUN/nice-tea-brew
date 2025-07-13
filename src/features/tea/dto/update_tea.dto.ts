import { z } from 'zod';
import { TeaSchema } from "./tea.dto";

export const TeaUpdateDtoScheme = TeaSchema.partial().extend({id: z.string().optional()});
export type BrewUpdateDto = z.infer<typeof TeaUpdateDtoScheme>;
