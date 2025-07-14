import { z } from 'zod';
import { TeaBrewingCreateScheme, TeaBrewingSchema, TeaBrewingUpdateScheme } from "../schemes";

export type TeaBrewingDto = z.infer<typeof TeaBrewingSchema>;
export type TeaBrewingCreateDto = z.infer<typeof TeaBrewingCreateScheme>;
export type TeaBrewingUpdateDto = z.infer<typeof TeaBrewingUpdateScheme>;
