import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeaModule } from './features/tea/tea.module';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ApiKeyGuard } from "./decorators/guard";
import { TimingInterceptor } from "./decorators/timing.interceptor";

@Module({
    imports: [TeaModule,
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 10,
                },
            ],
        }),
    ],
    controllers: [AppController],
    providers: [
        Logger,
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ApiKeyGuard
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TimingInterceptor,
        },
    ],
})
export class AppModule {
}
