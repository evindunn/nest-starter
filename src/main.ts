import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './app-config/app-config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

const API_TITLE = 'NestJS API';
const API_VERSION = 'v1';
const API_DOCS_ROUTE = 'docs';

const logger = new Logger(API_TITLE);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(AppConfigService);

    app.setGlobalPrefix(`/api/${API_VERSION}`);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.getHttpAdapter().enableCors({
        origin: config.app.cors.origin(),
        credentials: config.app.cors.allowCredentials()
    });

    logger.log(`App environment: ${config.app.env()}`);

    if (config.app.isDev()) {
        logger.log(`Docs available at /${API_DOCS_ROUTE}`);

        const swaggerBuilder = new DocumentBuilder()
            .setTitle(API_TITLE)
            .setVersion(API_VERSION)
            .build();

        const swaggerDoc = SwaggerModule.createDocument(app, swaggerBuilder);
        SwaggerModule.setup(API_DOCS_ROUTE, app, swaggerDoc);
    }
    else {
        logger.log("Docs disabled");
        app.use(helmet());
    }

    logger.log(`Server listening on port ${config.app.port()}...`);
    await app.listen(config.app.port());
}

bootstrap().catch((e) => {
    logger.error(JSON.stringify(e));
    process.exit(1);
});
