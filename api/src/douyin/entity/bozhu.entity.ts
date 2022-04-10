import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity()
export class auth_infor {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  categroy_id: string

  @Column('text')
  author: string

  @Column('text')
  account: string

  @Column('text')
  avatar: string

  @Column()
  fans: string

  @Column()
  likes: string

  @Column()
  authId: string

  @CreateDateColumn()
  create_date: Date

}
