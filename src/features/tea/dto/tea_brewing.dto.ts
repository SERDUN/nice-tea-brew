import { z } from 'zod';
import { createZodDto } from "@anatine/zod-nestjs";

import { TeaBrewingCreateScheme, TeaBrewingSchema, TeaBrewingUpdateScheme } from "../schemes";

export type TeaBrewingDto = z.infer<typeof TeaBrewingSchema>;
export type TeaBrewingCreateDto = z.infer<typeof TeaBrewingCreateScheme>;
export type TeaBrewingUpdateDto = z.infer<typeof TeaBrewingUpdateScheme>;

export class ApiTeaBrewingCreateDto extends createZodDto(TeaBrewingCreateScheme) {
}

export class ApiTeaBrewingUpdateDto extends createZodDto(TeaBrewingUpdateScheme) {
}