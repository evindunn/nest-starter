import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CONFIG_ENV, CONFIG_PORT } from "./configuration";

@Injectable()
export class AppConfigService {
    public static readonly ENV_DEV = "development";
    public static readonly ENV_TEST = "test";

    constructor(private readonly configService: ConfigService) { }

    port(): number {
        return this.configService.get<number>(CONFIG_PORT);
    }

    environment(): string {
        return this.configService.get<string>(CONFIG_ENV);
    }

    isDevelopment(): boolean {
        return [AppConfigService.ENV_DEV, AppConfigService.ENV_TEST]
            .includes(this.environment());
    }
}
