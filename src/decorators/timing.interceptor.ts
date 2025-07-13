import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(TimingInterceptor.name);

    intercept(_: ExecutionContext, next: CallHandler) {
        const now = Date.now();

        return next.handle().pipe(
            tap(() => this.logger.log(`Handled in ${Date.now() - now}ms`)),
        );
    }
}
