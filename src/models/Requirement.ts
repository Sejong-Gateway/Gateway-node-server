import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { BaseModel } from './BaseModel';
import { Category } from './Category';
import { Department } from './Department';

@Entity('requirement')
export class Requirement extends BaseModel{
    @Column()
    name: string;

    @Column()
    count: number;

    @Column()
    unit: string;

    @ManyToOne((_) => Category, (category) => category.requirements)
    @JoinColumn()
    category: Category
}