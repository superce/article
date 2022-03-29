export default {
    type: 'mysql',
    host: '119.13.87.28',
    port: 3305,
    username: 'zhihu',
    password: '123456',
    database: 'database',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}