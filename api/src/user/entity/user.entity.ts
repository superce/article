import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string
  
  @Exclude()
  @Column()
  password: string

  @CreateDateColumn()
  date: Date
  
}