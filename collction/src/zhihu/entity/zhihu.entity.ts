import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
@Entity()
export class zhihu_article{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    article_id: string

    @Column()
    title: string

    @Column('text')
    content: string
    
    @CreateDateColumn()
    date: Date
}
@Entity()
export class zhihu_list {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    article_id: string

    @Column()
    title: string

    @Column()
    thumbnail: string

}