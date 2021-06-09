import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Collage } from './College';
import { Department } from './Department';

@Entity('subject')
export class Subject extends BaseModel{
    @Column()
    name!: string;

    @ManyToOne((_) => Department, (department) => department.subjects)
    @JoinColumn()
    department!: Department;

    @Column()
    credit!: number;

    @Column()
    type!: string;

    @Column()
    grade!: number;

    @Column()
    semester!: number;
}