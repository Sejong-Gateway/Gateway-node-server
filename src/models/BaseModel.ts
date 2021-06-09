import {
    CreateDateColumn,
    Generated,
    PrimaryColumn,
    UpdateDateColumn,
    ValueTransformer,
    Column, PrimaryGeneratedColumn
} from 'typeorm';

import { IsInt, IsDate } from 'class-validator';
  
const bigIntTransformer: ValueTransformer = {
    to: (entitiyValue: bigint) => entitiyValue,
    from: (databaseValue: string) => Number(databaseValue),
};
  
export abstract class BaseModel {
    @PrimaryGeneratedColumn('uuid')
    uuid!: number;

    @IsDate()
    @CreateDateColumn()
    createdAt!: Date;

    @IsDate()
    @UpdateDateColumn()
    updatedAt!: Date;

    @IsDate()
    @Column({ nullable: true, type: 'date', default: null })
    deletedAt?: Date | null;
}