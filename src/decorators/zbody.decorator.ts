import {
    createParamDecorator,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';
import { ZodType } from 'zod';

export function ZBody<T extends ZodType<any, any, any>>(schema: T) {
    return createParamDecorator(
        async (_: unknown, context: ExecutionContext) => {
            const request = context.switchToHttp().getRequest();
            const result = await schema.safeParseAsync(request.body);

            if (!result.success) {
                throw new BadRequestException(result.error.format());
            }

            return result.data;
        },
    )();
}
