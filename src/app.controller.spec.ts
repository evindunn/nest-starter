import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppConfigModule } from './app-config/app-config.module';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppConfigModule],
            controllers: [AppController]
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    it('should be defined', () => {
        expect(appController).toBeDefined();
    });
});
