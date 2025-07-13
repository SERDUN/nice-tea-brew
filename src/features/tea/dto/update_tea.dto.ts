import { TeaSchema } from "./tea.dto";
import { z } from 'zod';
import { BrewCreateDto } from "./create_tea.dto";

export const TeaUpdateDto = BrewCreateDto.partial().extend({id: z.string()});
export type BrewUpdateDto = z.infer<typeof TeaUpdateDto>;
