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

  @Column({ type: 'varchar', length: 255, nullable: true })
  className: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  teacher: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}
