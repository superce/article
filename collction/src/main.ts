import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({

    "origin": "*",
    // "origin": "*",

    "credentials": true,

    // "allowedHeaders":['Authorization','content-type'],

    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",

    "preflightContinue": false,

    "optionsSuccessStatus": 204

  })
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(3001);
}
bootstrap();
