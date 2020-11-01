import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_APP_PORT, ENV_NODE_ENV } from './configuration';

@Injectable()
export class AppConfigService {
    public static readonly ENV_DEV = 'development';
    public static readonly ENV_TEST = 'test';

    constructor(private readonly configService: ConfigService) { }

    port(): number {
        return this.configService.get<number>(ENV_APP_PORT);
    }

    environment(): string {
        return this.configService.get<string>(ENV_NODE_ENV);
    }

    isDevelopment(): boolean {
        return [AppConfigService.ENV_DEV, AppConfigService.ENV_TEST]
            .includes(this.environment());
    }
}
