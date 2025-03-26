import { NestFactory } from '@nestjs/core';
import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Check if running in console mode
  if (process.argv.some(arg => arg.includes('console'))) {
    // Console commands mode
    const consoleApp = new BootstrapConsole({
      module: AppModule,
      useDecorators: true,
    });
    
    const app = await consoleApp.init();
    try {
      await consoleApp.boot();
      await app.close();
      process.exit(0);
    } catch (e) {
      console.error(e);
      await app.close();
      process.exit(1);
    }
  } else {
    // HTTP server mode
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
      origin: true, // Allows all origins
      credentials: true,
    });
    const configService = app.get(ConfigService);
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });
    const port = configService.get<number>('PORT') || 3000;
    await app.listen(port);
    console.log(`HTTP server running on port ${port}`);
  }
}

bootstrap().catch(err => {
  console.error(err);
  process.exit(1);
});