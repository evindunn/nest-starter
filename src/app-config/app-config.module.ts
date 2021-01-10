import { Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ['.env.local', '.env'] })
    ],
    providers: [
        AppConfigService
    ],
})
export class AppConfigModule { }
