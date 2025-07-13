import {
    createParamDecorator,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export const ZBody = (schema: ZodSchema) =>
    createParamDecorator(
        async (_: unknown, context: ExecutionContext) => {
            const request = context.switchToHttp().getRequest();
            try {
                return await schema.parseAsync(request.body);
            } catch (error: any) {
                throw new BadRequestException(error.format?.() ?? error.message);
            }
        },
    )();