import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn, ManyToOne } from 'typeorm'

@Entity()
export class video_list {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  authId: string

  @Column('text')
  cover_url: string

  @Column('text')
  video_url: string

  @Column()
  like: string

  @Column()
  time: string

  @CreateDateColumn()
  create_date: Date
}