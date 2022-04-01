import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { hbsView } from './hbs'

async function bootstrap() {  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // console.log(app);
  
  app.enableCors({
    "origin": "*",
    "credentials": true,
    // "allowedHeaders":['Authorization','content-type'],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })  
  hbsView(app)
  await app.listen(3001);
}
bootstrap();

