import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const ENV_VAR_APP_CORS_ALLOW_CREDS = "APP_CORS_ALLOW_CREDS";
const ENV_VAR_APP_CORS_ORIGIN = "APP_CORS_ORIGIN";
const ENV_VAR_APP_ENVIRONMENT = "NODE_ENV";
const ENV_VAR_APP_PORT = "APP_PORT";

const DEFAULT_APP_ENVIRONMENT = "production";
const DEFAULT_APP_CORS_ORIGIN = ""
const DEFAULT_APP_PORT = 8080;

interface AppConfig {
    env: () => string;
    port: () => number;
    isDev: () => boolean;
    cors: {
        allowCredentials: () => boolean,
        origin: () => string
    }
}

@Injectable()
export class AppConfigService {
    constructor(private readonly config: ConfigService) { }

    public readonly app: AppConfig = {
        env: () => this.config.get<string>(ENV_VAR_APP_ENVIRONMENT) || DEFAULT_APP_ENVIRONMENT,
        port: () => this.config.get<number>(ENV_VAR_APP_PORT) || DEFAULT_APP_PORT,
        isDev: () => ["development", "test"].includes(this.app.env()),
        cors: {
            allowCredentials: () => this.config.get<string>(ENV_VAR_APP_CORS_ALLOW_CREDS) === 'true',
            origin: () => this.config.get<string>(ENV_VAR_APP_CORS_ORIGIN) || DEFAULT_APP_CORS_ORIGIN,
        }
    }
}
