import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // console.log(app);
  
  app.enableCors({
    "origin": ["http://localhost:4000", "https://zh.health-longevity.top"],
    "credentials": true,
    // "allowedHeaders":['Content-Type', 'Authorization'],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    
    "optionsSuccessStatus": 204
  })  
  await app.listen(3002);
}
bootstrap();

