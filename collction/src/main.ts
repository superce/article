import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { hbsView } from './hbs'

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
  hbsView(app)
  await app.listen(3001);
}
bootstrap();

