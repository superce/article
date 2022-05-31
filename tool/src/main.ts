import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { hbsView } from './hbs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  hbsView(app)
  await app.listen(3100);
}
bootstrap();
