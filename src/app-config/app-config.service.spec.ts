import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';

describe('AppConfigService [DEFAULTS]', () => {
    let service: AppConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({ ignoreEnvFile: true })
            ],
            providers: [AppConfigService],
        }).compile();

        service = module.get<AppConfigService>(AppConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return the default port', () => {
        expect(service.app.port()).toBe(8080);
    });

    it('should return the test environment', () => {
        expect(service.app.env()).toBe('test');
        expect(service.app.isDev()).toBe(true);
    });

    it('should return the default CORS params', () => {
        expect(service.app.cors.origin()).toBe('');
        expect(service.app.cors.allowCredentials()).toBe(false);
    });
});
