import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Category } from './Category';
import { Collage } from './College';
import { Department } from './Department';
import { Subject } from './Subject';

@Entity('users')
export class User extends BaseModel{
    @Column()
    studentId: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    isAbeek: boolean;

    @ManyToOne((_) => Collage, (collage) => collage.uuid)
    collage: Collage;

    @ManyToOne((_) => Department, (department) => department.uuid)
    department: Department;

    @ManyToMany((_) => Subject)
    @JoinTable()
    currentSubjects: Subject[];

    @ManyToMany((_) => Subject)
    @JoinTable()
    completeSubjects: Subject[];
    
    @ManyToMany((_) => Subject)
    @JoinTable()
    remainSubjects: Subject[];

    @ManyToMany((_) => Category)
    @JoinTable()
    categories: Category[];
}