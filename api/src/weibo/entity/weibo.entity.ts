import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class weibo_img{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    author_id: string

    @Column()
    author_name: string

    @Column()
    group_imgs_id: string

    @Column()
    group_imgs_title: string

    @Column('text')
    img_url: string

    @Column('text')
    thumbnail: string

    @CreateDateColumn()
    find_time: Date
}