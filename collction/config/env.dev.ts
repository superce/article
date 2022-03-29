
export default {
    type: 'mysql',
    host: 'localhost',
    port: 3305,
    username: 'root',
    password: '123456',
    database: 'zhihu',
    entities: [__dirname + '..' + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}
