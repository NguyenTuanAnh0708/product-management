import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Exam } from '../../exams/entities/exams.entity';
import { Score } from '../../scores/entities/scores.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  studentID: number;

  @Column()
  name: string;

  @Column()
  className: string;

  @Column()
  classID: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.students) // Thiết lập quan hệ nhiều-một
  @JoinColumn({ name: 'classID' })
  class: Class;
  //   @ManyToOne(() => Class, (classEntity) => classEntity.students)
  //   class: Class;

  @OneToMany(() => Exam, (exam) => exam.student)
  exams: Exam[];

  @OneToMany(() => Score, (score) => score.student)
  scores: Score[];
}
