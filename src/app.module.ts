import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeaModule } from './features/tea/tea.module';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

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
    providers: [AppService,
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },],
})
export class AppModule {
}
