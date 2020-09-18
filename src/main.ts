import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cors from "cors";
import helmet from "helmet";
import { AppConfigService } from "./app-config/app-config.service";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

const GLOBAL_API_PREFIX = "api/v1";
const SWAGGER_DOCS_PREFIX = "docs"

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(AppConfigService);

    // Build docs
    const options = new DocumentBuilder()
        .setTitle("Cats example")
        .setDescription("The cats API description")
        .setVersion("1.0")
        .build();

    // Has to be done before swagger doc is created
    app.setGlobalPrefix(GLOBAL_API_PREFIX);

    // Configure docs
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_DOCS_PREFIX, app, document);

    // Enable helmet in production
    if (!configService.isDevelopment()) {
        app.use(helmet());
    }

    // Enable CORS
    app.use(cors());

    // Validate input
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    // Serialize output
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    // Start server
    await app.listen(configService.port());
}

bootstrap().catch((e) => {
    console.error(e);
    process.exit(1);
});
