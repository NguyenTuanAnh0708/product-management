import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  classID: number;

  @Column()
  className: string;

  @Column()
  teacher: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}
