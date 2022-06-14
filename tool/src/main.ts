import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { hbsView } from './hbs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    "origin": "*",
    "credentials": true,
    // "allowedHeaders":['Content-Type', 'Authorization'],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,

    "optionsSuccessStatus": 204
  })
  hbsView(app)
  await app.listen(3100);
}
bootstrap();
