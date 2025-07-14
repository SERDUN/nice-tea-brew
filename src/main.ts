import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableShutdownHooks();

    // TODO: Need to use environment variable for Swagger
    const config = new DocumentBuilder()
        .setTitle('Tea API')
        .setDescription('API documentation for the Tea application')
        .setVersion('1.0')
        .addTag('tea')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    app.setGlobalPrefix('api');
    // TODO: Need use environment variable for port
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
