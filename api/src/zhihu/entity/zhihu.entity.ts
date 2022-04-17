import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn } from 'typeorm'
@Entity()
export class article{
    @PrimaryGeneratedColumn()
    id: number

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
export class list {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    meun_id: number

    @Column()
    article_id: string

    @Column()
    title: string

    @Column()
    introduction: string

    @Column()
    thumbnail: string

}