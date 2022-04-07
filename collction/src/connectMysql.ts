let sql = {
    type: 'mysql',
    host: '119.13.87.28',
    port: 33305,
    username: 'nest',
    password: '123456',
    database: 'database',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}
if(process.env.NODE_ENV === 'development'){
  sql = {
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'zhihu',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
  }
}
export default sql