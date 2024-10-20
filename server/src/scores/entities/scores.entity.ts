
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { Exam } from '../../exams/entities/exams.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  scoreID: number;

  @Column()
  score: number;

  //   @Column()
  //   studentID:number;

  @ManyToOne(() => Student, (student) => student.scores)
  student: Student;

  @ManyToOne(() => Exam, (exam) => exam.scores)
  exam: Exam;
}
