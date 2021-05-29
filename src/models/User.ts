import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity('users')
export class User extends BaseModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;
}