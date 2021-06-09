import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Collage } from './College';
import { Subject } from './Subject';

@Entity('department')
export class Department extends BaseModel{
    @Column()
    name: string;

    @ManyToOne((_) => Collage, (collage) => collage.departments)
    @JoinColumn()
    collage: Collage;
    
    @OneToMany((_) => Subject, (subject) => subject.department)
    subjects: Subject[];
}