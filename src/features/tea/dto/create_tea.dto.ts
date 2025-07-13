import { TeaSchema } from "./tea.dto";
import { z } from 'zod';

export const BrewCreateDtoScheme = TeaSchema.omit({id: true});
export type BrewCreateDto = z.infer<typeof BrewCreateDtoScheme>;