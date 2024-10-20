
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { Score } from '../../scores/entities/scores.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  examID: number;

  @Column()
  examName: string;

  @Column()
  examDate: Date;

  // @Column()
  // scoreID; number;

  @ManyToOne(() => Student, (student) => student.exams)
  student: Student;

  @OneToMany(() => Score, (score) => score.exam)
  @JoinColumn({ name: 'scoreID' })
  scores: Score[];
}
