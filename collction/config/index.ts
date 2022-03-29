import dev from './env.dev';
import prop from './env.prod';

const envconfigs = {
  development: dev,
  production: prop,
};
// const env = process.env.NODE_ENV || 'development';
const environment = envconfigs[process.env.NODE_ENV || 'development']

export { environment };
