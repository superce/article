const hbs = require('hbs');
import { join } from 'path';
export function hbsView(app: any) {
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));  
  app.setViewEngine('hbs');
}