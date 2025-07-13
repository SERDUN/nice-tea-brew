import { TeaSchema } from "./tea.dto";
import { z } from 'zod';

export const BrewCreateDto = TeaSchema.omit({id: true});
export type BrewCreateDto = z.infer<typeof BrewCreateDto>;