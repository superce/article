import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn } from 'typeorm'
@Entity()
export class zhihu_article{
    @PrimaryGeneratedColumn()
    id: number

    @Column('number')
    meun_id: number

    @Column()
    article_id: string

    @Column()
    title: string

    @Column('text')
    content: string

    @Column()
    thumbnail: string
    
    @CreateDateColumn()
    date: Date
}
@Entity()
export class zhihu_list {
    @PrimaryGeneratedColumn()
    id: number

    @Column('number')
    meun_id: number

    @Column()
    article_id: string

    @Column()
    title: string

    @Column()
    thumbnail: string

    @Column("int")
    categroy_id: number //0,1, 2, 3
    @Column()
    categroy_name: string

}