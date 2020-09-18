import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppConfigModule } from "./app-config/app-config.module";

@Module({
    imports: [AppConfigModule],
    controllers: [AppController]
})
export class AppModule {}
