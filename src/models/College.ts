import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Department } from './Department';

@Entity('collage')
export class Collage extends BaseModel{
    @Column()
    name: string;
    
    @OneToMany(
        (_) => Department,
        (department) => department.collage
    )
    departments: Department[];
}