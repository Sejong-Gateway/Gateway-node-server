import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Department } from './Department';
import { Requirement } from './Requirement';

@Entity('category')
export class Category extends BaseModel{
    @Column()
    title: string;

    @Column()
    description: string;
    
    @OneToMany((_) => Requirement, (requirement) => requirement.category)
    requirements: Requirement[];
}