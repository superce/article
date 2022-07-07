import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class article{
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

    @Column()
    img_url: string

    @Column()
    thumbnail: string
    
    @CreateDateColumn()
    date: Date
}