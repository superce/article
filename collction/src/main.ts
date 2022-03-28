import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
const hbs = require('hbs')
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    "origin": "*",
    "credentials": true,
    // "allowedHeaders":['Authorization','content-type'],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })  
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  
  // 设置hbs模板，局部引用
  let blocks = {}
  hbs.registerHelper('extend', (name: string | number, context: { fn: (arg0: any) => any; }) => {
    let block = blocks[name]
    if(!block) block = blocks[name] = []
    block.push(context.fn(this))
  })
  hbs.registerHelper('block', (name: string | number) => {
    const val = (blocks[name] || []).join('\n')
    blocks[name] = []
    return val
  })

  await app.listen(3001);
}
bootstrap();

