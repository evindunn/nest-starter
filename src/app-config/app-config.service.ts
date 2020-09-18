import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CONFIG_ENV, CONFIG_PORT } from "./configuration";

@Injectable()
export class AppConfigService {
    private static readonly ENV_DEV = "development";

    constructor(private readonly configService: ConfigService) { }

    port(): number {
        return this.configService.get<number>(CONFIG_PORT);
    }

    environment(): string {
        return this.configService.get<string>(CONFIG_ENV);
    }

    isDevelopment(): boolean {
        return this.environment() === AppConfigService.ENV_DEV;
    }
}
