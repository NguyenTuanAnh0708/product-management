import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exam } from '../../exams/entities/exams.entity';
import { Student } from '../../student/entities/student.entity';
@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  scoreID: number;

  @ManyToOne(() => Student, (student) => student.scores)
  @JoinColumn({ name: 'studentID' })
  student: Student;

  @ManyToOne(() => Exam, (exam) => exam.scores)
  @JoinColumn({ name: 'examID' })
  exam: Exam;

  @Column()
  score: number;
}
